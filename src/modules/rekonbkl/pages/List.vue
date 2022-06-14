<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Rekon BKL </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitRekonbkl">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="4" xs="12">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangRekonbkl"
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
                        <v-icon :color="listCabangRekonbkl.length > 0 ? 'indigo darken-4' : ''">
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
                
                <v-col cols="2" xs="12">
                    <v-menu
                      class="ma-1 pa-1 mx-4"
                      ref="menu"
                      v-model="tanggal1"
                      :close-on-content-click="false" 
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="ma-1 pa-1 mx-4"
                          v-model="computeTanggal1"
                          label="Pilih Tanggal"
                          prepend-icon="mdi-calendar" 
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                     <v-date-picker
                        v-model="dateAwal1"
                        no-title
                        color="green lighten-1" 
                        @input="tanggal1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col> 

                  <v-col cols="2" xs="12">
                    <v-menu
                      class="ma-1 pa-1 mx-4"
                      ref="menu"
                      v-model="tanggal2"
                      :close-on-content-click="false" 
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="ma-1 pa-1 mx-4"
                          v-model="computeTanggal2"
                          label="Pilih Tanggal"
                          prepend-icon="mdi-calendar" 
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                     <v-date-picker
                        v-model="dateAwal2"
                        no-title
                        color="green lighten-1" 
                        @input="tanggal2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col> 

                   <v-col cols="1" xs="1" class="ma-1 pa-1 mx-4">
                    <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                      <v-icon left dark>
                        mdi-magnify
                      </v-icon>
                      Get Data
                    </v-btn>
                  </v-col> 
                  <v-col cols="2" class="ma-1 pa-1 mx-4">
                    <download-csv
                        class= "button is-primary"
                        :data   = "listdata"
                        name="Rekon bkl.csv">
                        <v-btn color="secondary"  small elevation="10" class="ma-2 white--text">
                          <v-icon color="light-green darken-1">mdi-file-download</v-icon> 
                          Download
                        </v-btn>
                    </download-csv>
                  </v-col> 
              </v-row>
            </v-flex> 
          </v-form>
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
      overlay: true,
      dateAwal1: new Date().toISOString().substr(0, 10),
      dateAwal2: new Date().toISOString().substr(0, 10),
      tanggal1: false,
      tanggal2: false,
      listCabangRekonbkl: "",
      windowWidth: window.innerWidth,  
    };
  },
  computed: {
    computeTanggal1() {
      return this.dateAwal1;
    },   
    computeTanggal2() {
      return this.dateAwal2;
    },     
    listdata() {  
      return this.$store.getters.listDataRekonbkl;
    },  
     
    getCabang() {
      return this.$store.getters.listCabangRekonbkl;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangRekonbkl.length === this.$store.getters.listCabangRekonbkl.length
    },
    pilihSomeCabang () {
        return this.listCabangRekonbkl.length > 0 && !this.$store.getters.listCabangRekonbkl.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
  },
  methods: {  
      handleSubmitRekonbkl(){
        this.overlay = true
        const a = this.listCabangRekonbkl.map((item)=>{ 
          return item.id === undefined ? item : item.id
        })  
        const datanya = {
            kdcab:  a.toString(),
            tanggal1: this.dateAwal1,
            tanggal2: this.dateAwal2,
        };
        console.log(datanya)
        this.$store.dispatch("getRekonbkl", datanya).then(()=> {
          this.overlay = false
        }).catch(() => {
          this.overlay = false
        })
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangRekonbkl = []
            } else {
              this.listCabangRekonbkl = this.$store.getters.listCabangRekonbkl.slice()
            }
          })
        },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangRekonbkl", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>