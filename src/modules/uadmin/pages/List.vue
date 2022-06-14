<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> List Data Users </v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense >
                    <v-col class="mr-auto"> 
                        <v-btn fab dark small color="indigo" to="/uadmin/add">
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdatauser" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }"> 
                      
                        <v-icon small color="red darken-2" class="mr-2" @click="showResetDialog(item.actions)">mdi-repeat</v-icon>
                        <v-icon color="green lighten-2" small class="mr-2" @click="editUser(item.actions)">mdi-pencil</v-icon>                      
                        <v-icon v-if="item.isactive === 'Y'" color="green darken-2" small class="mr-2" @click="showBlockDialog(item.actions)">mdi-power</v-icon>
                        <v-icon v-else color="orange darken-2" small class="mr-2" @click="showUnBlockDialog(item.actions)">mdi-power</v-icon> 
                        <v-icon small color="red darken-2" class="mr-2" @click="showDeleteDialog(item.actions)">mdi-delete</v-icon>
                        ||
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="indigo"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                Akses Menu
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item key="0" link @click="menuClient(item.actions)">
                                <v-list-item-title >Menu Iris Client</v-list-item-title>
                              </v-list-item>
                              <v-list-item key="1" link @click="menuAdmin(item.actions)">
                                <v-list-item-title >Menu Iris Admin</v-list-item-title>
                              </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>
 
                  <v-dialog v-model="dialogReset" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Reset Password
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogReset = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="resetUser()">Reset</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog> 
                   <v-dialog v-model="dialogDelete" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Hapus User 
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogDelete = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="deleteUser()">Delete</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
                   <v-dialog v-model="dialogBlock" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Block User 
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogBlock = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="blockUser()">Block</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogUnBlock" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Unblock User 
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogUnBlock = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="unblockUser()">Unblock</v-btn>
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
      dialogReset: false,
      dialogDelete: false,
      dialogBlock: false,
      dialogUnBlock: false,
      itemToBlock: {},
      itemToUnDelete: {},
      itemToDelete: {},
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
            value: 'nama_cabang',
            fixed: true
          },
          {
            text: 'Nik', 
            value: 'nik',
            fixed: true
          },
          {
            text: 'Nama', 
            value: 'nama',
            fixed: true
          },
          {
            text: 'Username', 
            value: 'username'
          },
          {
            text: 'Admin', 
            value: 'isadmin'
          },
          {
            text: 'Aktif', 
            value: 'isactive'
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
    listdatauser() {
      return this.$store.getters.listUadmin;
    },
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      loadItems() { 
        this.$store.dispatch("getUadmin") 
      },   
      showBlockDialog(item) {
        this.itemToBlock = item
        this.dialogBlock = !this.dialogBlock
      },
      blockUser() {  
          const sendpost = {
            id: this.itemToBlock,
            nilai : 'N'
          }
          this.$store.dispatch("blockUser", sendpost)
          .then(() => {               
              this.loadItems()
              this.dialogBlock = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },   
      showUnBlockDialog(item) {
        this.itemToUnBlock = item
        this.dialogUnBlock = !this.dialogUnBlock
      },
      unblockUser() {  
          const sendpost = {
            id: this.itemToUnBlock,
            nilai : 'Y'
          }
          this.$store.dispatch("blockUser", sendpost)
          .then(() => {
              this.loadItems()     
              this.dialogUnBlock = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      showDeleteDialog(item) {
        this.itemToDelete = item
        this.dialogDelete = !this.dialogDelete
      },
      deleteUser() {  
          const sendpost = {
            id: this.itemToDelete
          }
          this.$store.dispatch("deleteUser", sendpost)
          .then(() => {
              const index = this.$store.getters.listUadmin.indexOf(this.itemToDelete)    
              this.$store.getters.listUadmin.splice(index, 1)
              this.dialogDelete = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      showResetDialog(item) {
        this.itemToReset = item
        this.dialogReset = !this.dialogReset
      },
      resetUser() {  
          const sendpost = {
            id: this.itemToReset
          }
          this.$store.dispatch("resetUser", sendpost)
          .then(() => {
              this.dialogReset = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      editUser(id) {
        this.$router.push({ name: "uadmin.details", params: { id: id } });
      },
      
      menuClient(id) {        
        this.$router.push({ name: "uadmin.menuclient", params: { id: id } });
      },
      
      menuAdmin(id) {        
        this.$router.push({ name: "uadmin.menuadminedit", params: { id: id } });
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