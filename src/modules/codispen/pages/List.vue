<template> 
  <v-sheet elevation="10">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider> 
      <v-tab key="harian">
        Dispensasi Hari Ini
      </v-tab>
      <v-tab key="bulanan">
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
                  <template v-slot:[`item.actions`]="{ item }"> 
                      <v-icon color="green lighten-2" small class="mr-2" @click="editJabatan(item.actions)">mdi-pencil</v-icon> 
                  </template> 
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
              </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>



      <v-tab-item key="bulanan">
        <v-card flat>
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
             <v-data-table :class="['word-wrap']" :headers="headers2" :items="listdata2" :search="search2" mobile-breakpoint="0" >
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
                <v-autocomplete
                  class="ma-1 pa-1 mx-4"
                  prepend-icon="mdi-home-map-marker"
                  v-model="listUserCo"
                  multiple chips
                  item-text="nama"
                  item-value="nama"
                  :items="getUserCo"
                  :rules="[v => !!v || 'Data harus diisi']"
                  label="Daftar Tim Shift"
                  required
                > 
                </v-autocomplete>   
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
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDispen">
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
      absolute:true,
      overlay:true,
      snackbar: false,
      pesan: "",   
      tab: null,       
      search:"",    
      search2:"",
      keterangan:"",
      timeoutPesan:3000,   
      listCabangCodispen:"", 
      listUserCo: "",
      tanggal1:"", 
      tanggal2:"",  
      tanggalhist:false,
      headers: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'Nama', value: 'nama'}, 
          {text: 'Jam Start', value: 'jam_start'},
          {text: 'Jam End', value: 'jam_end'},
          {text: 'Keterangan', value: 'keterangan'},
          {text: 'Supervisi', value: 'supervisi'},
          {text: 'Actions', value: 'actions'},
      ],
      headers2: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'Nama', value: 'nama'}, 
          {text: 'Jam Start', value: 'jam_start'},
          {text: 'Jam End', value: 'jam_end'},
          {text: 'Keterangan', value: 'keterangan'},
          {text: 'Supervisi', value: 'supervisi'},
          {text: 'Actions', value: 'actions'},
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
        useSeconds: true,
        ampmInTitle: true
      }
      
    } 
  }, 
  computed: { 
    computeTanggal() {
      return this.dateAwal;
    },     
    loading() {
      return this.$store.getters.loadingcodispen;
    },    
    listdata() { 
      return this.$store.getters.detailcoDispen;
    }, 
    listdata2() { 
      return this.$store.getters.detailcoDispenHis;
    }, 
    getUserCo() {
      return this.$store.getters.listUserCo;
    },
    getCabang() {
      return this.$store.getters.listUserCo;
    }, 
    pilihAllCabang () {
        return this.listUserCo.length === this.$store.getters.listUserCo.length
    },
    pilihSomeCabang () {
        return this.listUserCo.length > 0 && !this.$store.getters.listUserCo.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
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
          
          this.$store.dispatch("getCoDispenHist", datanya).then(()=> { 
           this.overlay = false
          }).catch(() => {
            this.overlay = false
          }) 
        }
      },
      saveDispen() {
        this.overlay = true
        if(this.$refs.form.validate()){
            const a = this.listUserCo.map((item)=>{ 
            
              return item.nama === undefined ? item : item.nama
            })  

          const datanya = {
            nama: a.toString(),
            tanggal1: this.tanggal1,
            tanggal2: this.tanggal2,
            keterangan: this.keterangan,
            supervisi: this.$store.getters.dataUsers.nama,
          };
          this.$store
            .dispatch("simpanAddDispen", datanya)
            .then(() => {

              this.tanggal1=""
              this.tanggal2=""
              this.keterangan=""
              this.listUserCo = []

              this.loaddata()
              this.loadlistuser()

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
        console.log( dataUser.nama)
        this.$store.dispatch("getCoDispen", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },  

      loadlistuser(){ 
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.kode_cabang
        };  
        this.$store.dispatch("getListUserCo", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },
         
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
    this.loaddata()
    this.loadlistuser()  
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
 
 