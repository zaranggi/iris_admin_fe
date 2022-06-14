<template>
<v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
  <v-card-text>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title card-dark-grey">Monitoring PBRO </h1> 
      </v-row> 
      <v-row>
        <v-col lg="6" sm="12" md="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Total Request Hari ini</p>
              <v-spacer></v-spacer> 
               <v-btn class="text-right" color="teal darken-1" icon @click="loaddata()">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-bold card-dark-grey"
                    style="font-size: 26px"
                    >{{this.totalreqpbro | numeral('0,0') }}</span
                  >
                </v-col>
                <v-col cols="6">
                  
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between pb-3">
                <v-col cols="4"> 
                  <div class="text-left card-light-grey"> 
                    <v-icon
                      large
                      color="lime darken-2"
                    >
                    mdi-account-tie-voice-outline
                    </v-icon> PB HOLD 5x ASPD</div>
                  <div class="text-h6 text-center card-dark-grey font-weight-bold">
                    {{this.totalpbrohold | numeral('0,0') }}
                  </div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center  card-light-grey">
                    <v-icon
                      large
                      color="red darken-2"
                    >
                    mdi-alert-box-outline
                    </v-icon>
                    Gagal RO</div>
                  <div class="text-h6 text-center  card-dark-grey font-weight-bold">
                    {{this.totalpbrogagal | numeral('0,0') }}
                  </div>
                </v-col>
                <v-col cols="4">
                  <div class="text-center card-light-grey">
                    <v-icon
                      large
                      color="orange darken-2"
                    >
                    mdi-timer-outline
                    </v-icon>
                    Req > 30 Menit</div>
                  <div
                    class="text-center text-h6 card-dark-grey font-weight-bold"
                  >
                    {{this.totalpbro30 | numeral('0,0') }}
                  </div>
                </v-col>
              </v-row>
              
            </v-card-text>
            
          </v-card>
        </v-col>
      </v-row> 

       <v-row>
        <v-col>
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>PBRO HOLD Jagaan 5x ASPD - Hasil Konfirmasi OPR</p>
               <v-spacer></v-spacer> 
                <v-btn fab dark small color="indigo" @click="showDetailDialogAllAm()">
                  <v-icon dark>mdi-message</v-icon>
                </v-btn> 
                <v-spacer></v-spacer>  
              <v-text-field
                dense
                placeholder="Search"
                clearable
                v-model="search2"
                append-icon="mdi-magnify" single-line hide-details
              ></v-text-field> 
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
          
                  <v-data-table :class="['word-wrap row-height-50']" :headers="headers2" :items="datapbroinfoam" :items-per-page="5" :search="search2" mobile-breakpoint="0" >
                    
                    <template v-slot:[`item.actions`]="{ item }"> 
                      
                       <v-icon medium color="orange darken-1" class="mr-3" @click="showDetailDialog(item.actions)">mdi-message</v-icon>
                       <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialogItem(item.actions)">mdi-clipboard-check-multiple</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search2 }}" found no results.
                    </v-alert>
                  </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>PBRO HOLD Jagaan 5x ASPD</p>
              <v-spacer></v-spacer> 
                  <v-btn fab dark small color="orange" @click="showDetailDialogAll()">
                  <v-icon dark>mdi-message</v-icon>
                </v-btn> 
                <v-spacer></v-spacer>  
              <v-text-field
                dense
                placeholder="Search"
                clearable
                v-model="search"
                append-icon="mdi-magnify" single-line hide-details
              ></v-text-field> 
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
          
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="datapbro" :items-per-page="5" :search="search" mobile-breakpoint="0" >
                     <template v-slot:[`item.actions`]="{ item }">
                       
                       <v-icon medium color="orange darken-1" class="mr-3" @click="showDetailDialog(item.actions)">mdi-message</v-icon>
                       <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialogItem(item.actions)">mdi-clipboard-check-multiple</v-icon>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Monitoring Request PBRO</p>
              <v-spacer></v-spacer> 
                <v-btn fab dark small color="indigo" @click="showDetailDialogAll30()">
                  <v-icon dark>mdi-message</v-icon>
                  
                </v-btn> 
                <v-spacer></v-spacer> 
              <v-text-field
                dense
                placeholder="Search"
                clearable
                v-model="search3"
                append-icon="mdi-magnify" single-line hide-details
              ></v-text-field> 
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
          
                  <v-data-table :class="['word-wrap']" :headers="headers3" :items="datapbro30menit" :items-per-page="5" :search="search3" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                     <template v-slot:[`item.actions`]="{ item }"> 
                       <v-icon medium color="orange darken-1" class="mr-3" @click="showDetailDialog30(item.actions)">mdi-message</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search3 }}" found no results.
                    </v-alert>
                  </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </div> 
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay>

      <v-dialog v-model="DialogKeterangan" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan PBRO 
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                
                   <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listStatus"
                        item-text="value"
                        item-value="id"
                        :items="getStatusPbro"
                        :rules="[v => !!v || 'Pilih Status PBRO']"
                        label="Pilih Status PBRO" 
                          required 
                      > 
                  </v-select> 
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
              <v-btn color="light-green " elevation="15" @click="handleSubmitKeteranganPbro()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-dialog v-model="DialogKeteranganAll" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan PBRO 
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                    <v-autocomplete
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listTokoHoldnya"
                        item-text="toko"
                        item-value="toko"
                        :items="getlistTokoHold"
                        :rules="[v => !!v || 'Pilih Toko']"
                        label="Pilih Toko" 
                        multiple
                        small-chips
                          required 
                      > 
                  </v-autocomplete> 
                  <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listStatus"
                        item-text="value"
                        item-value="id"
                        :items="getStatusPbro"
                        :rules="[v => !!v || 'Pilih Status PBRO']"
                        label="Pilih Status PBRO" 
                          required 
                      > 
                  </v-select> 
                  <v-textarea
                    clearable
                    v-model="keteranganall"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Penangan"
                  ></v-textarea>  
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogKeteranganAll = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="handleSubmitKeteranganPbroAll()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-dialog v-model="DialogKeteranganAllAm" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan PBRO 
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                    <v-autocomplete
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listTokoHoldnya"
                        item-text="toko"
                        item-value="toko"
                        :items="getlistTokoHoldAm"
                        :rules="[v => !!v || 'Pilih Toko']"
                        label="Pilih Toko" 
                        multiple
                        small-chips
                          required 
                      > 
                  </v-autocomplete> 
                  <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listStatus"
                        item-text="value"
                        item-value="id"
                        :items="getStatusPbro"
                        :rules="[v => !!v || 'Pilih Status PBRO']"
                        label="Pilih Status PBRO" 
                          required 
                      > 
                  </v-select> 
                  <v-textarea
                    clearable
                    v-model="keteranganall"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Penangan"
                  ></v-textarea>  
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogKeteranganAllAm = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="handleSubmitKeteranganPbroAll()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      
      <v-dialog v-model="DialogKeterangan30" max-width="700px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan PBRO Lebih dari 30 Menit
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                
                   <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listStatus30"
                        item-text="value"
                        item-value="id"
                        :items="getStatusPbro"
                        :rules="[v => !!v || 'Pilih Status PBRO']"
                        label="Pilih Status PBRO" 
                          required 
                      > 
                  </v-select> 
                  <v-textarea
                    clearable
                    v-model="keterangan30"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Penangan"
                  ></v-textarea>  
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogKeterangan30 = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="handleSubmitKeteranganPbro30()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-dialog v-model="DialogKeteranganAll30" max-width="700px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan PBRO Lebih dari 30 Menit
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
                    <v-autocomplete
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listToko30Menit"
                        item-text="toko"
                        item-value="toko"
                        :items="getlistToko30"
                        :rules="[v => !!v || 'Pilih Toko']"
                        label="Pilih Toko" 
                        multiple
                        small-chips
                          required 
                      > 
                  </v-autocomplete> 
                  <v-select
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="listStatus30"
                        item-text="value"
                        item-value="id"
                        :items="getStatusPbro30"
                        :rules="[v => !!v || 'Pilih Status PBRO']"
                        label="Pilih Status PBRO" 
                          required 
                      > 
                  </v-select> 
                  <v-textarea
                    clearable
                    v-model="keteranganall30"
                    clear-icon="mdi-close-circle"
                    label="Keterangan Penangan"
                  ></v-textarea>  
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogKeteranganAll30 = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="handleSubmitKeteranganPbroAll30()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

       <v-dialog v-model="DialogDetailItem" >
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon>  Cek STMAST, WT dan DT atas 15 Item PBRO Tertinggi
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="datadetailitem" 
                                worksheet="Data" 
                                name="detailstock.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                <v-container fluid>
                     <v-data-table :class="['word-wrap']" :headers="headers_detail" :items="datadetailitem" :items-per-page="15" mobile-breakpoint="0" >
                  </v-data-table>
                </v-container> 
              </template> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogDetailItem = false">
                <v-icon dark>mdi-close</v-icon>
                Close
              </v-btn>             
            </v-card-actions>
          </v-card>
      </v-dialog>
      </v-card-text>
  </v-card>    
