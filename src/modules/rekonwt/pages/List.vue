<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Rekon WT Vs Mstran </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitRekonWt">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="4" xs="12">
                  <v-autocomplete
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangRekonwt"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabang"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                    chips
                    clearable 
                    dense
                    small-chips 
                    required
                  > </v-autocomplete>
                </v-col> 
                
                <v-col cols="3" xs="12">
                    <v-autocomplete
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listDataRekonWtJadwal"
                    item-text="tanggal"
                    item-value="tanggal"
                    :items="getJadwal"
                    :rules="[v => !!v || 'Jadwal Rekon Harus diisi']"
                    label="Jadwal Rekon"
                    chips
                    clearable 
                    dense
                    small-chips 
                    required
                  > </v-autocomplete>
                  </v-col> 
                  <v-col cols="1" class="ma-1 pa-1 mx-4">
                    <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                      <v-icon left dark>
                        mdi-magnify
                      </v-icon>
                      Preview
                    </v-btn>
                  </v-col> 
                  <v-col cols="2" class="ma-1 pa-1 mx-4">
                    <download-csv
                        class = "button is-primary"
                        :data = "TablelistDataRekonwt"
                        name = "RekonWT.csv">
                        <v-btn color="secondary" small elevation="10" class="ma-2 white--text">
                          <v-icon color="light-green darken-1">mdi-file-download</v-icon> 
                          Download
                        </v-btn>
                    </download-csv>
                  </v-col> 
              </v-row>
            </v-flex> 
          </v-form>
        </div>

         
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="TablelistDataRekonwt" :search="search" mobile-breakpoint="0"> 
                      <template v-slot:[`item.id`]="{ item }">                   
                        <v-icon small color="red darken-2" class="mr-2" @click="showSaveDialog(item.id)">mdi-message</v-icon>
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
        <v-snackbar
        v-model="snackbar"
        :timeout="timeoutPesan"
        top
        color="amber darken-4"
        text
        elevation="24" 
        >
        {{ pesan }} 
         
      </v-snackbar>
      <v-overlay :absolute="absolute" :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay> 
      <v-dialog v-model="DialogKeterangan" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan Penanganan 
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                  <v-textarea
                    clearable
                    v-model="keterangan"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Penangan"
                  ></v-textarea>  
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogKeterangan = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="saveKeterangan()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-card>
    
    
</template>

<script>
export default {
  data() {
    return {    
      DialogKeterangan: false,     
      keterangan:"",      
      itemToSave: {}, 
      timeoutPesan:2000,  
      snackbar: false, 
      pesan: "", 
      absolute:true,
      search: "",  
      overlay: true, 
      tanggal: "",
      listCabangRekonwt: "",
      listDataRekonWtJadwal: "",
      windowWidth: window.innerWidth,  
      headers: [ 
          {text: 'id', value: 'id',fixed: true},
          {text: 'Kdcab', value: 'kdcab',fixed: true}, 
          {text:'kdtk', value:'kdtk'} , 
          {text:'Nama', value:'nama_toko'},
          {text:'User', value:'nama_user'},
          {text:'Keterangan', value:'keterangan'},
          {text:'bukti_tgl', value:'bukti_tgl'},
          {text:'bukti_no', value:'bukti_no'},
          {text:'rtype', value:'rtype'},
          {text:'istype', value:'istype'} ,
          {text:'sel_total_item', value:'sel_total_item'},
          {text:'sel_qty', value:'sel_qty'}, 
          {text:'sel_gross', value:'sel_gross'}, 
          {text:'sel_ppn', value:'sel_ppn'}, 
          {text:'sel_gross_jual', value:'sel_gross_jual'}, 
          {text:'sel_ppnrp_idm', value:'sel_ppnrp_idm'}, 
          {text:'sel_disc05', value:'sel_disc05'},
          {text:'toko', value:'toko'}, 
          {text:'total_item', value:'total_item'}, 
          {text:'qty', value:'qty'}, 
          {text:'gross', value:'gross'}, 
          {text:'ppn', value:'ppn'}, 
          {text:'gross_jual', value:'gross_jual'}, 
          {text:'ppnrp_idm', value:'ppnrp_idm'}, 
          {text:'disc05', value:'disc05'}, 
          {text:'total_item_wt', value:'total_item_wt'}, 
          {text:'qty_wt', value:'qty_wt'}, 
          {text:'gross_wt', value:'gross_wt'}, 
          {text:'ppn_wt', value:'ppn_wt'}, 
          {text:'gross_jual_wt', value:'gross_jual_wt'}, 
          {text:'ppnrp_idm_wt', value:'ppnrp_idm_wt'}, 
          {text:'disc05_wt', value:'disc05_wt'}

      ],
         
    };
  },
  computed: {    
    TablelistDataRekonwt() {  
      return this.$store.getters.TablelistDataRekonwt;
    },  
    getCabang() {
      return this.$store.getters.listCabangRekonwt;
    },
    getJadwal() {
      return this.$store.getters.listDataRekonWtJadwal;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
      
  },
  methods: {  
    saveKeterangan(){
        if(this.listCabangRekonwt.length === 0 || this.keterangan.length === 0 ){
            this.overlay = false
            this.pesan = "Form harus terisi!";
            this.snackbar = true;   
        }else{
          this.overlay = true 
          let dataUser = this.$store.getters.dataUsers
          const sendpost = {
              id: this.itemToSave,
              keterangan: this.keterangan,
              user:  dataUser.nama,
              kdcab:  this.listCabangRekonwt.toString()
            }
          this.$store.dispatch("saveKeterangan", sendpost)
            .then(() => {
                  const datanya = {
                    kdcab:  this.listCabangRekonwt.toString(),
                    tanggal: this.listDataRekonWtJadwal, 
                  };
                  this.$store.dispatch("getRekonWt", datanya).then(()=> {
                    this.overlay = false
                    this.DialogKeterangan = !this.DialogKeterangan
                    this.keterangan = ""
                  }).catch(() => {
                    this.overlay = false
                    this.keterangan = ""
                    this.DialogKeterangan = !this.DialogKeterangan
                  })
                
            })
            .catch((err) => {
              console.log(err);
            });  
        }     
        
      },
     showSaveDialog(item) {
        this.itemToSave = item
        this.DialogKeterangan = !this.DialogKeterangan
      },
      handleSubmitRekonWt(){
        
        if(this.listCabangRekonwt.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  kdcab:  this.listCabangRekonwt.toString(),
                  tanggal: this.listDataRekonWtJadwal, 
              };
              this.$store.dispatch("getRekonWt", datanya).then(()=> {
                this.overlay = false
              }).catch(() => {
                this.overlay = false
              })
         }
        
      },  
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangRekonWt", { kdcab : dataUser.cover});
    this.$store.dispatch("getRekonWtJadwal", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>