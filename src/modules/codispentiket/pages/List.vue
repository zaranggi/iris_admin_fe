<template> 
  <v-sheet elevation="10">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider> 
      <v-tab key="harian">
        Dispensasi CO
      </v-tab>
      <v-tab key="history">
        History
      </v-tab>
      <v-tab key="setting">
        Setting
      </v-tab>
    </v-tabs> 

    <v-tabs-items v-model="tab">
      <v-tab-item key="harian">
        <v-card flat> 
              <v-card-title > 
                <v-flex lg12 md12 sm12>                  
                  <v-row dense >                     
                    <v-col class="pa-2" lg="4" offset ="8"> 
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
              <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" >
                  <template v-slot:[`item.id`]="{ index }">
                    {{ index + 1 }}
                  </template>
                  <template v-slot:[`item.no_komplain`]="{ item }">                   
                        <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialog(item.no_komplain)">mdi-eye-check-outline</v-icon>
                        {{ item.no_komplain }}
                    </template>  
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
              </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
     <v-tab-item key="history">
         <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitHist" ref="formhist">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center">   
                <v-col cols="3">
                    <v-menu
                      class="ma-1 pa-1 mx-4"
                      ref="menu"
                      v-model="tanggalhist"
                      :close-on-content-click="false" 
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="ma-1 pa-1 mx-4"
                          v-model="computeTanggal"
                          label="Pilih Periode"
                          prepend-icon="mdi-calendar" 
                          v-bind="attrs" 
                          v-on="on"
                        ></v-text-field>
                      </template>
                     <v-date-picker
                        v-model="dateAwal"
                        no-title
                        color="green lighten-1" 
                        type="month"
                        @input="tanggalhist = false"
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
        <v-card flat>
          
           <v-card-title >
                <v-flex lg12 md12 sm12>                  
                  <v-row dense >                     
                    <v-col class="pa-2" lg="4" offset ="8"> 
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
          </v-card-title>

          <v-card-text>  

             <v-data-table :class="['word-wrap']" :headers="headershist" :items="listdata2" :search="search2" mobile-breakpoint="0" >
                  <template v-slot:[`item.id`]="{ index }">
                    {{ index + 1 }}
                  </template>
                 
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
              </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>  


      <v-tab-item key="setting">
        <v-card flat>
          <v-card-text> 
             <v-form ref="form"
        @submit.prevent="onSubmit"
      >
       <v-flex lg12 md12 sm12>
          <v-row dense> 
              <v-col cols="12" lg="6"> 
                <v-text-field 
                class="ma-1 pa-1 mx-4"
                  v-model="no_komplain"
                  append-icon="mdi-account-settings"
                  :counter="4"
                  :rules="[v => !!v || 'No Komplain Harus diisi']"
                  label="No Komplain"
                  required 
                ></v-text-field>
              </v-col>  
              <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal1" label="Jam Start">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
              <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal2" label="Jam End">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
              </v-row>
                <v-row dense> 
                   <v-col cols="12" lg="8">    
                    <v-textarea
                      class="ma-1 pa-1 mx-4"
                      v-model="keterangan" 
                      append-icon="mdi-text"
                      filled
                      auto-grow 
                      label="Keterangan" 
                    ></v-textarea> 
                    </v-col>
                   <v-col cols="12" lg="2">   
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDispenTiket">
                    Simpan
                    </v-btn>
                   </v-col>
                </v-row>
              </v-flex> 
            </v-form>
      
          </v-card-text> 
        </v-card>
      </v-tab-item> 
    </v-tabs-items>

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

  <v-dialog v-model="DialogDetail" max-width="1180" >
          <v-card>
            <v-form ref="formUpdate"
              @submit.prevent="onSubmit"
            >
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon>  ({{ Dno_komplain }}) | {{ Dkdcab }}  :: {{ Dkdtk }} - {{ Dnama }}
              
            </v-card-title> 
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
               <v-row dense>
                  <v-col cols="12">
                     <template>
                      <v-simple-table
                        fixed-header 
                      >  
                      <thead>
                        <tr>
                          <th class="deep-purple darken-2 white--text" :style="indexColumnStyle" colspan="2">
                            Data Komplain Online
                          </th> 
                        </tr>
                      </thead>
                      <tbody >
                        <tr><td style="font-weight: bold;">Tanggal Buat</td><td>{{ Dtanggal_buat }}</td></tr>
                        <tr><td style="font-weight: bold;">Dibuat</td><td>{{ Ddibuat_oleh }}</td></tr>
                        <tr><td style="font-weight: bold;">Diambil</td><td>{{ Ddiambil_oleh }}</td></tr>
                        <tr><td style="font-weight: bold;">Maslaah</td><td>{{ Dmasalah }}</td></tr> 
                        <tr><td style="font-weight: bold;">Deskripsi</td><td>{{ Ddeskripsi }}</td></tr>
                        <tr><td style="font-weight: bold;">Supervisi</td><td>{{ Dsupervisi }}</td></tr>
                        <tr><td style="font-weight: bold;">Tanggal Supervisi</td><td> {{ Dcreated_at | formatTglIndo }}</td></tr>
                      </tbody> 
                  </v-simple-table>
                </template>
                  </v-col> 
               </v-row> 
                <v-divider></v-divider> 
                <v-row> 
                
                 <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal1x" label="Jam Start">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
              <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal2x" label="Jam End">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
                </v-row>
              <v-divider></v-divider> 
                <template>
                  <v-container fluid> 
                    <v-textarea
                      clearable
                      v-model="catatan"
                      clear-icon="mdi-close-circle"
                      label="Catatan Dispensasi CO"
                    ></v-textarea>  
                  </v-container> 
                </template> 
                 <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDispenTiket2">
                    Update
                    </v-btn>
            </v-card-text> 
            </v-form>
          </v-card>
      </v-dialog>


      <v-overlay :absolute="absolute" opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay>

  </v-sheet>
  