</template>

<script>
export default {
  data() {
    return {  
      search: "", 
      search2: "",  
      search3: "",     
      listTokoHoldnya: [],
      listToko30Menit: [],
      itemToSave:"" ,
      itemToSave30:"" ,
      itemToSaveAllAm:"" ,
      keterangan:"",
      keteranganall:"",
      keteranganallam:"",
      keterangan30:"",
      keteranganall30:"",
      timeoutPesan:2000,  
      snackbar: false, 
      pesan: "", 
      absolute:true, 
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      dateAkh: new Date().toISOString().substr(0, 10), 
      DialogKeterangan: false,   
      DialogKeteranganAll:false, 
      DialogKeteranganAllAm:false,
      DialogKeterangan30: false,   
      DialogKeteranganAll30:false,
      DialogDetailItem:false,
      windowWidth: window.innerWidth,  
      listStatus:"",
      listStatus30:"",
      getStatusPbro: [
        {id:"Teruskan", value: "Teruskan"},
        {id:"PB Normal", value: "PB Normal"}, 
        {id:"PBRO Backup", value: "PBRO Backup"},
        {id:"Tidak Ada Jadwal", value: "Tidak Ada Jadwal"},
        {id:"Hold", value: "Hold"},
        {id:"Darurat 1", value: "Darurat 1"},
        {id:"Darurat 2", value: "Darurat 2"}
      ],
      getStatusPbro30: [
        {id:"Teruskan", value: "Teruskan"},
        {id:"PB Normal", value: "PB Normal"}, 
        {id:"PBRO Backup", value: "PBRO Backup"},
        {id:"Tidak Ada Jadwal", value: "Tidak Ada Jadwal"},
        {id:"Hold", value: "Hold"},
        {id:"Darurat 1", value: "Darurat 1"},
        {id:"Darurat 2", value: "Darurat 2"}
      ],
      headers: [  
          {text: '', value: 'actions',fixed: true},
          {text: 'DC', value: 'dc',fixed: true},
          {text: 'Toko', value: 'toko',fixed: true},
          {text: 'Indikasi Stock', value: 'ket_ro'},
          {text: 'Jam Req', value: 'addtime',fixed: true}, 
          {text: 'Wa ke Cabang', value: 'jam_sent_wa', fixed: true}, 
          {text: 'PB-FT', value: 'nilaipb'},
          {text: 'Avg Sales', value: 'avgsales'},   
          {text: 'Growth Stock 0', value: 'abs_stock_0_persen'},  
          {text: 'Avg Stock 0', value: 'avg_stock_0_persen'},  
          {text: 'Stock 0 ', value: 'stock_0_persen'}, 
          {text: 'St', value: 'st'},
      ],
      
      headers2: [ 
          {text: '', value: 'actions',fixed: true},
          {text: 'DC', value: 'dc',fixed: true},
          {text: 'Toko', value: 'toko',fixed: true},
          {text: 'Indikasi Stock', value: 'ket_ro'},
          {text: 'Konfirmasi RO', value: 'pbro_status'},
          {text: 'Konfirm Am', value: 'jam_konfirm_am'},
          {text: 'Konfirm Oto', value: 'jam_konfirm_oto'},
          {text: 'PB-FT', value: 'nilaipb'},
          {text: 'Avg Sales', value: 'avgsales'},   
          {text: 'Growth Stock 0', value: 'abs_stock_0_persen'},  
          {text: 'Avg Stock 0', value: 'avg_stock_0_persen'},  
          {text: 'Stock 0 ', value: 'stock_0_persen'},  
          {text: 'St', value: 'st'},
      ],
      
      headers3: [ 
          {text: '', value: 'actions',fixed: true},
          {text: 'Toko', value: 'toko',fixed: true},
          {text: 'DC', value: 'dc',fixed: true},
          {text: 'Status', value: 'status'}, 
          {text: 'Keterangan', value: 'keterangan'}, 
          {text: 'Jam Req', value: 'time_req'}, 
          {text: 'Lama Proses', value: 'difftime'}, 
      ],
      
      headers_detail: [ 
          {text: 'prdcd', value: 'prdcd'}, 
          {text: 'LPP H', value: 'cek_lpp1'}, 
          {text: 'LPP H-1', value: 'cek_lpp2'}, 
          {text: 'ST H', value: 'stok_h'}, 
          {text: 'ST H-1', value: 'stok_h_1'}, 
          {text: 'ST H-2', value: 'stok_h_2'},
          {text: 'Sales H', value: 'sales_h'}, 
          {text: 'Sales H-1', value: 'sales_h_1'}, 
          {text: 'Sales H-2', value: 'sales_h_2'}, 
          {text: 'BPB H', value: 'qty_b_h'}, 
          {text: 'BPB H-1', value: 'qty_b_h_1'}, 
          {text: 'BPB H-2', value: 'qty_b_h_2'}, 
          {text: 'K H', value: 'qty_k_h'}, 
          {text: 'K H-1', value: 'qty_k_h_1'}, 
          {text: 'K H-2', value: 'qty_k_h_2'}, 
          {text: 'X', value: 'qty_x_h'}, 
          {text: 'X H-1', value: 'qty_x_h_1'}, 
          {text: 'X H-2', value: 'qty_x_h_2'}, 
          {text: 'MAX', value: 'max_h'}, 
          {text: 'MAX H-1', value: 'max_h_1'}, 
          {text: 'MAX H-2', value: 'max_h_2'}, 
      ],

    };
  },
  computed: {    
    datapbro() {  
      return this.$store.getters.DataHoldPbro;
    }, 
    datapbroinfoam() {  
      return this.$store.getters.DataHoldPbroInfoAm;
    },  
    datapbro30menit() {  
      return this.$store.getters.DataPb30Menit;
    },  
    datadetailitem() {  
      return this.$store.getters.DataDetailItem;
    },      
    getlistTokoHold() {  
      return this.$store.getters.listTokoHold;
    },      
    getlistTokoHoldAm() {  
      return this.$store.getters.listTokoHoldAm;
    },    
    getlistToko30() {  
      return this.$store.getters.listToko30Menit;
    },     
    totalpbrohold() {  
      return this.$store.getters.TotalPbroHold;
    },    
    totalpbro30() {  
      return this.$store.getters.TotalPbro30;
    },    
    totalpbrogagal() {  
      return this.$store.getters.TotalPbroGagal;
    },   
    totalreqpbro() {  
      return this.$store.getters.TotalReqPbro;
    },   
    isMobile() {
      return this.windowWidth <= 300
    },
      
  },
  methods: {  
      loaddata(){
         this.overlay = true
         this.$store.dispatch("getDataPbro") 
          .then(() => { 
              this.overlay = false 
          })
          .catch((err) => {
            this.overlay = false 
            console.log(err);
          });
      }, 
      
      loaddata2(){
            setInterval(() => {    
                            this.$store.dispatch("getDataPbro")
                          }, 300000);      
         
      }, 

      showDetailDialog(item) {
        this.itemToSave = item
        this.DialogKeterangan = !this.DialogKeterangan
      },
      showDetailDialogItem(item) {
          this.overlay = true
          this.pesan = "Proses Data...";
          this.snackbar = true;   
            
          const datanya = {
              toko:  item
          };
          
          this.$store.dispatch("cekdetailpbro", datanya).then(()=> {
            this.overlay = false
            this.DialogDetailItem = !this.DialogDetailItem
            this.pesan = "Cek Data Sukses!";
            this.snackbar = true;   
            this.loaddata()
          }).catch(() => {
            this.overlay = false
            this.DialogDetailItem = !this.DialogDetailItem
            this.pesan = "Cek Data Gagal!";
            this.snackbar = true;   
          })
          
      },

      showDetailDialogAll() {
        this.DialogKeteranganAll = !this.DialogKeteranganAll
      },
      showDetailDialogAllAm() {
        this.DialogKeteranganAllAm = !this.DialogKeteranganAllAm
      },

      showDetailDialog30(item) {
        this.itemToSave30 = item
        this.DialogKeterangan30 = !this.DialogKeterangan30
      },

      showDetailDialogAll30() {
        this.DialogKeteranganAll30 = !this.DialogKeteranganAll30
      },
      
      handleSubmitKeteranganPbro(){
        if(this.itemToSave.length === 0 && this.keterangan.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  toko:  this.itemToSave, 
                  pbro_status: this.listStatus.toString(),
                  keterangan: this.keterangan, 
              };
              this.$store.dispatch("simpanKeteranganPbro", datanya).then(()=> {
                this.overlay = false
                this.DialogKeterangan = !this.DialogKeterangan
                this.pesan = "Update Data Sukses!";
                this.snackbar = true;   
                this.loaddata()
              }).catch(() => {
                this.overlay = false
                this.DialogKeterangan = !this.DialogKeterangan
                this.pesan = "Update Data Gagal!";
                this.snackbar = true;   
              })
         } 
      }, 
       handleSubmitKeteranganPbroAll(){
        if(this.listStatus.length === 0 && this.keteranganall.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  toko:  this.listTokoHoldnya.toString(),
                  pbro_status: this.listStatus.toString(),
                  keterangan: this.keteranganall, 
              };
              this.$store.dispatch("simpanKeteranganPbroAll", datanya).then(()=> {
                this.overlay = false
                this.DialogKeteranganAll = false
                this.pesan = "Update Data Sukses!";
                this.snackbar = true;   
                this.loaddata()
              }).catch(() => {
                this.overlay = false
                this.DialogKeteranganAll = false
                this.DialogKeteranganAll = false
                this.pesan = "Update Data Gagal!";
                this.snackbar = true;   
              })
         } 
      },
      
      handleSubmitKeteranganPbro30(){
        if(this.itemToSave30.length === 0 && this.keterangan30.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  toko:  this.itemToSave30, 
                  pbro_status: this.listStatus30.toString(),
                  keterangan: this.keterangan30, 
              };
              this.$store.dispatch("simpanKeteranganPbro30", datanya).then(()=> {
                this.overlay = false
                this.DialogKeterangan30 = !this.DialogKeterangan30
                this.pesan = "Update Data Sukses!";
                this.snackbar = true;   
                this.loaddata()
              }).catch(() => {
                this.overlay = false
                this.DialogKeterangan30 = !this.DialogKeterangan30
                this.pesan = "Update Data Gagal!";
                this.snackbar = true;   
              })
         } 
      }, 
       handleSubmitKeteranganPbroAll30(){
        if(this.listStatus30.length === 0 && this.keteranganall30.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  toko:  this.listToko30Menit.toString(),
                  pbro_status: this.listStatus30.toString(),
                  keterangan: this.keteranganall30, 
              };
              this.$store.dispatch("simpanKeteranganPbroAll30", datanya).then(()=> {
                this.overlay = false
                this.DialogKeteranganAll30 = !this.DialogKeteranganAll30
                this.pesan = "Update Data Sukses!";
                this.snackbar = true;   
                this.loaddata()
              }).catch(() => {
                this.overlay = false
                this.DialogKeteranganAll30 = !this.DialogKeteranganAll30
                this.pesan = "Update Data Gagal!";
                this.snackbar = true;   
              })
         } 
      },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
    this.loaddata()
    this.loaddata2()
  },
};
</script>

<style scoped>

.word-wrap {
  white-space:nowrap;
} 
.rounded-card {
  border-radius: 24px;
}
</style>

<style lang="scss">
.dashboard-page {
  .page-title {
    padding-bottom: 20px;
    color:dimgray; 
  }
  .apexcharts-legend-series {
    padding: 2px 5px 3px;
    display: flex;
    align-items: center;
    .apexcharts-legend-marker {
      margin-right: 8px;
    }
  }
 
  .v-card {
    .v-card__text {
      .subtext {
        font-size: 1.142rem;
        font-weight: 400; 
      }
      .subtext-index {
        font-size: 11px; 
        font-weight: 400;
      }
    }
  }
  .support-requests {
    .v-data-table__wrapper {
      thead tr th {
        font-size: 1rem;
        font-weight: 500; 
      }
    }
  }
}
</style>