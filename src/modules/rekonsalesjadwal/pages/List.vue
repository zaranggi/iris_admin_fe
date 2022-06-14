<template> 

  <v-sheet elevation="10">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider> 
      <v-tab key="jadwal">
        Jadwal Rekon DT vs Mtran
      </v-tab> 
      <v-tab key="setting">
        Setting
      </v-tab>
    </v-tabs> 

    <v-tabs-items v-model="tab">
      <v-tab-item key="jadwal">
        <v-card flat>
           <v-app-bar flat color="rgba(0, 0, 0, 0)"> 
            <v-spacer></v-spacer>
            <v-btn color="tosca" icon @click="loaddata()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text>   
              <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" >
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
            <v-col cols="5"> 
               <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangRekonsalesJadwal"
                    item-text="nama_cabang"
                    item-value="kdcab"
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
                        <v-icon :color="listCabangRekonsalesJadwal.length > 0 ? 'indigo darken-4' : ''">
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
               <v-col cols="2" >   
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
                        @input="tanggal1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col> 
                  
              <v-col cols="2">   
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
                        v-model="dateAkh"
                        no-title
                        color="green lighten-1" 
                        @input="tanggal2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>  
                  
                   <v-col cols="2" >   
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveJadwal">
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
      timeoutPesan:3000,   
      listCabangRekonsalesJadwal:[],  
      tanggal1:"", 
      tanggal2:"", 
      headers: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'Kode Cabang', value: 'kdcab'}, 
          {text: 'Nama', value: 'branch_name'}, 
          {text: 'Tanggal Awal', value: 'tanggal1'}, 
          {text: 'Tanggal Akhir', value: 'tanggal2'},
          {text: 'Belum', value: 'belum'},
          {text: 'Gagal', value: 'gagal'},
          {text: 'Sukses', value: 'sukses'}
      ],
      dateAwal: new Date().toISOString().substr(0, 10),
      dateAkh: new Date().toISOString().substr(0, 10),
      
      
    } 
  }, 
  computed: { 
    computeTanggal() {
      return this.dateAwal;
    },       
    computeTanggal2() {
      return this.dateAkh;
    },       
    listdata() { 
      return this.$store.getters.detailRekonsalesJadwal;
    },   
    getCabang() {
      return this.$store.getters.listCabangRekonsalesJadwal;
    }, 
    pilihAllCabang () {
        return this.listCabangRekonsalesJadwal.length === this.$store.getters.listCabangRekonsalesJadwal.length
    },
    pilihSomeCabang () {
        return this.listCabangRekonsalesJadwal.length > 0 && !this.$store.getters.listCabangRekonsalesJadwal.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
     
  },
  methods: { 
      saveJadwal() {
        this.overlay = true
        if(this.$refs.form.validate()){
            const a = this.listCabangRekonsalesJadwal.map((item)=>{ 
            
              return item.kdcab === undefined ? item : item.kdcab
            })  

          const datanya = {
            kdcab: a.toString(),
            tanggal1: this.dateAwal,
            tanggal2: this.dateAkh
            
          };
          this.$store
            .dispatch("simpanAddRekonsalesJadwal", datanya)
            .then(() => {

              this.tanggal1=""
              this.tanggal2="" 
              this.listCabangRekonsalesJadwal = [] 
              this.loaddata()  
              this.pesan = "Input data Sukses";
              this.snackbar = true;
              this.overlay = false
              
            })
            .catch((err) => {
              this.pesan = err.msg;
              this.snackbar = true;
              this.overlay = false
            });
        }else{
            this.pesan = "Data tidak boleh kosong";
            this.snackbar = true;
            this.overlay = false
        }
        
      }, 
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangRekonsalesJadwal = []
            } else {
              this.listCabangRekonsalesJadwal = this.$store.getters.listCabangRekonsalesJadwal.slice()
            }
          })
      },          
      loaddata(){ 
        this.overlay = true
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };          
        this.$store.dispatch("getRekonsalesJadwal", datanya).then(()=>{
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
    let dataUser = this.$store.getters.dataUsers
    this.loaddata() 
    this.$store.dispatch("getCabangRekonsalesJadwal", { kdcab : dataUser.cover});
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
 
 