<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%"
    :loading="loadingvquery"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>
      <v-icon color="light-green darken-1">mdi-dns</v-icon>
      Iris Query Browser
    </v-card-title>
    <v-divider class="mx-4"></v-divider>

    <div class="d-flex flex-column ma-4">      
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >      
       <v-flex lg12 md12 sm12> 
          <v-row dense>
            <v-col cols="8" > 
              <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangVquery"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangVquery"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                     chips
                      clearable
                      deletable-chips
                      dense
                      multiple
                      small-chips 
                      required 
                  >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggle"
                    >
                      <v-list-item-action>
                        <v-icon :color="listCabangVquery.length > 0 ? 'indigo darken-4' : ''">
                            {{ iconCabang }}
                          </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Pilih All Cabang
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
              </v-select>
            </v-col>
          </v-row>  
          <v-row dense>
            <v-col cols="12" >    
              <template>
                <v-container fluid> 
                  <v-flex xs3 align-start>
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-2" @click="submitTabQuery">
                      [CTRL+ENTER] Proses
                    </v-btn> 
                  </v-flex>
                  <template>
                    <textarea ref="txt" class="txt">SELECT * FROM</textarea>
                  </template> 
                </v-container>
              </template> 
              
            </v-col>  
          </v-row>
        </v-flex>
      </v-form>
      
      </div> 
       <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay>
    </v-card>
    <v-divider class="mx-4"></v-divider><v-divider class="mx-4"></v-divider>
  </v-row>
  
  <v-row justify="space-between">   
    <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%">  
              <v-card-title > 
                <v-flex lg12 md12 sm12>
                  <v-row dense >  
                    <v-col class="pa-2" md="12" justify-start> 
                       <download-excel
                        ref="donwloadResultQuery"
                        class= "button is-primary" 
                        :data="viewDataVquery" 
                        worksheet="My Worksheet" 
                        name="vquery.xls"
                        >
                        <v-btn color="secondary"  elevation="10">
                          <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                          XLS
                        </v-btn>
                      </download-excel>
                      <download-csv
                          class= "button is-primary"
                          :data   = "viewDataVquery"
                          name="vquery.csv">
                          <v-btn color="secondary"  elevation="10">
                            <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                            CSV
                          </v-btn>
                      </download-csv>

                    </v-col>
                    <v-col class="pa-2" md="6" justify-end> 
                      <v-text-field
                        dense
                        placeholder="Search"
                        clearable
                        v-model="search"
                        append-icon="mdi-magnify" 
                        single-line hide-details
                      ></v-text-field> 
                    </v-col> 
                  </v-row>
                </v-flex>
              </v-card-title>

              <v-card-text> 
               <v-layout column style="padding-top:10px">
                  <v-data-table 
                    class="elevation-1"
                    :class="['word-wrap'] " 
                    :headers="headers" 
                    :items="viewDataVquery"  
                    :search="search" mobile-breakpoint="0" >
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
              </v-card-text>
    </v-card>
      <v-dialog v-model="DialogTicket" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Buka Tiket Baru
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                  <v-textarea
                    clearable
                    v-model="keteranganQuery"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Tiket"
                  ></v-textarea> 
                  <v-menu
                      class="ma-1 pa-1 mx-4"
                      ref="menu"
                      v-model="tanggal"
                      :close-on-content-click="false" 
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="ma-1 pa-1 mx-4"
                          v-model="computeTanggal"
                          label="Pilih Tanggal"
                          prepend-icon="mdi-calendar" 
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                     <v-date-picker
                        v-model="dateAwal"
                        no-title
                        color="green lighten-1" 
                        @input="tanggal = false"
                      ></v-date-picker>
                  </v-menu>

                  <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listLabelVquery"
                        item-text="label"
                        item-value="id"
                        :items="getLabelVquery"
                        :rules="[v => !!v || 'Label Harus diisi']"
                        label="Pilih Label Tiket" 
                          required 
                      > 
                  </v-select> 
                  <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="jenisBa"
                        item-text="label"
                        item-value="id"
                        :items="getJenisBA"
                        :rules="[v => !!v || 'Jenis BA Harus diisi']"
                        label="Pilih Jenis BA" 
                          required 
                      > 
                  </v-select> 
                  
                  <v-autocomplete
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="id_dep"
                        item-text="nama_dep"
                        item-value="id"
                        :items="getDepVquery"
                        :rules="[v => !!v || 'Departemen Harus diisi']"
                        label="Pilih Departemen" 
                          required 
                      > 
                  </v-autocomplete> 
                </v-container>
                
              </template>
              
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogTicket = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="saveOpenTicket()">
                <v-icon dark>mdi-plus</v-icon>
                Buat Tiket
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-snackbar
        v-model="snackbar"
        :timeout="timeoutPesan"
        top
        color="amber darken-4"
        text
        elevation="24" 
        >
        {{ pesan }} 
        <template v-slot:action="{ attrs }">
          <v-btn 
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

  </v-row>
