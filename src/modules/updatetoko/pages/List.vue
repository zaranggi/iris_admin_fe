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
      <v-tab key="history">
        History
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
               <download-excel
                        ref="donwloadResultQuery"
                        class= "button is-primary" 
                        :data="listdata2" 
                        worksheet="Data" 
                        name="prodmast-supmast.xls"
                        >
                        <v-btn color="secondary"  elevation="10">
                          <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                          XLS
                        </v-btn>
                      </download-excel>
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
                   <template v-slot:[`item.kdtk`]="{ item }">  
                        {{ item.kdtk }} <v-icon small color="red darken-2" class="mr-2" @click="showUpdateDialog(item.kdtk)">mdi-update</v-icon>
                    </template>

                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search2 }}" found no results.
                  </v-alert>
              </v-data-table>
             
              
                   <v-dialog v-model="dialogUpdate" max-width="400px">
                      <v-card>
                        <v-card-title class="headline">
                        Update Data Toko {{ itemToUpdate }}
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="updateData()">Update</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog> 

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
                    v-model="listCabangUpdateToko"
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
                        <v-icon :color="listCabangUpdateToko.length > 0 ? 'indigo darken-4' : ''">
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
      <v-tab-item key="history">
        <v-card flat>
          <v-card-text> 
            <div class="d-flex flex-column ma-4" >
              <v-form @submit.prevent="submitHisUpdToko">
                <v-flex lg12 md12 sm12>
                  <v-row dense justify="center">  
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
               <v-layout column style="padding-top:56px">
                  <v-data-table :class="['word-wrap']" :headers="headers3" :items="listdata3" :search="search3" mobile-breakpoint="0"> 
                    
                    <template v-slot:[`item.tgldata`]="{ item }">
                      {{ item.tanggal | formatTglIndo }}
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search3 }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
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
  </v-sheet>
  
</template>

<script> 

