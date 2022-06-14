<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> List Cabang</v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense >
                    <v-col class="mr-auto"> 
                        <v-btn fab dark small color="indigo" to="/cabang/add">
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdatamancabang" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }"> 
                        <v-icon color="green lighten-2" small class="mr-2" @click="editCabang(item.actions)">mdi-pencil</v-icon>
                        <v-icon small color="red darken-2" @click="showDeleteDialog(item.actions)">mdi-delete</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>

                   <v-dialog v-model="dialogDeleteCabang" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Hapus Cabang
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogDeleteCabang = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="deleteCabang()">Delete</v-btn>
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
      dialogDeleteCabang: false,
      itemToDeleteCabang: {},
      headers: [{
            text: 'No', 
            value: 'id',
            fixed: true 
          },
          {
            text: 'Kode', 
            value: 'kdcab'
          },
          {
            text: 'Nama Cabang', 
            value: 'namacabang'
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
      return this.$store.getters.loadingmancabang;
    }, 
    listdatamancabang() {
      return this.$store.getters.listManCabang;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      loadItems() { 
        this.$store.dispatch("getManCabang") 
      },   
      showDeleteDialog(item) {
        this.itemToDeleteCabang = item
        this.dialogDeleteCabang = !this.dialogDeleteCabang
      },
      deleteCabang() {  
          const sendpost = {
            id: this.itemToDeleteCabang
          }
          this.$store.dispatch("deleteCabang", sendpost)
          .then(() => {
              const index = this.$store.getters.listManCabang.indexOf(this.itemToDeleteCabang)    
              this.$store.getters.listManCabang.splice(index, 1)
              this.dialogDeleteCabang = false
          })
          .catch((err) => {
            console.log(err);
          });  
      },
      editCabang(id) {
        this.$router.push({ name: "cabang.details", params: { id: id } });
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