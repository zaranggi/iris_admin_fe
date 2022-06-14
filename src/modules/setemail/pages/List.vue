<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> Manage Email Cabang</v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense >
                    <v-col class="mr-auto"> 
                        <v-btn fab dark small color="indigo" to="/setemail/add">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn> 
                    </v-col>
                    <v-col class="pa-2" lg="4"> 
                      <v-text-field
                        dense
                        placeholder="Search"
                        clearable
                        v-model="search"
                        append-icon="mdi-magnify" single-line hide-details
                      ></v-text-field> 
                    </v-col>
                  </v-row>
                </v-flex>
              </v-card-title>

              <v-card-text> 
               <v-layout column style="padding-top:56px">
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdatamanEmail" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }"> 
                        <v-icon color="green lighten-2" small class="mr-2" @click="editSetemail(item.actions)">mdi-pencil</v-icon>
                        <v-icon small color="red darken-2" @click="showDeleteDialog(item.actions)">mdi-delete</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>

                   <v-dialog v-model="dialogDeleteEmail" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Hapus Data Email
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogDeleteEmail = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="deleteEmail()">Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
                     
                </v-layout> 
              </v-card-text>
              
            </v-card> 
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "", 
      windowWidth: window.innerWidth, 
      dialog: false,
      editedItem: {},
      dialogDeleteEmail: false,
      itemToDeleteEmail: {},
      headers: [
          { text: 'No', value: 'id', fixed: true }, 
          { text: '', value: 'actions'},
          { text: 'Cabang', value: 'nama_cabang'},
          { text: 'email1', value: 'email1'},
          { text: 'email2', value: 'email2'},
          { text: 'email3', value: 'email3'},
          { text: 'email4', value: 'email4'},
          { text: 'email5', value: 'email5'},
        ],
    };
  },
  computed: { 
    listdatamanEmail() {
      return this.$store.getters.listManSetemail;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      loadItems() { 
        this.$store.dispatch("getManSetemail") 
      },   
      showDeleteDialog(item) {
        alert(item)
        this.itemToDeleteEmail = item
        this.dialogDeleteEmail = !this.dialogDeleteEmail
      },
      deleteEmai() {  
          const sendpost = {
            id: this.itemToDeleteEmail
          }
          this.$store.dispatch("deleteSetemail", sendpost)
          .then(() => {
              const index = this.$store.getters.listManSetemail.indexOf(this.itemToDeleteEmail)    
              this.$store.getters.listManSetemail.splice(index, 1)
              this.dialogDeleteEmail = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      editSetemail(id) {
        this.$router.push({ name: "setemail.details", params: { id: id } });
      },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.loadItems()  
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>