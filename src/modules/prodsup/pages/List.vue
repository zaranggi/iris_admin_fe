<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-text> 
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title primary-title> Monitoring Prodmast</v-card-title>
              <v-divider />  
              <v-card-title> 
        
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
              </v-card-text> 
            </v-card> 

             <v-card outlined class="mt-2">
              <v-card-title primary-title> Monitoring Supmast</v-card-title>
              <v-divider />  
              <v-card-title>
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
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
                  <v-data-table :class="['word-wrap']" :headers="headers2" :items="listdata2" :search="search2" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search2 }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
              </v-card-text> 
            </v-card> 
        </div>
      </v-card-text>

       <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" indeterminate>
        </v-progress-circular>
      </v-overlay>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      search2: "",
      overlay: true,  
      windowWidth: window.innerWidth,  
      headers: [
          {
            text: 'Toko', 
            value: 'toko',
            fixed: true
          },
          {
            text: 'PFE Tidak Sesuai', 
            value: 'jml_pfe_tidak_sesuai',
            fixed: true
          },
          {
            text: 'Jml Item Recid', 
            value: 'jml_item_recid'
          },
          {
            text: 'Jml Item Aktif', 
            value: 'jml_item_aktif'
          },
          {
            text: 'Update Time', 
            value: 'addtime'
          }
        ],
      headers2: [
          {
            text: 'Toko', 
            value: 'TOKO',
            fixed: true
          },
          {
            text: 'Jumlah', 
            value: 'JML',
            fixed: true
          },
          {
            text: 'Update Time', 
            value: 'addtime'
          }
        ],
    };
  },
  computed: {  
    listdata() { 
      return this.$store.getters.listDataProdsup;
    },       
    listdata2() { 
      return this.$store.getters.listDataProdsup2;
    },   
    isMobile() {
      return this.windowWidth <= 300
    }, 
  }, 
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    //let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getProdsup");
    this.overlay = false
      
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>