<template> 

  <v-sheet elevation="10">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>  
      <v-tab key="report">
        Report
      </v-tab> 
      <v-tab key="jadwal">
        Absensi Toko
      </v-tab> 
      <v-tab key="setting">
        Setting
      </v-tab>
    </v-tabs> 

    <v-tabs-items v-model="tab">
      <v-tab-item key="report">
        <v-card flat>
           <v-app-bar flat color="rgba(0, 0, 0, 0)"> 
            <v-spacer></v-spacer>
            <v-btn color="tosca" icon @click="loaddata2()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-app-bar>
           <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
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
              </v-card-title>

          <v-card-text>   
              <v-data-table :class="['word-wrap']" :headers="headers2" :items="listdata2" :search="search2" mobile-breakpoint="0" >
                  <template v-slot:[`item.id`]="{ index }">
                    {{ index + 1 }}
                  </template> 
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search2 }}" found no results.
                  </v-alert>
              </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item> 
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
                    v-model="listCabangUpdateProgram"
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
                        <v-icon :color="listCabangUpdateProgram.length > 0 ? 'indigo darken-4' : ''">
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

              <v-col cols="3" >  
                  <v-text-field
                    class="ma-1 pa-1 mx-4"
                      v-model="nama_file"
                      :counter="25"
                      append-icon="mdi-link-variant"
                      :rules="[v => !!v || 'Harus Diisi']"
                      label="Nama File"
                      required
                    ></v-text-field>
              </v-col>

              <v-col cols="2" >  
                  <v-text-field
                    class="ma-1 pa-1 mx-4"
                      v-model="file_size_acuan"
                      :counter="25"
                      append-icon="mdi-link-variant"
                      :rules="[v => !!v || 'Harus Diisi']"
                      label="File Size Master"
                      required
                    ></v-text-field>
              </v-col>

                   <v-col cols="2" >   
                    <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveUpdateProgram">
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
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
      nama_file:"",
      file_size_acuan:"",
      tab: null,       
      search:"",       
      search2:"",     
      timeoutPesan:3000,   
      listCabangUpdateProgram:"",  
      headers: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'Kode Cabang', value: 'kdcab'}, 
          {text: 'Nama Cabang', value: 'nama_cabang'},  
          {text: 'Nama File', value: 'nama_file'},  
          {text: 'Belum', value: 'belum'},
          {text: 'Gagal', value: 'gagal'},
          {text: 'Sukses', value: 'sukses'}
      ],  
      headers2: [ 
          {text: 'Kdcab', value: 'kdcab',fixed: true }, 
          {text: 'Kdtk', value: 'kdtk'},   
          {text: 'Nama File', value: 'nama_file'},   
          {text: 'File Size Master', value: 'file_size_acuan'},   
          {text: 'File Size di STB', value: 'file_size'},   
          {text: 'Updtime', value: 'updtime'}
      ], 
      
    } 
  }, 
  computed: {   
    listdata2() { 
      return this.$store.getters.detailUpdateProgram;
    },   
    listdata() { 
      return this.$store.getters.jadwalUpdateProgram;
    },   
    getCabang() {
      return this.$store.getters.listCabangUpdateProgram;
    }, 
    pilihAllCabang () {
        return this.listCabangUpdateProgram.length === this.$store.getters.listCabangUpdateProgram.length
    },
    pilihSomeCabang () {
        return this.listCabangUpdateProgram.length > 0 && !this.$store.getters.listCabangUpdateProgram.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
     
  },
  methods: { 
      saveUpdateProgram() {
        this.overlay = true
        if(this.$refs.form.validate()){
            const a = this.listCabangUpdateProgram.map((item)=>{ 
            
              return item.kdcab === undefined ? item : item.kdcab
            })  

          const datanya = {
            kdcab: a.toString(), 
            nama_file: this.nama_file, 
            file_size_acuan: this.file_size_acuan
          };
          this.$store
            .dispatch("simpanAddUpdateProgram", datanya)
            .then(() => { 
              this.listCabangUpdateProgram = [] 
              this.loaddata()
              this.loaddata2()  
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
              this.listCabangUpdateProgram = []
            } else {
              this.listCabangUpdateProgram = this.$store.getters.listCabangUpdateProgram.slice()
            }
          })
      },          
      loaddata(){ 
        this.overlay = true
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };          
        this.$store.dispatch("getJadwalUpdateProgram", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },   

      loaddata2(){ 
        this.overlay = true
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };          
        this.$store.dispatch("detailUpdateProgram", datanya).then(()=>{
          this.loaddata() 
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
    this.loaddata2() 
    this.$store.dispatch("getCabangUpdateProgram", { kdcab : dataUser.cover});
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
 
 