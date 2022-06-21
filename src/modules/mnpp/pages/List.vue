<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> Data Split NPP Toko</v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col lg="4"> 
                      <v-btn color="deep-purple lighten-5" 
                        depressed
                        elevation="2"
                        rounded @click="loadItems()">
                        <v-icon>mdi-refresh</v-icon> Refresh
                      </v-btn>
                    </v-col> 
                    <v-col lg="4" offset="4"> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdatanpp" :search="search" mobile-breakpoint="0" >
                    
                    <template v-slot:[`item.actions`]="{ item }"> 
                      <v-icon small color="red darken-2" class="mr-2" @click="showResetDialog(item.actions)">mdi-repeat</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table> 
                  <v-dialog v-model="dialogReset" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Kirim Ulang NPP
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogReset = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="resetNpp()">Reset</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog> 
                     
                </v-layout> 
              </v-card-text>
              
            </v-card> 
        </div>
            <v-overlay :absolute="absolute" :opacity="0.8" :value="overlay">
                <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
              </v-progress-circular>
            </v-overlay>
            
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      absolute: true,
      overlay: false,
      search: "", 
      windowWidth: window.innerWidth, 
      dialogReset: false,
      itemToReset: {},
      headers: [{
            text: 'Kdcab', 
            value: 'kdcab',
            fixed: true 
          }, 
          {
            text: 'kdtk', 
            value: 'kdtk'
          },
          {
            text: 'Nama File', 
            value: 'nama_file'
          },
          {
            text: 'Addtime', 
            value: 'addtime'
          },
          {
            text: 'Kirim', 
            value: 'kirim'
          },
          {
            text: 'Tanggal kirim', 
            value: 'jam_kirim'
          },
          {
            text: 'Action', 
            value: 'actions'
          },
        ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loadingnpp;
    }, 
    listdatanpp() {
      return this.$store.getters.listNpp;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      showResetDialog(item) {
        this.itemToReset = item
        this.dialogReset = !this.dialogReset
      },
      resetNpp() {  
        this.overlay = true
          const sendpost = {
            kdtk: this.itemToReset
          }
          this.$store.dispatch("resetNpp", sendpost)
          .then(() => {
              this.dialogReset = false
               this.overlay = false
              this.loadItems()
          })
          .catch(() => {
            this.overlay = false
          });  
      },
      loadItems() { 
        this.overlay = true
        this.$store.dispatch("getNpp").then(() => {
              this.overlay = false
          })
          .catch(() => {
            this.overlay = false            
          });  
      },    
      editDep(id) {
        this.$router.push({ name: "mnpp.details", params: { id: id } });
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