</v-container>
</template> 

<script>  
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/sql/sql.js";
import { splitQueries, extractParams  } from '../../../lib/sql_tools';
import { identify } from 'sql-query-identifier'
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "./sql-hint.css"; 

export default {
  name: "Tambah",
  data: () => ({   
      dateAwal: new Date().toISOString().substr(0, 10), 
      tanggal: false,
      id_dep:"",
      DialogTicket: false, 
      snackbar: false,
      pesan: '',
      timeoutPesan: 4000,
      options: { 
      },  
      keteranganQuery:"",
      search: "",
      overlay: true,
      tableData: "",
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
      listCabangVquery: "",
      listLabelVquery: "",
      submitted: false,
      errorMessages:"", 
      jenisBa:"",
      getJenisBA: [
        {id:"IN", label: "BA Masuk"},
        {id:"OUT", label: "BA Keluar"}
      ],
      dico: [
        { className: "sql", text: "SELECT" },
        { className: "sql", text: "FROM" },
        { className: "sql", text: "WHERE" },
        { className: "sql", text: "SET" },
        { className: "sql", text: "INNER" },
        { className: "sql", text: "LIKE" },
        { className: "sql", text: "JOIN" },
        { className: "sql", text: "UNION" },
        { className: "sql", text: "CREATE" },
        { className: "sql", text: "INSERT" },
        { className: "sql", text: "INTO" },
        { className: "sql", text: "VALUES" },
        { className: "sql", text: "UPDATE" },
        { className: "sql", text: "DELETE" },
        { className: "sql", text: "GROUP" },
        { className: "sql", text: "BY" },
        { className: "sql", text: "HAVING" },
        { className: "sql", text: "IS" },
        { className: "sql", text: "NOT" },
        { className: "sql", text: "DISTINCT" },
        { className: "sql", text: "EXISTS" },
        { className: "sql", text: "WHEN" },
        { className: "sql", text: "CASE" },
        { className: "sql", text: "CAST" },
        { className: "sql", text: "IN" },
        { className: "sql", text: "NULL" }
      ]  
  }),
  watch:{
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
  computed: { 
    computeTanggal() {
      return this.dateAwal;
    },  
    headers() {
      let listHeader = [];

      if (this.$store.getters.tableData.length > 0) {
        var header = Object.keys(this.$store.getters.tableData[0]);
        header.forEach((h) => {
          listHeader.push({
            text: h.replace(/^./, h[0].toUpperCase()),
            sortable: true,
            align: "center",
            class: "teal accent-2",
            value: h, 
          });
        });
      }

      return listHeader;
    }, 
    viewDataVquery() {
      return this.$store.getters.tableData;
    },
    getDepVquery() {
      return this.$store.getters.listDepVquery;
    },  
    getLabelVquery() {
      return this.$store.getters.listLabelVquery;
    },  
    getCabangVquery() {
      return this.$store.getters.listCabangVquery;
    },   
    loadingvquery() {
      return this.$store.getters.loadingvquery;
    },  pilihAllCabang () {
        return this.listCabangVquery.length === this.$store.getters.listCabangVquery.length
    },
    pilihSomeCabang () {
        return this.listCabangVquery.length > 0 && !this.$store.getters.listCabangVquery.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
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
      
      const start = previousQuery ? previousQuery.end + 1: 0
      const end = this.currentlySelectedQuery.end

      return {
        from: start,
        to: end + 1
      }
    },
    queryParameterPlaceholders() {
      let query = this.queryForExecution
      return extractParams(query)
    },
    deparameterizedQuery() {
      let query = this.queryForExecution
      query.each(this.queryParameterPlaceholders, param => {
        query = query.replace(new RegExp(`(\\W|^)${this.escapeRegExp(param)}(\\W|$)`), `$1${this.queryParameterValues[param]}$2`)
      });
      return query;
    },    
  },
  methods: {  
    suggest(searchString) { 
      let token = searchString;
      if (searchString.startsWith(".")) token = searchString.substring(1);
      else token = searchString.toLowerCase();
      let resu = [];
      let N = this.dico.length;

      for (let i = 0; i < N; i++) {
        let keyword = this.dico[i].text.toLowerCase();
        let suggestion = null;
        if (keyword.startsWith(token)) {
          suggestion = Object.assign({ score: N + (N - i) }, this.dico[i]);
        } else if (keyword.includes(token)) {
          suggestion = Object.assign({ score: N - i }, this.dico[i]);
        }
        if (suggestion) resu.push(suggestion);
      } 
      if (searchString.startsWith(".")) {
        resu.forEach(s => {
          if (s.className == "column") s.score += N;
          else if (s.className == "sql") s.score -= N;
          return s;
        });
      }

      return resu.sort((a, b) => b.score - a.score);
    },
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
      this.overlay = true 
      if (this.currentlySelectedQuery) {
        this.submitQuery(this.currentlySelectedQuery.text)
      } else {
        this.results = []
        this.overlay = false
        this.DialogTicket = false
        this.pesan="Query Belum Diisi"
        this.snackbar = true
      }
    },
    async submitTabQuery() { 
      this.overlay = true 
      const text = this.hasSelectedText ? this.editor.getSelection() : this.editor.getValue()
      if (text.trim()) {
        this.submitQuery(text)
      } else {
        this.overlay = false
        this.DialogTicket = false        
        this.pesan="Query Belum Diisi"
        this.snackbar = true
      }
    }, 
    async saveOpenTicket() { 
      this.overlay = true 
      const text = this.hasSelectedText ? this.editor.getSelection() : this.editor.getValue()
      if (text.trim()) {
        const a = this.listCabangVquery.map((item)=>{ 
            return item.id === undefined ? item : item.id
        }) 
        this.running = true
        this.queryForExecution = text
        this.results = []
        this.selectedResult = 0
        let identification = []
        try {
          identification = identify(text, { strict: false, dialect: this.dialect }) 
          let dataUser = this.$store.getters.dataUsers
          let timestamp = Date.now()
          let noTicket =  Math.floor(timestamp/1000) +""+dataUser.id
          const dataTiket = { 
            datavquery: this.queryForExecution,
            tiket: noTicket,
            kdcab: dataUser.kdcab,
            label: this.listLabelVquery,
            jenisba: this.jenisBa,
            id_dep : this.id_dep,
            tanggal: this.dateAwal,
            keterangan: this.keteranganQuery,
            dataidentity: identification,
            reqby: dataUser.id,
            listcabang: a.toString(),
          }  
          //console.log(dataTiket)
          this.$store.dispatch('ticketQuery', dataTiket).then(() => { 
              this.tableData="";
              this.overlay = false
              this.DialogTicket = false              
              this.pesan="Tiket Baru Berhasil dibuat."
              this.snackbar = true
          })  
        
        } catch (ex) {
          this.overlay = false
          this.DialogTicket = false   
              this.pesan="Tiket Gagal dibuat."
              this.snackbar = true
        }
      } else {
        this.overlay = false
        this.DialogTicket = false
              this.pesan="Query Belum diisi"
              this.snackbar = true
      }
    },
    async submitQuery(rawQuery) {
      
      if(this.listCabangVquery !== null && this.listCabangVquery !== ''){
        const exselectQuery = /\b(?:select|show)\b/gi;
        const exQuery = /\b(?:update|delete|insert|drop|create)\b/gi;   
        const checkexQuery = rawQuery.match(exQuery)
        const checkselectQuery = rawQuery.match(exselectQuery)
        const checkQuery = rawQuery.includes(";") 

        if(checkselectQuery != null && checkexQuery === null && checkQuery === true){
          
          if(this.$refs.form.validate()){  
              const a = this.listCabangVquery.map((item)=>{ 
                      return item.id === undefined ? item : item.id
              }) 
              this.running = true
              this.queryForExecution = rawQuery
              this.results = []
              this.selectedResult = 0
              let identification = []
              try {
                identification = identify(rawQuery, { strict: false, dialect: this.dialect })
                const datanya = { 
                  datavquery: rawQuery,
                  dataidentity: identification,
                  listCabangVquery: a.toString(),
                }  
                this.$store.dispatch('selectQuery', datanya).then(() => { 
                    this.overlay = false
                }) 
              
              } catch (ex) {
                console.log("Unable to identify query" + ex)
                this.overlay = false
              } 
          }else{
                this.errorMessages = "Data tidak boleh kosong";
                this.snackbar = true;
                this.overlay = false
          }
          }else if (checkselectQuery === null && checkexQuery != null && checkQuery === true){
            this.DialogTicket = true
            this.overlay = false

          }else if (checkQuery === false){ 
            this.overlay = false            
              this.pesan="Pastikan Query Anda Mengandung Semicolon ( ; )"
              this.snackbar = true
          }else{ 
              this.pesan="Pastikan Query Anda Benar"
              this.snackbar = true
            this.overlay = false      
          }
        }else{
          this.overlay = false
          this.pesan="Cabang Harus Dipilih"
          this.snackbar = true
        }
    }, 
    toggle () {
        this.$nextTick(() => {
          if (this.pilihAllCabang) {
            this.listCabangVquery = []
          } else {
            this.listCabangVquery = this.$store.getters.listCabangVquery.slice()
          }
        })
      },
   /*  startDownload(){
        alert('show loading');
    },
    finishDownload(){
        alert('hide loading');
    } */
  }, 
  mounted() { 
    
      this.$store.dispatch("getLabelQuery");

      let dataUser = this.$store.getters.dataUsers
      this.$store.dispatch("getCabangVquery",{ kdcab : dataUser.cover});  
      this.$store.dispatch("getDepVquery");  
      this.editor = CodeMirror.fromTextArea(this.$refs.txt, {
          tabSize: 1,
          mode: "text/x-mysql",
          theme: "panda-syntax",
          lineNumbers: true,
          line: true,
          height: 'auto',
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
      this.overlay = false
     
  }, 
  
  template: '<div ref="table"></div>'
  
};
</script>
 
<style>
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
  
}
 .v-list-item__title {
    align-self: center;
    font-size: 0.8125rem;
    font-weight: 500;
}
 
  .v-text-field input {
   font-size: 0.8125rem;
   font-weight: 500;
  }
  .v-label {
    font-size: 14px;
   font-weight: 500;
  }

</style> 
<style scoped>
.word-wrap {
  white-space:nowrap;
} 
  .txt {
  width: 100%;
  height: auto;
}
</style>