<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Monitoring Data Harian |  File PR dan ST </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitPrst">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="12" lg="4">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangPrst"
                    item-text="nama_cabang"
                    item-value="kdcab"
                    :items="getCabang"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                    required
                  ></v-select>   
                </v-col> 
                
                <v-col cols="12" lg="3">
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
                  </v-col> 
                  <v-col cols="4" lg="1" class="ma-1 pa-1 mx-4">
                    <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                      <v-icon left dark>
                        mdi-magnify
                      </v-icon>
                      Preview
                    </v-btn>
                  </v-col> 
              </v-row>
            </v-flex> 
          </v-form>
        </div>

        <template >
          <v-container>
              <v-row justify="center">
                <v-col cols="3" sm="6" md="4">
                  <v-card dark shaped class="rounded-card mx-auto mt-5" max-width="250" color="#26c6da">
                    <v-card-title>
                      <v-icon
                        large
                        left
                      >
                        mdi-cloud-check
                      </v-icon>
                      <span class="title font-weight-light">Sudah Proses</span>
                    </v-card-title>
                    <v-card-text>
                      <v-row align="center" class="mx-0">
                        <div class="headline font-weight-bold">                      
                          File PR : {{ getsudahPr }} Toko
                        </div>
                        <div class="headline font-weight-bold">                      
                          File ST : {{ getsudahSt }} Toko
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-card> 
                </v-col>
               
                <v-col cols="3" sm="6" md="4">
                  <v-card dark shaped class="rounded-card mx-auto mt-5" max-width="250" color="orange">
                    <v-card-title>
                      <v-icon
                        large
                        left
                      >
                        mdi-cloud
                      </v-icon>
                      <span class="title font-weight-light">Belum Proses</span>
                    </v-card-title>
                    <v-card-text>
                      <v-row align="center" class="mx-0">
                        <div class="headline font-weight-bold">                      
                          File PR : {{ getbelumSt }} Toko
                        </div>
                        <div class="headline font-weight-bold">                      
                          File ST : {{ getbelumSt }} Toko
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col> 
                
              </v-row>
            </v-container> 
        </template>
        

        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" 
                  :loading="loading">
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
        </div>
      </v-card-text>
      <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay>
    </v-card>
    
</template>

<script>
export default {
  data() {
    return {
      search: "", 
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      tanggal: false,
      listCabangPrst: "",
      windowWidth: window.innerWidth,  
      headers: [
          {
            text: 'Kdcab', 
            value: 'kdcab',
            fixed: true
          },
          {
            text: 'Kdtk', 
            value: 'kdtk',
            fixed: true
          },
          {
            text: 'Nama', 
            value: 'nama'
          }, 
          {
            text: 'File PR', 
            value: 'pr'
          },
          {
            text: 'File ST', 
            value: 'st'
          }, 
        ],
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },
    
    loading() {
      return this.$store.getters.loadingPrst;
    },   
    getbelumPr() {
      return this.$store.getters.belumPr;
    },  
    getsudahPr() {
      return this.$store.getters.sudahPr;
    },    
    getbelumSt() {
      return this.$store.getters.belumSt;
    },  
    getsudahSt() {
      return this.$store.getters.sudahSt;
    },   
    listdata() { 
      return this.$store.getters.listDataPrst;
    },  
    getCabang() {
      return this.$store.getters.listCabangPrst;
    },
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: {  
      handleSubmitPrst(){
        this.overlay = true
        const datanya = {
            kdcab: this.listCabangPrst,
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getPrst", datanya).then(()=> {
          this.overlay = false
        }).catch(() => {
          this.overlay = false
        })
      }
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangPrst", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>