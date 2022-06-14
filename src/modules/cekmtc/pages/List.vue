<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title>Monitoring MTC Toko</v-card-title>
      <v-divider />  
      <v-card-text >   
       
        <div class="d-flex flex-column ma-4">  
            
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Cek Kelengkapan MTC Toko 
               
              <v-col class="text-right">
                <v-btn color="teal darken-1" icon @click="loaddataCekMtc()">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>

                <v-flex lg12 md12 sm12>
                  <v-row dense >  
                    <v-col class="pa-2" lg="1"> 
                        <v-btn fab dark small color="indigo" @click="showAdd()">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn> 
                    </v-col>
                    <v-col class="pa-2" lg="7">  
                      <download-excel
                            ref="donwloadResultQuery"
                            class= "button is-primary" 
                            :data="listdataCekMtc" 
                            worksheet="Data" 
                            name="List Toko MTC"
                            >
                            <v-btn color="secondary"  elevation="10">
                              <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                              XLS
                            </v-btn>
                      </download-excel>
                    </v-col>
                    <v-col class="pa-2" lg="4" > 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdataCekMtc" :search="search" mobile-breakpoint="0"> 
                     
                    <template v-slot:[`item.id`]="{ item }">                   
                        <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialog(item.id)">mdi-eye-check-outline</v-icon> 
                        <v-icon medium color="teal darken-1" class="mr-3" @click="showEditDialog(item.id)">mdi-pencil</v-icon> 
                        <v-icon medium color="amber darken-4" class="mr-3" @click="checkTokoMtc(item.id)">mdi-book-check-outline</v-icon>
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay>
       
      <v-dialog v-model="DialogDetail" max-width="1180" >
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon>  ({{ kdcab_cek }}) {{ kdtk_cek }} - {{ nama_cek }} 
            </v-card-title>  
          </v-card>
            <v-sheet elevation="10"> 
                <v-tabs
                  v-model="tabdetail"
                  align-with-title
                >  
                  <v-tabs-slider color="yellow"></v-tabs-slider> 
                  <v-tab key="Mtran">
                    Mtran
                  </v-tab>
                  <v-tab key="Mstran">
                    Mstran
                  </v-tab>
                  <v-tab key="docnomtran">
                    Docno Mtran
                  </v-tab>
                  <v-tab key="docnomstran">
                    Docno Mstran
                  </v-tab>
                  <v-tab key="listrik">
                    Listrik
                  </v-tab>
                  <v-tab key="paymentpoint">
                    Payment Point
                  </v-tab>
                  <v-tab key="spdmast">
                    Spdmast
                  </v-tab>
                  <v-tab key="const">
                    Const
                  </v-tab>
                  <v-tab key="plastik">
                    Plastik
                  </v-tab>
                </v-tabs> 

                <v-tabs-items v-model="tabdetail">
                  <v-tab-item key="mtran">
                    <v-card class="mx-auto"> 
                      <v-card-text> 
                        <v-row>
                          <v-col col="12">
                            <span class="subtitle-1 py-10" color="#2fc498"> Mtran Iris Vs Toko </span>
                            <ve-table 
                                fixed-header
                                :border-x="true" 
                                :border-y="true" 
                                :columns="headersMtraniris"
                                :table-data="listCekMtc_mtran_iris"
                                :scroll-width="980"
                                row-hover-color="#2fc498"
                                row-click-color="#2fc498"
                            />
                            
                          <div v-show="listCekMtc_mtran_iris.length === 0" class="empty-data">Tidak Ada Selisih</div>

                          <v-divider></v-divider> 
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col col="12">
                          <v-divider></v-divider>
                          <span class="subtitle-1 py-10" color="#2fc498"> Mtran Toko Vs Iris</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headersMtrantoko"
                              :table-data="listCekMtc_mtran_toko"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          />
                          <div v-show="listCekMtc_mtran_toko.length === 0" class="empty-data">Tidak Ada Selisih</div>
                        </v-col>  
                        </v-row>  
                      </v-card-text>  
                      <v-card-actions>
                        <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item key="mstran">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> Mstran Iris Vs Toko </span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headersMstraniris"
                              :table-data="listCekMtc_mstran_iris"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          />
                          
                        <div v-show="listCekMtc_mstran_iris.length === 0" class="empty-data">Tidak Ada Selisih</div>

                      
                        </v-col>
                      </v-row>
                        <v-divider></v-divider>

                      <v-row>
                        <v-col col="12">
                        
                        <span class="subtitle-2"> Mstran Toko Vs Iris </span>
                        <ve-table 
                            fixed-header
                            :border-x="true" 
                            :border-y="true" 
                            :columns="headersMstrantoko"
                            :table-data="listCekMtc_mstran_toko"
                            :scroll-width="980"
                            row-hover-color="#2fc498"
                            row-click-color="#2fc498"
                        />
                        <div v-show="listCekMtc_mstran_toko.length === 0" class="empty-data">Tidak Ada Selisih</div>
                      </v-col>  
                      </v-row>  
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>

                <v-tab-item key="docnomtran">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK MTRAN ADA DOCNO LONCAT ATAU TIDAK </span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_docno_mtran"
                              :table-data="listCekMtc_docno_mtran"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_docno_mtran.length === 0" class="empty-data">Tidak ada Selisih</div> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>

                <v-tab-item key="docnomstran">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK MSTRAN ADA DOCNO LONCAT ATAU TIDAK </span>
                            <download-csv
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="listCekMtc_docno_mstran" 
                                worksheet="Data" 
                                name="CEK MSTRAN ADA DOCNO LONCAT ATAU TIDAK"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  Download Docno Mstran
                                </v-btn>
                             </download-csv> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>

                <v-tab-item key="listrik">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK NILAI LISTRIK</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_listrik"
                              :table-data="listCekMtc_listrik"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_listrik.length === 0" class="empty-data">Data Empty.</div> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                
                <v-tab-item key="paymentpoint">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK NILAI PAYMENT POINT</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_paymentpoint"
                              :table-data="listCekMtc_paymentpoint"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_paymentpoint.length === 0" class="empty-data">Tidak Ada Selisih.</div> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                
                <v-tab-item key="spdmast">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK SPDMAST</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_spdmast"
                              :table-data="listCekMtc_spdmast"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_spdmast.length === 0" class="empty-data">Tidak Ada Selisih.</div> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                
                <v-tab-item key="const">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK Const Toko</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_const"
                              :table-data="listCekMtc_const"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_const.length === 0" class="empty-data">Data Empty.</div> 
                        </v-col>
                      </v-row> 
                      <v-row>
                      <v-col col="12">
                        <span class="subtitle-2"> Data Const Toko</span>
                        
                         <template>
                            <v-simple-table
                              fixed-header 
                            > 
                              <thead>
                                <tr>
                                  <th class="deep-purple darken-2 white--text" :style="indexColumnStyle">
                                    Point
                                  </th>
                                  <th class="deep-purple darken-2 white--text" :style="indexColumnStyle">
                                    Hasil Pengecekan
                                  </th>
                                </tr>
                              </thead>
                              <tbody >
                                <tr><td style="font-weight: bold;">Const Toko</td><td><span v-html="listCekMtc_const2"></span></td></tr>
                              </tbody> 
                          </v-simple-table>
                        </template>
                      </v-col>
                    </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item> 
                
                <v-tab-item key="plastik">
                  <v-card class="mx-auto"> 
                    <v-card-text> 
                      <v-row>
                        <v-col col="12">
                          <span class="subtitle-2"> CEK Plastik Toko</span>
                          <ve-table 
                              fixed-header
                              :border-x="true" 
                              :border-y="true" 
                              :columns="headers_plastik"
                              :table-data="listCekMtc_plastik"
                              :scroll-width="980"
                              row-hover-color="#2fc498"
                              row-click-color="#2fc498"
                          /> 
                        <div v-show="listCekMtc_plastik.length === 0" class="empty-data">Data Empty.</div> 
                        </v-col>
                      </v-row> 
                    </v-card-text>  
                    <v-card-actions>
                      <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                 
                </v-tabs-items>
              </v-sheet> 
      </v-dialog>

      <v-dialog v-model="DialogAdd" max-width="1180">
         <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon>  Input Toko MTC
            </v-card-title>  
          
            <v-card-text>
                <v-form ref="form" @submit.prevent="onSubmit">
                  <v-flex lg12 md12 sm12>
                      <v-row dense> 
                        <v-col cols="12" lg="3"> 
                            <v-autocomplete
                              class="ma-1 pa-1 mx-4"
                              prepend-icon="mdi-home-map-marker"
                              v-model="listCekMtcCabang" 
                              item-text="nama_cabang"
                              item-value="kdcab"
                              :items="getCabangMtc"
                              :rules="[v => !!v || 'Data harus diisi']"
                              label="Pilih Kode Cabang"
                              @change="loadTokoMtc"
                              required
                            > 
                            </v-autocomplete>   
                        </v-col> 
                         <v-col cols="12" lg="4"> 
                            <v-autocomplete
                              class="ma-1 pa-1 mx-4"
                              prepend-icon="mdi-home-map-marker"
                              v-model="listCekMtcToko" 
                              item-text="nama_toko"
                              item-value="nama_toko"
                              :items="getTokoMtc"
                              :rules="[v => !!v || 'Data harus diisi']"
                              label="Pilih Kode Toko"
                              required
                            > 
                            </v-autocomplete>   
                        </v-col> 
                        <v-col cols="12" lg="2">   
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
                                      label="Pilih Tanggal Awal"
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
                        <v-col cols="12" lg="2">   
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
                                        label="Pilih Tanggal Akhir"
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
                        <v-col cols="12" lg="1">   
                              <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveAddMtc">
                              Simpan
                              </v-btn> 
                        </v-col>
                      </v-row> 
                    </v-flex> 
                  </v-form>
            </v-card-text>
          </v-card>
      </v-dialog>

      <v-dialog v-model="DialogEdit" max-width="1180">
         <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Update Verifikasi MTC Toko
              
            </v-card-title>  
            <v-divider></v-divider>
            <v-card-text>
             
                <v-form ref="form" @submit.prevent="onSubmit">
                  <v-flex lg12 md12 sm12>
                      <v-row dense>   
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="mtran" 
                            label="Mtran Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col>   
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="mstran" 
                            label="Mstran Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col> 
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="docno_mtran" 
                            label="Docno Mtran Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col>  
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="docno_mstran" 
                            label="Docno Mstran Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col>  
                      </v-row> 
                      <v-row dense>   
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="listrik" 
                            label="Listrik Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col>  
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="paymentpoint" 
                            label="Paymentpoint Tidak Ada Selish ?"
                          ></v-checkbox>  
                        </v-col>  
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="spdmast" 
                            label="Spdmast Sudah Sesuai ?"
                          ></v-checkbox>  
                        </v-col>  
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="const_toko" 
                            label="Const Sudah Sesuai ?"
                          ></v-checkbox>  
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12" lg="3">   
                           <v-checkbox
                            class="ma-1 pa-1 mx-4"
                            color="blue"
                            v-model="plastik" 
                            label="Data Kantong Plastik Sudah Sesuai ?"
                          ></v-checkbox>  
                        </v-col>
                        <v-col cols="12" lg="6">     
                          <v-textarea
                            class="ma-1 pa-1 mx-4"
                            v-model="keterangan" 
                            append-icon="mdi-text"
                            filled
                            auto-grow 
                            label="Keterangan" 
                          ></v-textarea> 
                        </v-col>
                      </v-row> 
                      <v-row dense>
                        <v-col cols="12" lg="3" offset-lg="6">
                          <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveUpdMtc">
                              Simpan
                          </v-btn> 
                        </v-col>
                      </v-row>
                    </v-flex> 
                  </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

    </v-card>
    
    
