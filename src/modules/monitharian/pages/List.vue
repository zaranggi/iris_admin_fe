<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Monitoring Data Harian </v-card-title>
      <v-divider />   
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitMonitharian">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="12" lg="4">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangMonitharian"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangMonHarian" 
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
                        <v-icon :color="listCabangMonitharian.length > 0 ? 'indigo darken-4' : ''">
                            {{ iconCabang }}
                          </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Select All
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                  </v-select>   
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
        <div class="d-flex flex-column ma-4">  
             <v-card outlined class="mt-2"> 
              <v-card-text> 
              <v-flex lg12 md12 sm12>
                <v-row dense justify="end"> 
                  <v-col class="pa-2" lg="4"> 
                    <v-text-field
                      dense
                      placeholder="Search"
                      clearable
                      v-model="search2"
                      append-icon="mdi-magnify" single-line hide-details
                    ></v-text-field> 
                  </v-col>
                </v-row>
              </v-flex>
               <v-layout column style="padding-top:56px">
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listData" :search="search2" mobile-breakpoint="0" 
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
      kdcabnya: "" ,
      search2: "", 
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      tanggal: false,
      listCabangMonitharian: "",
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
            text: 'IRIS', 
            value: 'absen_eiscab'
          },
          {
            text: 'WRC', 
            value: 'absen_wrc'
          },
        ],
        
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },    
    getView() {
      return this.$store.getters.listCabangMonitView;
    },
    loading() {
      return this.$store.getters.loadingMonitharian;
    },   
    getbelumMonitWrc() {
      return this.$store.getters.belumMonitWrc;
    },  
    getsudahMonitWrc() {
      return this.$store.getters.sudahMonitWrc;
    },    
    getbelumMonitEis() {
      return this.$store.getters.belumMonitEis;
    },  
    getsudahMonitEis() {
      return this.$store.getters.sudahMonitEis;
    },   
    listData() { 
      return this.$store.getters.listDataMonitGab;
    },    
    getCabangMonHarian() {
      return this.$store.getters.listCabangMonitharian;
    }, 
    pilihAllCabang () {
        return this.listCabangMonitharian.length === this.$store.getters.listCabangMonitharian.length
    },
    pilihSomeCabang () {
        return this.listCabangMonitharian.length > 0 && !this.$store.getters.listCabangMonitharian.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: {  
      handleSubmitMonitharian(){
        this.overlay = true 
        const a = this.listCabangMonitharian.map((item)=>{ 

                return item.id === undefined ? item : item.id
        })  
        const datanya = {
            kdcab: a.toString(),
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getMonitharian", datanya).then(()=> {
          this.overlay = false
          
        }).catch(() => {
          this.overlay = false
        }) 
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangMonitharian = []
            } else {
              this.listCabangMonitharian = this.$store.getters.listCabangMonitharian.slice()
            }
          })
        },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    const dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangMonitharian", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>