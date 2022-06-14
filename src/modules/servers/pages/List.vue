<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> List Server</v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense >
                    <v-col class="mr-auto"> 
                        <v-btn fab dark small color="indigo" to="/server/add">
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdataserverx" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }"> 
                        <v-icon color="green lighten-2" small class="mr-2" @click="editServer(item.actions)">mdi-pencil</v-icon>
                        <v-icon small color="red darken-2" @click="showDeleteDialog(item.actions)">mdi-delete</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>

                   <v-dialog v-model="dialogDeleteServer" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Hapus Server
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogDeleteServer = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="deleteServer()">Delete</v-btn>
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
      myloading: false, 
      windowWidth: window.innerWidth, 
      dialog: false,
      editedItem: {},
      dialogDeleteServer: false,
      itemToDeleteServer: {},
      headers: [{
            text: 'No', 
            value: 'id',
            fixed: true 
          },
          {
            text: 'Kode', 
            value: 'kdcab',
            fixed: true
          },
          {
            text: 'Cabang', 
            value: 'namacabang',
            fixed: true
          },
          {
            text: 'Jenis', 
            value: 'jenis',
            fixed: true
          }, 
          {
            text: 'ip', 
            value: 'ipserver'
          },
          {
            text: 'Username', 
            value: 'user'
          },
          {
            text: 'Password', 
            value: 'pass'
          },
          {
            text: 'Port', 
            value: 'port'
          },
          {
            text: 'Actions', 
            value: 'actions'
          },
        ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }, 
    listdataserverx() {
      return this.$store.getters.listDataServer;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      loadItems() { 
        this.$store.dispatch("getListServer") 
      },   
      showDeleteDialog(item) {
        this.itemToDeleteServer = item
        this.dialogDeleteServer = !this.dialogDeleteServer
      },
      deleteServer() {  
          const sendpost = {
            id: this.itemToDeleteServer
          }
          this.$store.dispatch("deleteServer", sendpost)
          .then(() => {
              const index = this.$store.getters.listDataServer.indexOf(this.itemToDeleteServer)    
              this.$store.getters.listDataServer.splice(index, 1)
              this.dialogDeleteServer = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      editServer(id) {
        this.$router.push({ name: "server.details", params: { id: id } });
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