export default { 
   
  data() {
    return { 
      dateAwal: new Date().toISOString().substr(0, 10),
      tanggal: false,
      fullPage: false,
      absolute:true, 
      snackbar: false, 
      dialogUpdate: false,
      itemToUpdate: {},
      pesan: "",   
      tab: null,       
      search:"",       
      search2:"", 
      search3:"",
      timeoutPesan:3000,   
      listCabangUpdateToko:"",  
      headers: [
          {text: 'No', value: 'id',fixed: true }, 
          {text: 'Kode Cabang', value: 'branch_code'}, 
          {text: 'Nama Cabang', value: 'branch_name'},  
          {text: 'Belum', value: 'belum'},
          {text: 'Gagal', value: 'gagal'},
          {text: 'Sukses', value: 'sukses'}
      ],  
      headers2: [ 
          {text: 'Kdcab', value: 'kdcab',fixed: true }, 
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama', value: 'nama_toko'}, 
          {text: 'PFE Update', value: 'pfe_update'}, 
          {text: 'PFE Tdk Upd', value: 'pfe_tidk_update'},
          {text: 'Item Aktif', value: 'item_aktif'},
          {text: 'Item NonAktif', value: 'item_non_aktif'},
          {text: 'DTA', value: 'dta'},
          {text: 'DT_', value: 'dt_'},
          {text: 'TMT', value: 'tmt'},
          {text: 'PCO', value: 'pco'},
          {text: 'TBM', value: 'tbm'},
          {text: 'Supmast', value: 'supmast'},
          {text: 'Updtime', value: 'updtime'}
      ], 
      headers3: [ 
          
          {text: 'Kdcab', value: 'kdcab',fixed: true }, 
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama', value: 'nama_toko'}, 
          {text: 'Tanggal', value: 'tanggal'}, 
          {text: 'PFE Update', value: 'pfe_update'}, 
          {text: 'PFE Tdk Upd', value: 'pfe_tidk_update'},
          {text: 'Item Aktif', value: 'item_aktif'},
          {text: 'Item NonAktif', value: 'item_non_aktif'},
          {text: 'DTA', value: 'dta'},
          {text: 'DT_', value: 'dt_'},
          {text: 'TMT', value: 'tmt'},
          {text: 'PCO', value: 'pco'},
          {text: 'TBM', value: 'tbm'},
          {text: 'Supmast', value: 'supmast'}
      ], 
      
    } 
  },  
  computed: {   
    computeTanggal() {
      return this.dateAwal;
    },  
    listdata2() { 
      return this.$store.getters.detailUpdateToko;
    },   
    listdata() { 
      return this.$store.getters.jadwalUpdateToko;
    }, 
    listdata3() { 
      return this.$store.getters.listHistoryUpdateToko;
    },   
    getCabang() {
      return this.$store.getters.listCabangUpdateToko;
    }, 
    pilihAllCabang () {
        return this.listCabangUpdateToko.length === this.$store.getters.listCabangUpdateToko.length
    },
    pilihSomeCabang () {
        return this.listCabangUpdateToko.length > 0 && !this.$store.getters.listCabangUpdateToko.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
     
  },
  methods: { 
    
      showUpdateDialog(item) {
        this.itemToUpdate = item
        this.dialogUpdate = !this.dialogUpdate
      },
      
      updateData() {  
         let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });

           const sendpost = {
            id: this.itemToUpdate
          }
          this.$store.dispatch("simpanUpdUpdateToko", sendpost)
          .then(() => { 
              this.loaddata() 
              this.dialogUpdate = false
              loading.hide()
          })
          .catch((err) => {
             loading.hide()
            console.log(err);
          });
      }, 
      saveDispen() {
        let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
        if(this.$refs.form.validate()){
            const a = this.listCabangUpdateToko.map((item)=>{ 
            
              return item.kdcab === undefined ? item : item.kdcab
            })  

          const datanya = {
            kdcab: a.toString(), 
          };
          this.$store
            .dispatch("simpanAddUpdateToko", datanya)
            .then(() => { 
              this.listCabangUpdateToko = [] 
              
              this.loaddata2()  
              this.loaddata()
              this.pesan = "Input data Sukses";
              this.snackbar = true;
               loading.hide()
              
            })
            .catch((err) => {
              this.errorMessages = err.msg;
              this.snackbar = true;
               loading.hide()
            });
        }else{
            this.errorMessages = "Data tidak boleh kosong";
            this.snackbar = true;
             loading.hide()
        }
        
      }, 
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangUpdateToko = []
            } else {
              this.listCabangUpdateToko = this.$store.getters.listCabangUpdateToko.slice()
            }
          })
      },          
      loaddata(){ 
         let loading = this.$loading.show({
            color:"#f09000",
            container: this.fullPage ? null : this.$refs.formContainer,
            backgroundColor: "#525252",
            loader: 'dots',
            canCancel: true, 
            onCancel: this.onCancel,
          })
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };          
        this.$store.dispatch("getJadwalUpdateToko", datanya).then(()=>{
           loading.hide()
        }).catch(() =>{
            loading.hide()
        })
      }, 
      submitHisUpdToko(){ 
         let loading = this.$loading.show({
            color:"#f09000",
            container: this.$refs.formContainer,
            backgroundColor: "#525252",
            loader: 'dots',
            canCancel: true, 
            onCancel: this.onCancel,
          }) 
          const dataUser = this.$store.getters.dataUsers
          const datanya = {
                kdcab:  dataUser.cover,
                tanggal:  this.dateAwal
          };          
          this.$store.dispatch("getHisUpdateToko", datanya).then(()=>{
            loading.hide()
          }).catch(() =>{
              loading.hide()
          })
      },   

      loaddata2(){ 
         let loading = this.$loading.show({
            color:"#f09000",
            container: this.fullPage ? null : this.$refs.formContainer,
            backgroundColor: "#525252",
            loader: 'dots',
            canCancel: true, 
            onCancel: this.onCancel,
          })
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };          
        this.$store.dispatch("detailUpdateToko", datanya).then(async ()=>{
           this.loaddata() 
           loading.hide()
        }).catch(() =>{
            loading.hide()
        })
      },   
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
    let dataUser = this.$store.getters.dataUsers
    this.loaddata2() 
    this.$store.dispatch("getCabangUpdateToko", { kdcab : dataUser.cover});
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
 
 