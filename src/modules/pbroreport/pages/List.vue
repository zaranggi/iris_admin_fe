<template> 

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Report PBRO </v-card-title>
      <v-divider />  
      <v-card-text > 
          <div class="d-flex flex-column ma-4" >
            <v-form @submit.prevent="handleSubmitPbroreport" ref="form">
              <v-flex lg12 md12 sm12>
                <v-row dense justify="center"> 
                  <v-col cols="3">
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
                
                    <v-col cols="1" class="ma-1 pa-1 mx-4">
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
 
          <v-row>
            <v-flex lg12 md12 sm12>
             <v-col cols="12">
               <v-divider></v-divider>
             
                <v-card-title primary-title class="justify-center">
                  <div>
                    <h3 class="headline teal--text text--dark-2">&nbsp;&nbsp;&nbsp;&nbsp;Report PBRO</h3>
                    <div>Periode {{ dateAwal | formatTglIndo }}</div>
                  </div>
                </v-card-title> 
               
                <v-data-table :class="['word-wrap']" 
                    :item-class= "row_classes"  
                    :headers="headers_rekap" :disable-pagination="true" :hide-default-footer="true" :items="getdatarekapro" mobile-breakpoint="0">

                   <template v-slot:item.kdcab="{ item }"> 
                       <span class="font-weight-medium">{{ item.kdcab }}</span> 
                  </template>

                  <template v-slot:item.total_request="{ item }"> 
                       <v-chip>
                        {{ item.total_request }}
                      </v-chip>
                  </template> 
                  <template v-slot:item.total_hold="{ item }">
                      <v-chip v-if="item.total_hold > 0"
                         :color="getColor(item.total_hold)"
                          dark
                      >
                        {{ item.total_hold }}
                      </v-chip>
                       <v-chip v-else
                      >
                        {{ item.total_hold }}
                      </v-chip>
                  </template> 
                  <template v-slot:item.total_am_konfirm="{ item }">
                       <v-chip v-if="item.total_hold > 0"
                         :color="getColorKonfirm(item.total_am_konfirm)"
                          dark
                      >
                        {{ item.total_am_konfirm }}
                      </v-chip>

                       <v-chip v-else
                      >
                        {{ item.total_am_konfirm }}
                      </v-chip>
                       
                  </template> 
                  <template v-slot:item.total_am_tidak_konfirm="{ item }">
                     <v-chip v-if="item.total_hold > 0"
                         :color="getColorTdkKonfirm(item.total_am_tidak_konfirm)"
                          dark
                      >
                        {{ item.total_am_tidak_konfirm }}
                      </v-chip>

                       <v-chip v-else
                      >
                        {{ item.total_am_tidak_konfirm }}
                      </v-chip>
                       
                  </template> 
                  <template v-slot:item.dihold="{ item }">
                      <v-chip
                         :color="getColorHold(item.dihold)"
                          dark
                      >
                        {{ item.dihold }}
                      </v-chip>
                       
                  </template> 
                  <template v-slot:item.diteruskan="{ item }">
                    <v-chip >
                      {{ item.diteruskan }}
                    </v-chip>
                      
                </template>
                  <template v-slot:item.darurat="{ item }">
                    <v-chip 
                        :color="getColor(item.darurat)"
                        dark
                    >
                      {{ item.darurat }}
                    </v-chip>
                      
                </template>

                  <template v-slot:item.backup="{ item }">
                    <v-chip
                        :color="getColor(item.backup)"
                        dark
                    >
                      {{ item.backup }}
                    </v-chip>
                      
                </template>
                </v-data-table>  
                
                <div v-show="getdatarekapro.length === 0" class="empty-data">Tidak Ada Data</div>

             </v-col>
             </v-flex>
          </v-row> 

          <v-row dense style="padding-top:56px">
             <v-col cols="12"> 
                <div class="d-flex flex-column ma-4">  
                  <v-card flat>
                    <v-card-title > 
                      <v-flex lg12 md12 sm12>   
                        <v-row dense >                     
                          <v-col class="pa-2" lg="8" > 
                            <v-icon color="light-green darken-1">mdi-dns</v-icon> Report PBRO Tanggal {{ dateAwal | formatTglIndo }}
                          </v-col>
                        </v-row>  
                                     
                        <v-row dense >  
                          <v-col class="pa-2" lg="4"> 
                              <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="getlistdataro" 
                                worksheet="Data" 
                                name="data_pbro_hold_5x_spd.xls"
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
                              v-model="search"
                              append-icon="mdi-magnify" single-line hide-details
                            ></v-text-field> 
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-card-title>
                    

                    <v-card-text> 
                    <v-layout column>
                        <v-data-table :class="['word-wrap']" :headers="headers" :items="getlistdataro" :search="search" mobile-breakpoint="0">
                           <template v-slot:[`item.no`]="{ index }">
                              {{ index + 1 }}
                            </template> 
                          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                          </v-alert>
                        </v-data-table> 
                      </v-layout> 
                    </v-card-text>
                    
                  </v-card> 
              </div>
            </v-col>
          </v-row>
        

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
      timeoutPesan:3000,   
      dialog:false,
      fullPage: false,
      pesan: "",
      search: "",   
      dateAwal: new Date(new Date()).toISOString().split('T')[0].substr(0, 10),  
      tanggal: false,
      windowWidth: window.innerWidth,
       cellStyleOption: {
                    headerCellClass: ({ column, rowIndex }) => {
                        
                            return "table-header-cell-class";
                        
                    },
                },
                            
      headers_rekap2: [  
          {field: 'kdcab', key: "a", title: 'Kdcab', align:'left'},
          {field: 'total_request', key: "c",  title: 'Total Req', align:'center'},
          {field: 'total_hold', key: "d",  title: 'PB Hold', align:'center'},
          {field: 'total_am_tidak_konfirm', key: "e", title: 'Am Tidak Konfirm', align:'center'},
          {field: 'total_am_konfirm', key: "f", title: 'Am Konfirm', align:'center'},
          {field: 'diteruskan',key: "g",  title: 'Diteuskan', align:'center'},
          {field: 'dihold',key: "h",  title: 'PBRO di Hold', align:'center'},
          {field: 'backup',key: "i",  title: 'PB Backup', align:'center'},
          {field: 'darurat',key: "j",  title: 'PB Darurat', align:'center'},
          {field: 'toko_darurat',key: "k",  title: 'Ket', align:'center'}
        ],
      headers_rekap: [  
       
          {text: 'Cabang', value: 'kdcab'},
          {text: 'Total Req', value: 'total_request', align:'center'},
          {text: 'PB Hold', value: 'total_hold', align:'center'},
          {text: 'Am Konfirm', value: 'total_am_konfirm', align:'center'},
          {text: 'Konfirm Oto', value: 'total_am_tidak_konfirm', align:'center'},
          {text: 'Diteruskan', value: 'diteruskan', align:'center'},
          {text: 'DiHold', value: 'dihold', align:'center'},
          {text: 'PBBackup', value: 'backup', align:'center'},
          {text: 'PBDarurat', value: 'darurat', align:'center'},
          {text: 'Toko Darurat', value: 'toko_darurat', align:'center'},
      ],
      headers: [  
       
          {text: 'Tanggal', value: 'tanggal'},
          {text: 'Kdcab', value: 'dc'},
          {text: 'toko', value: 'toko'},
          {text: 'AM', value: 'am'},
          {text: 'PBRO Status', value: 'pbro_status'},
          {text: 'Indikasi ST', value: 'indikasi_st'},
          {text: 'User EDP', value: 'nama_user'},
          {text: 'Keterangan EDP', value: 'keterangan'},
          {text: 'Jam Konfirm EDP', value: 'jam_konfirm_edp'},
          {text: 'PB-FT', value: 'nilaipb'},
          {text: 'Avg Sales', value: 'avgsales'},
          {text: 'ST', value: 'st'},
          {text: 'AVG Stock 0', value: 'avg_stock_0_persen'},
          {text: 'Stock 0', value: 'stock_0_persen'},
          {text: 'Growth Stock 0', value: 'abs_stock_0_persen'},
          {text: 'Kirim WA', value: 'jam_sent_wa'},
          {text: 'Konfirm AM', value: 'jam_konfirm_am'},
          {text: 'Konfirm Oto', value: 'jam_konfirm_oto'},
      ]
      
         
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },  
    getlistdataro() {
      return this.$store.getters.listDataAllRO;
    }, 
    getdatarekapro() {
      return this.$store.getters.listDataRekapRO;
    },   
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: {  
     row_classes(item) {
        if (item.kdcab === "TOTAL") {
          return "footernya";
        } 
    },
      getColorHold (nilai) {
        if (nilai > 8) return 'red'
        else if (nilai > 0) return 'orange'
        else return 'teal'
      },
      getColorKonfirm (nilai) {
        if (nilai > 3) return 'teal'
        else if (nilai > 0) return 'orange'
        else return 'red'
      },
      getColorTdkKonfirm (nilai) {
        if (nilai > 3) return 'red'
        else if (nilai > 0) return 'orange'
        else return 'teal'
      },
      getColor (nilai) {
        if (nilai > 8) return 'red'
        else if (nilai > 4) return 'orange'
        else return 'teal'
      },
      async handleSubmitPbroreport(){ 
        if(this.$refs.form.validate()){
            let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
          
          const datanya = {
               tanggal : this.dateAwal,
          };
          await this.$store.dispatch("getDataReportRo", datanya).then( (res) => {  

            loading.hide()

            if(res === "None"){
              this.dialog = true
              this.pesan = "Data tidak ditemukan "
            }else if (res === "Error"){
              this.dialog = true
              this.pesan = "Server ERROR!!"
            }else{
              this.dialog = true
              this.pesan = "Load Data"
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
                });
    this.$store.dispatch("getDataReportRo", { tanggal : this.dateAwal}).then( ()=> { 
     
        loading.hide()
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

<style>
    .table-header-cell-class {
        background: #2dfab6 !important;
        color: #0000;
    }
</style>
<style lang="scss" scoped>
.v-data-table tbody tr:not(:last-child) {
  border: 1px solid rgba(0,0,0,0.12) !important; 
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
.footernya {
  background-color: #63f0c6;
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