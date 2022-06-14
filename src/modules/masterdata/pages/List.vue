<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Download Master Data Iris </v-card-title>
      <v-divider />   
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitMdata">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="12" lg="4">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangMdata"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangMdata" 
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                     chips
                      clearable
                      deletable-chips 
                    required
                  >
                     
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
      kdcabnya: "" , 
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      tanggal: false,
      listCabangMdata: "",
      windowWidth: window.innerWidth   
    }
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },     
    loading() {
      return this.$store.getters.loadingMonitharian;
    },       
    getCabangMdata() {
      return this.$store.getters.listCabangMdata;
    }, 
    /* pilihAllCabang () {
        return this.listCabangMdata.length === this.$store.getters.listCabangMdata.length
    },
    pilihSomeCabang () {
        return this.listCabangMdata.length > 0 && !this.$store.getters.listCabangMdata.length
    },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },  */
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: {  
      handleSubmitMdata(){
        this.overlay = true  
        const datanya = {
            kdcab: this.listCabangMdata.toString(),
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getMonitharian", datanya).then(()=> {
          this.overlay = false
          
        }).catch(() => {
          this.overlay = false
        }) 
      },
      
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    const dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangMdata", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>