</template>

<script>
//import moment from 'moment';
export default { 
  data() {
    return { 
       
      indexColumnStyle: {
        width: "100px",
        textAlign: "center"
      },
      tanggalhist: false,
      DialogDetail: false,
      absolute:true,
      overlay:true,
      snackbar: false,
      pesan: "",   
      tab: null,
      Dno_komplain:"",
      Dmasalah:"",
      Dkdcab:"",
      Dkdtk:"", 
      Dnama:"",   
      Dtanggal_buat:"",  
      Ddibuat_oleh:"",  
      Ddiambil_oleh:"",  
      Ddeskripsi:"",  
      Dsupervisi:"",  
      catatan:"", 
      Dcreated_at:"",  
      search:"",    
      search2:"",
      keterangan:"",
      no_komplain:"",
      tanggal1:"", 
      tanggal2:"", 
      tanggal1x:"", 
      tanggal2x:"", 
      timeoutPesan:3000,    
      headers: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'No Komplain', value: 'no_komplain'}, 
          {text: 'Cabang', value: 'cabang'}, 
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama', value: 'nama'},    
          {text: 'Tgl Buat Co', value: 'tanggal_buat'},    
          {text: 'Supervisi', value: 'supervisi'},
          {text: 'Start Dispen', value: 'jam_start'},
          {text: 'End Dispen', value: 'jam_end'},
      ],   
      headershist: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'No Komplain', value: 'no_komplain'}, 
          {text: 'Cabang', value: 'cabang'}, 
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama', value: 'nama'},    
          {text: 'Tgl Buat Co', value: 'tanggal_buat'},    
          {text: 'Supervisi', value: 'supervisi'},
          {text: 'Start Dispen', value: 'jam_start'},
          {text: 'End Dispen', value: 'jam_end'},
      ], 
      dateAwal: new Date().toISOString().substr(0, 7),
      nullDatetime: null,
      datetime: new Date(),
      datetimeString: '',
      formattedDatetime: '',
      textFieldProps: {
        appendIcon: 'event'
      },
      dateProps: {
        headerColor: 'red'
      },
      timeProps: {
        useSeconds: false,
        ampmInTitle: false
      }
      
    } 
  }, 
  computed: { 
    computeTanggal() {
      return this.dateAwal;
    },  
    listdata() { 
      return this.$store.getters.detailcoDispenTiket;
    }, 
    listdata2() { 
      return this.$store.getters.detailcoDispenHisTiket;
    },  
     
  },
  methods: { 
    handleSubmitHist(){ 
        if(this.$refs.formhist.validate()){
          this.overlay = true
          const dataUser = this.$store.getters.dataUsers
        
          const datanya = { 
              kdcab:  dataUser.kode_cabang,
              tanggal: this.dateAwal,
          };
          
          this.$store.dispatch("getCoDispenTiketHist", datanya).then(()=> { 
           this.overlay = false
          }).catch(() => {
            this.overlay = false
          }) 
        }
      },
      saveDispenTiket() {
        this.overlay = true
        if(this.$refs.form.validate()){ 

          const datanya = {
            cabang: this.$store.getters.dataUsers.kode_cabang,
            no_komplain: this.no_komplain, 
            keterangan: this.keterangan,
            tanggal1: this.tanggal1,
            tanggal2: this.tanggal2,
            supervisi: this.$store.getters.dataUsers.nama,
          };
          this.$store
            .dispatch("simpanAddDispenTiket", datanya)
            .then(() => {
              this.tanggal1=""
              this.tanggal2=""
              this.no_komplain=" " 
              this.keterangan=" "  
              this.loaddata() 

              this.pesan = "Input data Sukses";
              this.snackbar = true;
              this.overlay = false
              
            })
            .catch((err) => {
              this.errorMessages = err.msg;
              this.snackbar = true;
              this.overlay = false
            });
        }else{
            this.errorMessages = "Data tidak boleh kosong";
            this.snackbar = true;
            this.overlay = false
        }
        
      }, 
      saveDispenTiket2() {
        this.overlay = true
        if(this.$refs.formUpdate.validate()){ 

          const datanya = {
            no_komplain: this.Dno_komplain, 
            keterangan: this.catatan,
            tanggal1: this.tanggal1x,
            tanggal2: this.tanggal2x
            
          }; 
           this.$store
            .dispatch("simpanUpdateDispenTiket", datanya)
            .then(() => {
              this.tanggal1x=""
              this.tanggal2x=""
              this.no_komplainx=" " 
              this.catatan=""  
              this.loaddata() 

              this.pesan = "Input data Sukses";
              this.snackbar = true;
              this.overlay = false
              this.DialogDetail = !this.DialogDetail

              
            })
            .catch((err) => {
              this.errorMessages = err.msg;
              this.snackbar = true
              this.overlay = false 
              this.DialogDetail = !this.DialogDetail
            }); 
        }else{
            this.errorMessages = "Data tidak boleh kosong";
            this.snackbar = true;
            this.overlay = false
            this.DialogDetail = !this.DialogDetail
        }
        
      }, 
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listUserCo = []
            } else {
              this.listUserCo = this.$store.getters.listUserCo.slice()
            }
          })
      },          
      loaddata(){ 
        this.overlay = true
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.kode_cabang
        };  
        this.$store.dispatch("getCoDispenTiket", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },  
      showDetailDialog(item) {
          this.overlay = true
          const datanya = {
            no_komplain:  item
          };
              this.$store.dispatch("getCoDispenTiketDetail", datanya).then((r)=> {  

                  this.Dkdcab= r[0].cabang,
                  this.Dkdtk= r[0].kdtk,
                  this.Dnama= r[0].nama, 
                  this.Dno_komplain= r[0].no_komplain, 
                  this.Dmasalah= r[0].masalah, 
                  this.Dtanggal_buat= r[0].tanggal_buat, 
                  this.Ddibuat_oleh= r[0].dibuat_oleh, 
                  this.Ddiambil_oleh= r[0].diambil_oleh, 
                  this.Ddeskripsi= r[0].deskripsi, 
                  this.Dsupervisi= r[0].supervisi, 
                  this.catatan= r[0].keterangan,
                  this.Dcreated_at= r[0].created_at
                  this.tanggal1x = r[0].jam_start.substr(0,16)
                  this.tanggal2x = r[0].jam_end.substr(0,16)
                  
                  this.overlay = false
                  this.DialogDetail = !this.DialogDetail
              }).catch(() => { 
                this.overlay = false
              }) 
      }, 
         
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
    this.loaddata() 
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
}     
.v-input {
    font-size: 1.0em;
}

</style> 

<style>
   
.table-header-cell-class {
    background: #42ddf5 !important;
    color: rgb(49, 49, 49) !important;
    text-align: center;
  } 
.table-footer-cell-class1 {
    background: #42ddf5 !important;
    color: rgb(49, 49, 49) !important;
    text-align: center;
    font-weight: bold;
  } 
  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  } 
  .skill-span {
        display: inline-block;
        margin-right: 5px;
        border-radius: 4px;
        color: #333;
        width: 25px;
        text-align: center; 
        font-weight: bold;
    } 
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #fc2841;
  }
</style>
 
 