<template> 

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Pengecekan NP Toko </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitCeknp" ref="form">
            <v-flex lg12 md12 sm12>
              <v-row dense> 
                <v-col cols="3">
                  <v-autocomplete
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangCeknp"
                    item-text="nama_cabang"
                    item-value="nama_cabang"
                    :items="getCabangCeknp"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                    @change="getListTokoCeknp" 
                    required
                  > </v-autocomplete>   
                </v-col>  
                <v-col cols="3">
                  <v-autocomplete
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listTokoCeknp"
                    item-text="namatoko"
                    item-value="toko"
                    :items="getTokoCeknp"
                    :rules="[v => !!v || 'Toko Harus diisi']"
                    label="Toko" 
                    required
                  > </v-autocomplete>   
                </v-col> 
                
                <v-col cols="2">
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
                        height="290"
                        @input="tanggal = false"
                        required
                      ></v-date-picker>
                    </v-menu>
                  </v-col> 
                  <v-col cols="2">
                     <v-text-field  
                          class="ma-1 pa-1 mx-4"
                          v-model="docno"
                          append-icon="mdi-library"
                          :counter="15"
                          :rules="[numberRule || 'Docno Harus diisi']"
                          label="Docno NP" 
                          required 
                        ></v-text-field>
                </v-col> 
                 
                  <v-col cols="2" lg="1" class="ma-1 pa-1 mx-4">
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

        <template>
           <v-row dense>
             <v-col cols="12">
              <v-divider
                inset
              ></v-divider>

                <div class="d-flex flex-column ma-4">  
                  <v-card outlined class="mt-2">
                    <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Hasil pengecekan Data - LIS DC
                    </v-card-title>

                    <v-card-text> 
                    <v-layout column style="padding-top:56px">
                        <v-data-table :class="['word-wrap']" :headers="headers" :items="getlistCeknp_ora" :search="search" mobile-breakpoint="0">
                           
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                          </v-alert>
                        </v-data-table> 
                      </v-layout> 
                    </v-card-text>
                    
                  </v-card> 
              </div>
              <div class="d-flex flex-column ma-4">  
                  <v-card outlined class="mt-2">
                    <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Hasil pengecekan Data - POSRT
                    </v-card-title>

                    <v-card-text> 
                    <v-layout column style="padding-top:56px">
                        <v-data-table :class="['word-wrap']" :headers="headers2" :items="getlistCeknp_rt" :search="search2" mobile-breakpoint="0">
                           
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search2 }}" found no results.
                          </v-alert>
                        </v-data-table> 
                      </v-layout> 
                    </v-card-text>
                    
                  </v-card> 
              </div>
            </v-col>
          </v-row>
          
        </template> 

      </v-card-text>  
    
        <v-snackbar
          v-model="dialog"
          :timeout="timeoutPesan" 
          color="grey darken-3"
          text
          elevation="24" 
          :multi-line="multiLine"
          absolute
          shaped
          top
          >
          {{ pesan }} 
          
        </v-snackbar>
    </v-card>  
</template>

<script>
export default {
  data() {
    return {    
      multiLine: true,
      timeoutPesan:8000,   
      dialog:false,
      fullPage: false,
      pesan: "",
      search: "",  
      search2: "",
      dateAwal: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),  
      tanggal: false,
      listCabangCeknp: "",
      listTokoCeknp: "",
      docno:"",
      windowWidth: window.innerWidth, 
      numberRule: v  => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999999999) return true;
        return 'isikan nomor docno 0-999999999';
      },
      headers: [   
          {text: 'Kdtk', value: 'toko'},
          {text: 'No NP', value: 'log_no_npb'},
          {text: 'Tanggal', value: 'log_tgl_npb'},
          {text: 'Nama File', value: 'log_namafile'},
          {text: 'Create DC', value: 'log_stat_create'},
          {text: 'Status DC', value: 'log_stat_rcv'},
          {text: 'Proses Toko', value: 'log_stat_proses'},
          {text: 'No BPB', value: 'log_nobpb'}
      ],
      headers2: [  
          {text: 'Toko', value: 'toko'},
          {text: 'Nama File', value: 'namafile'},
          {text: 'Diterima Server', value: 'tglserverterima'},
          {text: 'Toko Ambil', value: 'tgltokoambil'},
          {text: 'Toko Proses', value: 'tgltokoproses'},
          {text: 'Status Ambil Toko', value: 'statusambil'},
      ]
         
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },  
    getCabangCeknp() {
      return this.$store.getters.listCabangCeknp;
    }, 
    getTokoCeknp() {
      return this.$store.getters.listTokoCeknp;
    }, 
    getlistCeknp_ora(){
      return this.$store.getters.listDataCeknp_ora;
    }, 
    getlistCeknp_rt(){
      return this.$store.getters.listDataCeknp_rt;
    }, 
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: {   
      getListTokoCeknp(){
        
          let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
         
          const datanya = {
              kdcab:  this.listCabangCeknp
          };
          this.$store.dispatch("getTokoCeknp", datanya).then(()=> {   
            loading.hide()
          }).catch(() => { 
            loading.hide()
          })
      },
      async handleSubmitCeknp(){ 
        if(this.$refs.form.validate()){
           let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
          
          const datanya = {
              kdcab:  this.listCabangCeknp,
              toko:  this.listTokoCeknp,
              docno:  this.docno,
              tanggal: this.dateAwal,
          };
          await this.$store.dispatch("getDataCeknp", datanya).then( (res) => {  

            loading.hide()
            if(res === "None"){
              this.dialog = true
              this.pesan = "Data Tidak Ditemukan"
              
            }else if (res === "Error"){
              this.dialog = true
              this.pesan = "Server ERROR!!"
 
            }else{
              this.dialog = true
              this.pesan = "Data ditemukan"
            }

          }).catch((e) => {
            
            loading.hide()
            console.log(e)
          }) 
        }
      }, 
      
  },
  mounted() {   
    
    let dataUser = this.$store.getters.dataUsers
    let loading = this.$loading.show({
      color:"#f09000",
      container: this.fullPage ? null : this.$refs.formContainer,
      backgroundColor: "#525252",
      loader: 'dots',
      canCancel: true, 
      onCancel: this.onCancel,
    })
    this.$store.dispatch("getCabangCeknp", { kdcab : dataUser.cover}).then( ()=> { 
     
           this.$loading.hide()
    }).catch(() => {
        loading.hide()
    });
    
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>
<style>
 
 
  .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
} 
</style>