</template>

<script>
export default {
  data() {
    
    return {  
      
      indexColumnStyle: {
        width: "100px",
        textAlign: "center"
      },  
      keterangan:"",
      mtran:false,
      mstran:false,
      docno_mtran:false,
      docno_mstran:false,
      listrik:false,
      paymentpoint:false,
      spdmast: false,
      const_toko: false,
      plastik: false, 
      listCabangMtc:"",
      kdcab_cek:"",
      kdtk_cek:"",
      nama_cek:"",  
      listCekMtcCabang:"", 
      listCekMtcToko:"", 
      tabdetail: null,
      DialogDetail: false,
      DialogAdd: false, 
      DialogEdit: false,
      timeoutPesan:2000,  
      snackbar: false, 
      tanggal1:"", 
      tanggal2:"",  
      itemKdtk: "",
      pesan: "", 
      absolute:true, 
      dateAwal: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),
      dateAkh: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),
      search: "",  
      overlay: false,   
      windowWidth: window.innerWidth,  
      headers: [  
          {text: '#', value: 'id', align:'center', fixed: true},  
          {text: 'Kdcab', value: 'kdcab'},  
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama Toko', value: 'nama'}, 
          {text: 'Start', value: 'tanggal1'},
          {text: 'End', value: 'tanggal2'},
          {text: 'Diajukan Oleh', value: 'nama_user_pengajuan'},
          {text: 'Tanggal Pengajuan', value: 'tanggal_pengajuan'}, 
          {text: 'Diverifikasi Oleh', value: 'nama_user_pengecekan'},
          {text: 'Tanggal Verifikasi', value: 'tanggal_pengecekan'}, 
          {text: 'status_mtran', value: 'status_mtran'},  
          {text: 'status_mstran', value: 'status_mstran'},  
          {text: 'status_docno_loncat_mtran', value: 'status_docno_loncat_mtran'},  
          {text: 'status_docno_loncat_mstran', value: 'status_docno_loncat_mstran'},  
          {text: 'status_listrik', value: 'status_listrik'},  
          {text: 'status_paymentpoint', value: 'status_paymentpoint'},  
          {text: 'status_spdmast', value: 'status_spdmast'},  
          {text: 'status_const', value: 'status_const'},  
          {text: 'status_plastik', value: 'status_plastik'},  
          {text: 'catatan', value: 'catatan'} 
      ],
      headersMtraniris : [
         {field: "tanggal" , key: "tanggal", title: "Tanggal", width: 75, align: "center"},
          {field: "shop" , key: "shop", title: "Shop", width: 75, align: "center"},
          {field: "sales_net" , key: "sales_net", title: "SALES NET", width: 100, align: "center"},
          {field: "hpp" , key: "hpp", title: "HPP", width: 100, align: "center"},
          {field: "struk" , key: "struk", title: "Struk", width: 75, align: "center"},
          {field: "total_rec" , key: "total_rec", title: "Total Rec", width: 75, align: "center"}, 
          {field: "sales_net_toko" , key: "sales_net_toko", title: "SALES_NET TOKO", width: 100, align: "center"},
          {field: "hpp_toko" , key: "hpp_toko", title: "HPP Toko", width: 100, align: "center"},
          {field: "struk_toko" , key: "struk_toko", title: "Struk Toko", width: 75, align: "center"},
          {field: "total_rec_toko" , key: "total_rec_toko", title: "Total Rec Toko", width: 100, align: "center"}
      ],
      headersMtrantoko : [
         {field: "TANGGAL" , key: "TANGGAL", title: "Tanggal", width: 75, align: "center"},
         {field: "SHOP" , key: "SHOP", title: "Shop", width: 75, align: "center"},
         {field: "sales_net_toko" , key: "sales_net_toko", title: "SALES_NET TOKO", width: 100, align: "center"},
         {field: "hpp_toko" , key: "hpp_toko", title: "HPP Toko", width: 100, align: "center"},
         {field: "struk_toko" , key: "struk_toko", title: "Struk Toko", width: 75, align: "center"},
         {field: "total_rec_toko" , key: "total_rec_toko", title: "Total Rec Toko", width: 100, align: "center"},
         {field: "sales_net" , key: "sales_net", title: "SALES NET", width: 100, align: "center"},
         {field: "hpp" , key: "hpp", title: "HPP", width: 100, align: "center"},
         {field: "struk" , key: "struk", title: "Struk", width: 75, align: "center"},
         {field: "total_rec" , key: "total_rec", title: "Total Rec", width: 75, align: "center"} 
      ], 
      
      headersMstraniris : [        
         {field: "TANGGAL" , key: "TANGGAL", title: "Tanggal", width: 75, align: "center"},
         {field: "RTYPE" , key: "RTYPE", title: "Rtype", width: 75, align: "center"},
         {field: "BUKTI_NO" , key: "BUKTI_NO", title: "Bukti No", width: 100, align: "center"},
         {field: "GROSS" , key: "GROSS", title: "Gross", width: 100, align: "center"},
         {field: "PPN" , key: "PPN", title: "PPN", width: 75, align: "center"},
         {field: "DISC_05" , key: "DISC_05", title: "DISC 05", width: 100, align: "center"}, 
         {field: "rtype_toko" , key: "rtype_toko", title: "Rtype Toko", width: 75, align: "center"},
         {field: "bukti_no_toko" , key: "bukti_no_toko", title: "Bukti No Toko", width: 100, align: "center"},
         {field: "gross_toko" , key: "gross_toko", title: "Gross Toko", width: 100, align: "center"},
         {field: "ppn_toko" , key: "ppn_toko", title: "PPN Toko", width: 75, align: "center"},
         {field: "disc_05_toko" , key: "disc_05_toko", title: "DISC 05 Toko", width: 100, align: "center"}
      ], 
      headersMstrantoko : [
         {field: "tanggal_toko" , key: "tanggal_toko", title: "Tanggal", width: 75, align: "center"},
         {field: "rtype_toko" , key: "rtype_toko", title: "Rtype", width: 75, align: "center"},
         {field: "bukti_no_toko" , key: "bukti_no_toko", title: "Bukti No", width: 100, align: "center"},
         {field: "gross_toko" , key: "gross_toko", title: "Gross", width: 100, align: "center"},
         {field: "ppn_toko" , key: "ppn_toko", title: "PPN", width: 75, align: "center"},
         {field: "disc_05_toko" , key: "disc_05_toko", title: "DISC 05", width: 100, align: "center"},
         {field: "TANGGAL" , key: "TANGGAL", title: "Tanggal Iris", width: 75, align: "center"},
         {field: "RTYPE" , key: "RTYPE", title: "Rtype Iris", width: 75, align: "center"},
         {field: "BUKTI_NO" , key: "BUKTI_NO", title: "Bukti No Iris", width: 100, align: "center"},
         {field: "GROSS" , key: "GROSS", title: "Gross Iris", width: 100, align: "center"},
         {field: "PPN" , key: "PPN", title: "PPN Iris", width: 75, align: "center"},
         {field: "DISC_05" , key: "DISC_05", title: "DISC 05 Iris", width: 100, align: "center"}
      ],      
      headers_docno_mtran : [
         {field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 75, align: "center"},
         {field: "STATION" , key: "STATION", title: "STATION", width: 75, align: "center"},
         {field: "SHIFT" , key: "SHIFT", title: "SHIFT", width: 75, align: "center"},
         {field: "STRUK" , key: "STRUK", title: "STRUK", width: 75, align: "center"},
         {field: "MIN_DOCNO" , key: "MIN_DOCNO", title: "MIN_DOCNO", width: 75, align: "center"},
         {field: "MAX_DOCNO" , key: "MAX_DOCNO", title: "MAX_DOCNO", width: 75, align: "center"},
         {field: "SEL_DOCNO" , key: "SEL_DOCNO", title: "SEL_DOCNO", width: 75, align: "center"}
      ], 
      headers_docno_mstran : [
         {field: "BUKTI_TGL" , key: "BUKTI_TGL", title: "BUKTI_TGL", width: 75, align: "center"},
         {field: "RTYPE" , key: "RTYPE", title: "RTYPE", width: 75, align: "center"},
         {field: "BUKTI_NO" , key: "BUKTI_NO", title: "BUKTI_NO", width: 75, align: "center"}
      ], 
      headers_listrik : [
         {field: "listrik_mtran" , key: "listrik_mtran", title: "Listrik Mtran", width: 75, align: "center"},
         {field: "listrik_virtual_trx" , key: "listrik_virtual_trx", title: "Listrik Virutal TRX", width: 75, align: "center"}
      ], 
      headers_paymentpoint : [
         {field: "trxtoko" , key: "trxtoko", title: "TRX TOKO", width: 75, align: "center"},
         {field: "trandate" , key: "trandate", title: "Tran Date", width: 75, align: "center"}
      ], 
      headers_spdmast : [
         {field: "supco" , key: "supco", title: "Supco", width: 75, align: "center"}
      ],  
      headers_const : [
         {field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 75, align: "center"},
         {field: "KET" , key: "KET", title: "KET", width: 75, align: "center"},
         {field: "RTYPE" , key: "RTYPE", title: "RTYPE", width: 75, align: "center"},
         {field: "DOCNO_MSTRAN" , key: "DOCNO_MSTRAN", title: "DOCNO_MSTRAN", width: 75, align: "center"},
         {field: "RKEY" , key: "RKEY", title: "RKEY", width: 75, align: "center"},
         {field: "DOCNO_CONST" , key: "DOCNO_CONST", title: "DOCNO_CONST", width: 75, align: "center"},
         {field: "KETERANGAN" , key: "KETERANGAN", title: "KETERANGAN", width: 75, align: "center"},
      ], 
      headers_plastik : [
         {field: "KONSUMEN_IDM" , key: "KONSUMEN_IDM", title: "KONSUMEN_IDM", width: 75, align: "center"},
         {field: "DC_IDM" , key: "DC_IDM", title: "DC_IDM", width: 75, align: "center"},
         {field: "KONSUMEN_CRM" , key: "KONSUMEN_CRM", title: "KONSUMEN_CRM", width: 75, align: "center"},
         {field: "DC_CRM" , key: "DC_CRM", title: "DC_CRM", width: 75, align: "center"},
         {field: "NON_IDM_CRM" , key: "NON_IDM_CRM", title: "NON_IDM_CRM", width: 75, align: "center"},
      ],  
    };
  },
  computed: {    
    
    computeTanggal() {
      return this.dateAwal;
    }, 
    computeTanggal2() {
      return this.dateAkh;
    },
    listdataCekMtc() {  
      return this.$store.getters.listCekMtc;
    },   
    isMobile() {
      return this.windowWidth <= 300
    },
    listCekMtc_mtran_iris() { 
      return this.$store.getters.listCekMtc_mtran_iris;
    }, 
    listCekMtc_mtran_toko() { 
      return this.$store.getters.listCekMtc_mtran_toko;
    }, 
    listCekMtc_mstran_iris() { 
      return this.$store.getters.listCekMtc_mstran_iris;
    }, 
    listCekMtc_mstran_toko() { 
      return this.$store.getters.listCekMtc_mstran_toko;
    }, 
    listCekMtc_docno_mtran() { 
      return this.$store.getters.listCekMtc_docno_mtran;
    }, 
    listCekMtc_docno_mstran() { 
      return this.$store.getters.listCekMtc_docno_mstran;
    }, 
    listCekMtc_const2(){
      return this.$store.getters.listCekMtc_const2;
    },
    listCekMtc_listrik() { 
      return this.$store.getters.listCekMtc_listrik;
    }, 
    listCekMtc_paymentpoint() { 
      return this.$store.getters.listCekMtc_paymentpoint;
    }, 
    listCekMtc_spdmast() { 
      return this.$store.getters.listCekMtc_spdmast;
    }, 
    listCekMtc_const() { 
      return this.$store.getters.listCekMtc_const;
    }, 
    listCekMtc_plastik() { 
      return this.$store.getters.listCekMtc_plastik;
    }, 
    getCabangMtc() {
      return this.$store.getters.listCekMtcCabang;
    },  
    getTokoMtc() {
      return this.$store.getters.listCekMtcToko;
    }, 
 
      
  },
  methods: {  
    
      closeDialog(){  
        this.tabdetail = null
        this.DialogDetail = !this.DialogDetail
      },
      loaddataCekMtc(){
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        
        this.$store.dispatch("getListCekMtc", { kdcab : dataUser.cover}).then(()=> {
              this.overlay = false
            }).catch(() => {
              this.overlay = false
            });
      }, 

      showEditDialog(item) { 
          this.itemKdtk = item
          this.DialogEdit = !this.DialogEdit
      },

      showDetailDialog(item) {
          this.overlay = true
          this.itemKdtk = item
          const datanya = {
            id:  this.itemKdtk
          };
              this.$store.dispatch("getDetailCekMtc", datanya).then((r)=> {  
                  this.kdcab_cek = r.kdcab
                  this.kdtk_cek = r.kdtk
                  this.nama_cek = r.nama

                  this.overlay = false 
                  if(r.message !="Gagal"){
                    this.DialogDetail = !this.DialogDetail
                  }else{
                    
                    throw Error
                  }
                  
              }).catch((e) => {
                console.log(e)
                  this.pesan = "Gagal Ambil Data...";
                  this.snackbar = true;   
                  this.overlay = false
              })
      }, 
      showAdd() { 
          this.DialogAdd = !this.DialogAdd 
      }, 
      checkTokoMtc(item) {
        this.itemKdtk = item
        let dataUser = this.$store.getters.dataUsers
        this.overlay = true
        this.pesan = "Update Data...";
        this.snackbar = true;   
          
        const datanya = {
            id:  this.itemKdtk, 
            nama_user: dataUser.nama
        };
        this.$store.dispatch("getCheckTokoMtc", datanya).then(()=> {
          this.overlay = false
          this.loaddataCekMtc() 
        }).catch(() => {
           this.pesan = "Gagal Ambil Data Toko...";
            this.snackbar = true;  
          this.overlay = false
        }) 
      }, 

      loadCabangMtc(){ 
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover
        };  
        this.$store.dispatch("getCabangMtc", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })
      },

      loadTokoMtc(){         
        this.overlay = true        
        const datanya = {
              kdcab:  this.listCekMtcCabang
        };  
        this.$store.dispatch("getListTokoMtc", datanya).then(()=>{
          this.overlay = false
        }).catch(() =>{
           this.overlay = false
        })  
      },

      saveAddMtc(){ 
        this.overlay = true        
      if(this.$refs.form.validate()){ 
        let dataUser = this.$store.getters.dataUsers

        const datanya = {
            kdcab:  this.listCekMtcCabang,
            toko: this.listCekMtcToko,
            tanggal1: this.dateAwal,
            tanggal2: this.dateAkh,
            nama_user: dataUser.nama
        };
        
        this.$store.dispatch("getSimpanAddMtc", datanya).then(()=> { 
            this.loaddataCekMtc() 
            this.DialogAdd = !this.DialogAdd 
            this.overlay = false        
        }).catch(() => {
            this.overlay = false        
        })
      }
    },
    saveUpdMtc(){ 
      this.overlay = true        
      if(this.$refs.form.validate()){ 
        let dataUser = this.$store.getters.dataUsers

        const datanya = {
            id:   this.itemKdtk,
            keterangan:this.keterangan,
            mtran: this.mtran === true ? 'OK' : 'NOT OK',
            mstran: this.mstran === true ? 'OK' : 'NOT OK',
            docno_mtran: this.docno_mtran  === true ? 'OK' : 'NOT OK',
            docno_mstran: this.docno_mstran  === true ? 'OK' : 'NOT OK',
            listrik: this.listrik  === true ? 'OK' : 'NOT OK',
            paymentpoint: this.paymentpoint  === true ? 'OK' : 'NOT OK',
            spdmast: this.spdmast  === true ? 'OK' : 'NOT OK',
            const_toko: this.const_toko  === true ? 'OK' : 'NOT OK',
            plastik: this.plastik  === true ? 'OK' : 'NOT OK', 
            nama_user: dataUser.nama
        }; 
        
        this.$store.dispatch("getSimpanUpdMtc", datanya).then(()=> { 
            this.loaddataCekMtc() 
            this.DialogUpd = !this.DialogUpd 
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
    this.loaddataCekMtc() 
    this.loadCabangMtc()
  },
};
</script>

<style scoped>
  .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
}
.word-wrap {
  white-space:nowrap;
}  
</style>