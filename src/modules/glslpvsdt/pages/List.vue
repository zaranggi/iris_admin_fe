<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Cek GLSLP Vs DT Iris </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitGlslpvsdt">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="12" lg="4">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangGlslpvsdt"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabang"
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
                        <v-icon :color="listCabangGlslpvsdt.length > 0 ? 'indigo darken-4' : ''">
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
                  </template></v-select>   
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
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Cek Sales
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
                    
                    <template v-slot:[`item.tgldata`]="{ item }">
                      {{ item.tanggal | formatTglIndo }}
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
      listCabangGlslpvsdt: "",
      windowWidth: window.innerWidth,  
      headers: [
        
          {
            text: 'TANGGAL', 
            value: 'tanggal',
            fixed: true
          },
          {
            text: 'TOKO', 
            value: 'toko'
          },
          {
            text: 'NAMA', 
            value: 'nama'
          }, 
          {
            text: 'SEL_DR_CR', 
            value: 'SEL_DR_CR'
          }, 
          {
            text: 'SEL_SALES', 
            value: 'SEL_SALES'
          }, 
          {
            text: 'SEL_PPN', 
            value: 'SEL_PPN'
          }, 
          {
            text: 'SEL_PPN2', 
            value: 'SEL_PPN2'
          }, 
          {
            text: 'SEL_HPP', 
            value: 'SEL_HPP'
          }, 
        ],
        
        
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },    
    loading() {
      return this.$store.getters.loadingGlslpvsdt;
    },   
     
    listdata() {  
      return this.$store.getters.listDataGlslpvsdt;
    },  
     
    getCabang() {
      return this.$store.getters.listCabangGlslpvsdt;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangGlslpvsdt.length === this.$store.getters.listCabangGlslpvsdt.length
    },
    pilihSomeCabang () {
        return this.listCabangGlslpvsdt.length > 0 && !this.$store.getters.listCabangGlslpvsdt.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
  },
  methods: {  
      handleSubmitGlslpvsdt(){
        this.overlay = true
        const a = this.listCabangGlslpvsdt.map((item)=>{ 
          return item.id === undefined ? item : item.id
        })  
        const datanya = {
            kdcab:  a.toString(),
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getGlslpvsdt", datanya).then(()=> {
          this.overlay = false
        }).catch(() => {
          this.overlay = false
        })
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangGlslpvsdt = []
            } else {
              this.listCabangGlslpvsdt = this.$store.getters.listCabangGlslpvsdt.slice()
            }
          })
        },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangGlslpvsdt", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>