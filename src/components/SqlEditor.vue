<template>
   <textarea ref="txt" class="txt">
   SELECT * FROM
   </textarea>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/sql/sql.js";
import { splitQueries } from '../lib/db/sql_tools';
import { identify } from 'sql-query-identifier'
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "./sql-hint.css";
//import "codemirror/addon/hint/sql-hint.js";

export default {
  name: "SqlEditor",
  data() {
    return {
      results: [],
      running: false,
      selectedResult: 0,
      editor: null,
      runningQuery: null,
      error: null,
      info: null,
      split: null,
      tableHeight: 0,
      savePrompt: false,
      unsavedText: null,
      saveError: null,
      lastWord: null,
      cursorIndex: null,
      marker: null,
      queryParameterValues: {},
      queryForExecution: null,
      executeTime: 0,
      //autocompletion: the dictionary of all possible keywords
      //[list complete of reserved keyword for MSSQL](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql?view=sql-server-2017)
      dico: [
        { className: "sql", text: "SELECT" },
        { className: "sql", text: "FROM" },
        { className: "sql", text: "WHERE" },
        { className: "sql", text: "INNER" },
        { className: "sql", text: "JOIN" },
        { className: "sql", text: "UNION" },
        { className: "sql", text: "EXEC" },
        { className: "sql", text: "INSERT" },
        { className: "sql", text: "INTO" },
        { className: "sql", text: "VALUES" },
        { className: "sql", text: "UPDATE" },
        { className: "sql", text: "DELETE" },
        { className: "sql", text: "GROUP" },
        { className: "sql", text: "BY" },
        { className: "sql", text: "HAVING" },
        { className: "sql", text: "IS" },
        { className: "sql", text: "DISTINCT" },
        { className: "sql", text: "OUTER" },
        { className: "sql", text: "TOP" },
        { className: "sql", text: "EXISTS" },
        { className: "sql", text: "WHEN" },
        { className: "sql", text: "CASE" },
        { className: "sql", text: "CAST" },
        { className: "sql", text: "IN" },
        { className: "sql", text: "NULL" }
      ]
    };
  },
  watch: {
    active() {
      if(this.active && this.editor) {
        this.$nextTick(() => {
          this.editor.refresh()
          this.editor.focus()
        })
      } else {
        this.$modal.hide('save-modal')
      }
    },
    currentQueryPosition() {
      if (this.marker){
        this.marker.clear()
      }

      if(!this.individualQueries || this.individualQueries.length < 2) {
        return;
      }

      if (!this.currentQueryPosition) {
        return
      }
      const { from, to } = this.currentQueryPosition

      const editorText = this.editor.getValue()
      const lines = editorText.split(/\n/)

      const markStart = {
        line: null,
        ch: null
      }
      const markEnd = {
        line: null,
        ch: null
      }
      let startMarked = false
      let endMarked = false
      let startOfLine = 0
      lines.forEach((line, idx) => {
        const eol = startOfLine + line.length + 1
        if (startOfLine <= from && from <= eol && !startMarked) {
          markStart.line = idx
          markStart.ch = from - startOfLine
          startMarked = true
        }
        if (startOfLine <= to && to <= eol && !endMarked) {
          markEnd.line = idx
          markEnd.ch = to - startOfLine
          endMarked = true
        }
        startOfLine += line.length + 1
      })
      this.marker = this.editor.getDoc().markText(markStart, markEnd, {className: 'highlight'})
    },
     
  },
  methods: {
    /*
    Return a list of suggestion base on the searchString (the current word that user is typing).
    Each suggestion is an object {text, displayText, className}. See https://codemirror.net/doc/manual.html#addon_show-hint
    - keywords start with the searchString appears first in the suggestion list
    */
    suggest(searchString) {
      /*
      we will score which suggesion should appears first, the higer the score, the higer is the appearance order
      */
      let token = searchString;
      if (searchString.startsWith(".")) token = searchString.substring(1);
      else token = searchString.toLowerCase();
      let resu = [];
      let N = this.dico.length;

      //init scoring: only retains and score suggestions which contain the searchString
      for (let i = 0; i < N; i++) {
        let keyword = this.dico[i].text.toLowerCase();
        let suggestion = null;
        //the base score of all the suggestion is N-i (it means we respect the order in the dico)
        if (keyword.startsWith(token)) {
          //add N to the score of keywords which begin with the token to make them raise up in the suggestion list
          suggestion = Object.assign({ score: N + (N - i) }, this.dico[i]);
        } else if (keyword.includes(token)) {
          suggestion = Object.assign({ score: N - i }, this.dico[i]);
        }
        if (suggestion) resu.push(suggestion);
      }

      //case suggestion for "."
      if (searchString.startsWith(".")) {
        //raise score of columns, decrease the score of sql keyword
        resu.forEach(s => {
          if (s.className == "column") s.score += N;
          else if (s.className == "sql") s.score -= N;
          return s;
        });
      }

      //console.log(searchString);
      return resu.sort((a, b) => b.score - a.score);
    },
    /*
    [hint implementation for codemirror](https://codemirror.net/doc/manual.html#addon_show-hint):
    take an editor instance and options object, and return a {list, from, to} object, where list is an array of strings or objects (the completions), and from and to give the start and end of the token that is being completed as {line, ch} objects. 
     */
    hint(editor) {
      let cur = editor.getCursor();
      let token = editor.getTokenAt(cur);
      let searchString = token.string;
      return {
        list: this.suggest(searchString),
        from: CodeMirror.Pos(cur.line, token.start),
        to: CodeMirror.Pos(cur.line, token.end)
      };
    },
    async submitCurrentQuery() {
      if (this.currentlySelectedQuery) {
        this.submitQuery(this.currentlySelectedQuery.text)
      } else {
        this.results = []
        this.error = 'No query to run'
      }
    },
    async submitTabQuery() {
      const text = this.hasSelectedText ? this.editor.getSelection() : this.editor.getValue()
      if (text.trim()) {
        this.submitQuery(text)
      } else {
        this.error = 'No query to run'
      }
    },
    async submitQuery(rawQuery) {
      this.running = true
      this.queryForExecution = rawQuery
      this.results = []
      this.selectedResult = 0
      let identification = []
      try {
        identification = identify(rawQuery, { strict: false, dialect: this.dialect })
        console.log(identification)
      } catch (ex) {
        console.log("Unable to identify query" + ex)
      }
    }

     
  },
  computed:{
    hasSelectedText() {
      return this.editor ? !!this.editor.getSelection() : false
    },
    queryText() {
      return this.editor.getValue()
    },
    individualQueries() {
      if (!this.editor.getValue()) return []
      return splitQueries(this.queryText)
    },
    currentlySelectedQueryIndex() {
      const queries = this.individualQueries;
      for (let i = 0; i < queries.length; i++) {
        if (this.cursorIndex <= queries[i].end + 1) return i
      }
      return null
    },
    currentlySelectedQuery() {
      if (this.currentlySelectedQueryIndex == null) return null
      return this.individualQueries[this.currentlySelectedQueryIndex]
    },
    currentQueryPosition() {
      if(!this.editor || !this.currentlySelectedQuery || !this.individualQueries) {
        return null
      }
      const qi = this.currentlySelectedQueryIndex
      const previousQuery = qi === 0 ? null : this.individualQueries[qi - 1]
      // adding 1 to account for semicolon
      const start = previousQuery ? previousQuery.end + 1: 0
      const end = this.currentlySelectedQuery.end

      return {
        from: start,
        to: end + 1
      }
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.txt, {
      tabSize: 4,
      mode: "text/x-mysql",
      theme: "panda-syntax",
      lineNumbers: true,
      line: true,
      lineWrapping: true,
      hintOptions: {
        completeSingle: false,
        hint: this.hint
      },
      extraKeys: {
        "Ctrl-Shift": editor => {
          editor.showHint();
        }
      }
    });
    this.editor.on("keypress", editor => {
      editor.showHint();
    });
    this.$nextTick(() => { 
      const runQueryKeyMap = {
        "Shift-Ctrl-Enter": this.submitTabQuery,
        "Shift-Cmd-Enter": this.submitTabQuery,
        "Ctrl-Enter": this.submitCurrentQuery,
        "Cmd-Enter": this.submitCurrentQuery
      } 

      // TODO: make this not suck 
      this.editor.on('cursorActivity', (editor) => this.cursorIndex = editor.getDoc().indexFromPos(editor.getCursor(true)));
      this.editor.focus();
      this.editor.addKeyMap(runQueryKeyMap);

      setTimeout(() => {
        // this fixes the editor not showing because it doesn't think it's dom element is in view.
        // its a hit and miss error
        this.editor.refresh();
      }, 1);
    });
  }
};
</script>

<style scoped>
.txt {
  width: 100%;
  height: 100%;
}
</style>
