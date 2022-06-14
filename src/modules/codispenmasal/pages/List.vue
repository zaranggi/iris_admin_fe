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
                  <template v-slot:[`item.id`]="{ item }">
                    <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialog(item.id)">mdi-eye-check-outline</v-icon>
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
                    <v-col class="pa-2" md="4"> 
                              <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="listdata2" 
                                worksheet="Data" 
                                name="history.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                          </v-col>                
                    <v-col class="pa-2" lg="4" offset ="4"> 
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
              <v-col cols="12" lg="5"> 
                <v-select
                      class="ma-1 pa-1 mx-4"
                      prepend-icon="mdi-home-map-marker"
                      v-model="listCabangCoDispenMasal"
                      item-text="nama_cabang"
                      item-value="nama_cabang"
                      :items="getCabang"
                      :rules="[v => !!v || 'Cabang Harus diisi']"
                      label="Cabang"
                      chips
                      clearable
                      deletable-chips 
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
                          <v-icon :color="listCabangCoDispenMasal.length > 0 ? 'indigo darken-4' : ''">
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
                <v-text-field 
                class="ma-1 pa-1 mx-4"
                  v-model="detail_masalah"
                  append-icon="mdi-account-settings"
                  :counter="4"
                  :rules="[v => !!v || 'Deskripsi CO Harus diisi']"
                  label="Deskripsi CO"
                  required 
                ></v-text-field>
              </v-col> 
              <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal1" label="Jam Start"  class="ma-1 pa-1 mx-4">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
              <v-col cols="12" lg="2">   
                <v-datetime-picker v-model="tanggal2" label="Jam End"  class="ma-1 pa-1 mx-4">
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
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDispenMasal">
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

  <v-dialog v-model="DialogDetail" max-width="680" >
          <v-card>
            <v-form ref="formUpdate"
              @submit.prevent="onSubmit"
            >
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Cabang : {{ Dcabang }}
              
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
                                Data Dispensasi Komplain Online Masal
                              </th> 
                            </tr>
                          </thead>
                          <tbody >
                            <tr><td style="font-weight: bold;">Tanggal Mulai</td><td>{{ Dtanggal_start }}</td></tr>
                            <tr><td style="font-weight: bold;">Tanggal Berakhir</td><td>{{ Dtanggal_end }}</td></tr> 
                            <tr><td style="font-weight: bold;">Total CO</td><td>{{ Dtotal_co }}</td></tr>
                            <tr><td style="font-weight: bold;">Supervisi</td><td>{{ Dsupervisi }}</td></tr>
                          </tbody> 
                        </v-simple-table>
                      </template>
                  </v-col> 
               </v-row> 
                <v-divider></v-divider> 
                <v-row>  
                <v-col cols="12" lg="3" offset-lg="1"> 
               
                <v-datetime-picker v-model="Dtanggal_start" label="Jam Start">
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn color="error lighten-1" @click.native="parent.clearHandler">Cancel</v-btn>
                    <v-btn color="success darken-1" @click="parent.okHandler">Done</v-btn>
                  </template>
                </v-datetime-picker> 
              </v-col>  
              <v-col cols="12" lg="3">   
                <v-datetime-picker v-model="Dtanggal_end" label="Jam End">
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
                 <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDispenMasal2">
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
      listCabangCoDispenMasal:"",
      detail_masalah:"",
      tanggalhist: false,
      DialogDetail: false,
      absolute:true,
      overlay:true,
      snackbar: false,
      pesan: "",   
      tab: null, 
      Dtanggal_start:"",  
      Dtanggal_end:"",  
      Dcabang:"",  
      Dcoverage:"",  
      Dsupervisi:"",  
      Dtotal_co:"",  
      catatan:"",   
      search:"",    
      search2:"",
      keterangan:"",
      tanggal1:"", 
      tanggal2:"", 
      tanggal1x:"", 
      tanggal2x:"", 
      timeoutPesan:3000,    
      headers: [
          {text: 'No', value: 'id',fixed: true },  
          {text: 'Cabang', value: 'cabang'},
          {text: 'Dispensasi Cabang', value: 'coverage'},  
          {text: 'Desc', value: 'keterangan'},    
          {text: 'Total Co', value: 'total_co'},
          {text: 'Supervisi', value: 'supervisi'},
          {text: 'Start Dispen', value: 'jam_start'},
          {text: 'End Dispen', value: 'jam_end'},
      ],   
      headershist: [
          {text: 'No', value: 'id',fixed: true },  
          {text: 'Cabang', value: 'cabang'},
          {text: 'Dispensasi Cabang', value: 'coverage'},  
          {text: 'Desc', value: 'keterangan'},
          {text: 'Keterangan',  value: 'detail_masalah'},
          {text: 'Total Co', value: 'total_co'},
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
      return this.$store.getters.detailcoDispenMasal;
    }, 
    listdata2() { 
      return this.$store.getters.detailcoDispenHisMasal;
    },  
    getCabang() {
      return this.$store.getters.listCabangCoDispenMasal;
    },  
    pilihAllCabang () {
        return this.listCabangCoDispenMasal.length === this.$store.getters.listCabangCoDispenMasal.length
    },
    pilihSomeCabang () {
        return this.listCabangCoDispenMasal.length > 0 && !this.$store.getters.listCabangCoDispenMasal.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
  },
  methods: { 
     toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangCoDispenMasal = []
            } else {
              this.listCabangCoDispenMasal = this.$store.getters.listCabangCoDispenMasal.slice()
            }
          })
      },
    handleSubmitHist(){ 
        if(this.$refs.formhist.validate()){
          this.overlay = true
          const dataUser = this.$store.getters.dataUsers
        
          const datanya = { 
              kdcab:  dataUser.kode_cabang,
              tanggal: this.dateAwal,
          };
          
          this.$store.dispatch("getCoDispenMasalHist", datanya).then(()=> { 
           this.overlay = false
          }).catch(() => {
            this.overlay = false
          }) 
        }
      },

      saveDispenMasal() {
        this.overlay = true
        if(this.$refs.form.validate()){ 
            const kotas = this.listCabangCoDispenMasal.map((item)=>{  
              return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
            })  
          const datanya = {
            cabang: this.$store.getters.dataUsers.kode_cabang,
            coverage:  kotas.toString(), 
            detail_masalah: this.detail_masalah,
            keterangan: this.keterangan,
            tanggal1: this.tanggal1,
            tanggal2: this.tanggal2,
            supervisi: this.$store.getters.dataUsers.nama,
          };
          this.$store
            .dispatch("simpanAddDispenMasal", datanya)
            .then(() => {
              this.tanggal1=""
              this.tanggal2="" 
              this.detail_masalah="" 
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
      
      saveDispenMasal2() {
        this.overlay = true
        if(this.$refs.formUpdate.validate()){ 

          const datanya = {
            no_komplain: this.Dno_komplain, 
            keterangan: this.catatan,
            tanggal1: this.tanggal1x,
            tanggal2: this.tanggal2x
            
          }; 
           this.$store
            .dispatch("simpanUpdateDispenMasal", datanya)
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
      loaddata(){ 
        this.overlay = true
        const dataUser = this.$store.getters.dataUsers
        this.$store.dispatch("getCabangCoDispenMasal", { kdcab : dataUser.cover})

        const datanya = {
              kdcab:  dataUser.kode_cabang
        };  

        this.$store.dispatch("getCoDispenMasal", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },  
      showDetailDialog(item) {
          this.overlay = true
          const datanya = {
            id:  item
          };
              this.$store.dispatch("getCoDispenMasalDetail", datanya).then((r)=> {  

                  this.Dcabang= r[0].cabang    
                  this.Dcoverage= r[0].coverage
                  this.Dtotal_co= r[0].total_co 
                  this.catatan= r[0].keterangan
                  this.Dsupervisi = r[0].supervisi
                  this.Dcreated_at= r[0].created_at
                  this.Dtanggal_start = r[0].jam_start.substr(0,16)
                  this.Dtanggal_end = r[0].jam_end.substr(0,16)
                  
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
  .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
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
 
 