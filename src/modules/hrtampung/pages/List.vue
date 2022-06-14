<template> 

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Monitoring Data Harian Tampung </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitHrtampung" ref="form">
            <v-flex lg12 md12 sm12>
              <v-row dense> 
                <v-col cols="7">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangHrTampung"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangTampung"
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
                        <v-icon :color="listCabangHrTampung.length > 0 ? 'indigo darken-4' : ''">
                            {{ iconCabangTampung }}
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
                      ></v-date-picker>
                    </v-menu>
                  </v-col> 
                  <v-col cols="3" lg="1" class="ma-1 pa-1 mx-4">
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

        <template >
          <v-row dense>
             <v-col cols="4">
                <v-card class="mx-auto teal accent-4 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text">Toko Aktif</v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Toko Aktif</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi mdi-trending-up</v-icon>   
                           
                           {{ this.getTotalTokoHrTampung | numeral('0,0') }}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto green accent-4 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Data Harian </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Sudah Masuk</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getTotalSudahHrTampung | numeral('0,0') }}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto pink accent-3 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text">Data Harian</v-list-item-title>
                        <v-list-item-subtitle class="white--text">Belum Masuk</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getTotalBelumHrTampung | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col> 
               <v-divider
                  inset
                ></v-divider>
          </v-row>
        </template>

        <template >
          <v-row dense>
             <v-col cols="8" offset-md="2">
              <v-divider
                inset
              ></v-divider>
              
                <ve-table 
                    fixed-header
                    :border-x="true" 
                    :border-y="true" 
                    :columns="headers"
                    :table-data="getlistrekapTampung"
                    :cell-style-option="cellStyleOption" 
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498"
                />
                
                <div v-show="getlistrekapTampung.length === 0" class="empty-data">Tidak Ada Data</div>

             </v-col>
          </v-row>
        </template>

        <template>
           <v-row dense>
             <v-col cols="12">
              <v-divider
                inset
              ></v-divider>

                <div class="d-flex flex-column ma-4">  
                  <v-card outlined class="mt-2">
                    <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Absensi All Toko
                      <v-flex lg12 md12 sm12>
                        <v-row dense > 
                           <v-col class="pa-2" md="4"> 
                              <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="getlisttokoBelumTampung" 
                                worksheet="Data" 
                                name="tokobelum.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                          </v-col>
                          <v-col class="pa-2" md="4" justify-end> 
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
                    <v-layout column style="padding-top:56px">
                        <v-data-table :class="['word-wrap']" :headers="headers2" :items="getlisttokoBelumTampung" :search="search2" mobile-breakpoint="0">
                           <template v-slot:[`item.no`]="{ index }">
                              {{ index + 1 }}
                            </template> 
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
    </v-card>  
</template>

<script>
export default {
  data() {
    return {  
     cellStyleOption: {
                    bodyCellClass: ({ row, column }) => {
                      
                        if (column.field === "sudah" ) {
                            return "table-body-cell-class1";
                        }
                        if (column.field === "sudah_persen" ) {
                            return "table-body-cell-class1";
                        }
                        if (column.field === "belum" ) { 
                            const valu = row[column.field]
                            if(valu === "0"){
                              return "table-body-cell-class1";
                            }else{
                              return "table-body-cell-class2";
                            }
                            
                        }
                        if (column.field === "belum_persen" ) {
                          const valu = row[column.field]
                            if(valu === "0.00"){
                              return "table-body-cell-class1";
                            }else{
                              return "table-body-cell-class2";
                            }
                        }
                    },
                },
      fullPage: false,
      search: "",  
      search2: "",
      dateAwal: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),  
      tanggal: false,
      listCabangHrTampung: "",
      windowWidth: window.innerWidth,
      headers: [  
          {field: 'kdcab', key: "a", title: 'Kdcab', align:'center'},
          {field: 'nama', key: "b", title: 'Nama', align:'left'},
          {field: 'total_toko', key: "c",  title: 'Total Toko', align:'center'},
          {field: 'sudah', key: "d",  title: 'Sudah Masuk', align:'center'},
          {field: 'sudah_persen', key: "e", title: '%', align:'center'},
          {field: 'belum', key: "f", title: 'Belum Masuk', align:'center'},
          {field: 'belum_persen',key: "g",  title: '%', align:'center'}
        ],
      headers2: [
          {text: 'No', value: 'no'},
          {text: 'Kdcab', value: 'kdcab'},
          {text: 'Kdtk', value: 'kdtk'},
          {text: 'Nama', value: 'nama'},
          {text: 'Keterangan', value: 'keterangan'}
      ]
      
         
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },  
    getCabangTampung() {
      return this.$store.getters.listCabangHrTampung;
    }, 
    getlisttokoBelumTampung(){
      return this.$store.getters.listtokoBelumTampung;
    },
    getTotalTokoHrTampung() {
      return this.$store.getters.TotalTokoHrTampung;
    }, 
    getTotalSudahHrTampung() {
      return this.$store.getters.TotalSudahHrTampung;
    }, 
    getTotalBelumHrTampung() {
      return this.$store.getters.TotalBelumHrTampung;
    },
    getlistrekapTampung(){
      return this.$store.getters.listrekapTampung;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangHrTampung.length === this.$store.getters.listCabangHrTampung.length
    },
    pilihSomeCabang () {
        return this.listCabangHrTampung.length > 0 && !this.$store.getters.listCabangHrTampung.length
      },
    iconCabangTampung () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
  },
  methods: {   
      handleSubmitHrtampung(){ 
        if(this.$refs.form.validate()){
           let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
          const a = this.listCabangHrTampung.map((item)=>{ 
            return item.id === undefined ? item : item.id
          })  
          const datanya = {
              kdcab:  a.toString(),
              tanggal: this.dateAwal,
          };
          this.$store.dispatch("getHrTampung", datanya).then(()=> {  

            loading.hide()
          }).catch(() => {
            
            loading.hide()
          })
        }
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangHrTampung = []
            } else {
              this.listCabangHrTampung = this.$store.getters.listCabangHrTampung.slice()
            }
          })
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
    this.$store.dispatch("getCabangHrTampung", { kdcab : dataUser.cover}).then(()=> { 
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
table {
  border-spacing: 0px;
  margin: 20px 0px 0px 0px;
}

th,
td {
  padding: 5px;
}
    .table-body-cell-class1 {
        background: #61ffb5 !important;
        color: rgb(0, 0, 0) !important;
    }

    .table-body-cell-class2 {
        background: rgb(248, 125, 176) !important;
        color: rgb(0, 0, 0) !important;
    }
</style>