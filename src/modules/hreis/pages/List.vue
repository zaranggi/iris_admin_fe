<template> 

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Monitoring Data Harian IRIS </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitHareis" ref="form">
            <v-flex lg12 md12 sm12>
              <v-row dense > 
                <v-col cols="7">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangHareis"
                    item-text="nama_cabang"
                    item-value="id"
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
                        <v-icon :color="listCabangHareis.length > 0 ? 'indigo darken-4' : ''">
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
        
        <template >
          <v-row dense>
             <v-col cols="4">
                <v-card class="mx-auto cyan accent-4 rounded-lg" elevation="10">
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
                           {{ this.getTokoAktif | numeral('0,0') }}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto deep-purple darken-1 rounded-lg" elevation="10" @click="dialogTokoLR=true">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Toko Libur </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Toko Libur</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getTokoLibur | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto pink accent-3 rounded-lg" elevation="10" @click="dialogTokoTS=true">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Toko Tutup Sementara </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Toko Tutup Sementara</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getTokoTs | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col> 
          </v-row>
        </template>

        <template >
          <v-row dense>
             <v-col cols="3">
                <v-card class="mx-auto green darken-1 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text">Sudah Proses</v-list-item-title>
                        <v-list-item-subtitle class="white--text">Load Files</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi mdi-trending-up</v-icon>   
                           {{ this.getsudahHareis | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="mx-auto teal accent-4 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Sudah Proses </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Hitung Sales</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi mdi-trending-up</v-icon>   
                          {{ this.getsudahHareisDT | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="mx-auto amber darken-2 rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Belum Proses </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Load Files</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getbelumHareis | numeral('0,0')}}
                        </v-col> 
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="mx-auto red accent-2  rounded-lg" elevation="10">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline white--text"> Belum Proses </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Hitung Sales</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getbelumHareisDT | numeral('0,0')}}
                        </v-col>                          
                      </v-row>
                    </v-card-text>
                </v-card>
              </v-col> 
          </v-row>
        </template>


        <template >
          <v-row dense>
             <v-col cols="6" offset-md="3">
              <v-divider
                inset
              ></v-divider>
              
                <ve-table 
                    fixed-header
                    :border-x="true" 
                    :border-y="true" 
                    :columns="headersx"
                    :table-data="getlistrekapIRISfix"
                    :cell-style-option="cellStyleOption" 
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498"
                />
                
                <div v-show="getlistrekapIRISfix.length === 0" class="empty-data">Tidak Ada Data</div>

             </v-col>
          </v-row>
        </template>
        
            <v-card outlined class="mt-2">
              <v-card-title >
                 <v-icon color="red darken-1">mdi-dns</v-icon> Absensi Toko Belum Proses
                  <v-flex lg12 md12 sm12>
                  <v-row dense style="padding-top:56px"> 
                    <v-col class="pa-2" lg="4" > 
                      <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="listrekapbelum" 
                                worksheet="Data" 
                                name="AbsensiIris.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                      </v-col>  
                    <v-col class="pa-2" lg="4" offset="4">  
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
               <v-layout >
                  <v-row dense > 
                    <v-col class="pa-2" lg="12"> 
                  <v-data-table :class="['word-wrap']" :headers="headers2" :items="listrekapbelum" :search="search2" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <template v-slot:[`item.tglbuka`]="{ item }">
                      {{ item.tglbuka | formatTglIndo }}
                    </template>
                    
                    <template v-slot:[`item.action`]="{ item }">
                      <v-icon medium color="teal darken-1" class="mr-3" @click="showEditDialogFlagToko( item.kdcab, item.kdtk, item.nama)">mdi-pencil</v-icon> 
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search2 }}" found no results.
                    </v-alert>
                  </v-data-table> 
                  </v-col>
                  </v-row>

                </v-layout> 
              </v-card-text>
              
            </v-card>  
         
            <v-card outlined class="mt-2">
              <v-card-title >
                 <v-icon color="red darken-1">mdi-dns</v-icon> Absensi Toko Sales (DT) Belum Proses
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4"> 
                      <v-text-field
                        dense
                        placeholder="Search"
                        clearable
                        v-model="search4"
                        append-icon="mdi-magnify" single-line hide-details
                      ></v-text-field> 
                    </v-col>
                  </v-row>
                </v-flex>
              </v-card-title>

              <v-card-text> 
               <v-layout column style="padding-top:56px">
                  <v-data-table :class="['word-wrap']" :headers="headers4" :items="listrekapbelumDT" :search="search4" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <template v-slot:[`item.tglbuka`]="{ item }">
                      {{ item.tglbuka | formatTglIndo }}
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search4 }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
              </v-card-text>
              
            </v-card>  
 
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-icon color="orange darken-2">mdi-dns</v-icon> Absensi File Belum Proses 
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4"> 
                      <v-text-field
                        dense
                        placeholder="Search"
                        clearable
                        v-model="search3"
                        append-icon="mdi-magnify" single-line hide-details
                      ></v-text-field> 
                    </v-col>
                  </v-row>
                </v-flex>
              </v-card-title>

              <v-card-text> 
               <v-layout column style="padding-top:56px">
                  <v-data-table :class="['word-wrap']" :headers="headers3" :items="listperfile" :search="search3" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template>  
                  </v-data-table> 
                </v-layout> 
              </v-card-text>
              
            </v-card> 
         

            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Absensi All Toko
                <v-flex lg12 md12 sm12>
                  <v-row dense style="padding-top:56px"> 
                      <v-col class="pa-2" lg="4"> 
                      <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="listdata" 
                                worksheet="Data" 
                                name="AbsensiIris.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                              </v-col> 
                    <v-col class="pa-2" lg="4" offset="4">
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
               <v-layout > 
                 <v-col class="pa-2" lg="12"> 
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <template v-slot:[`item.tglbuka`]="{ item }">
                      {{ item.tglbuka | formatTglIndo }}
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-col>
                </v-layout> 
              </v-card-text>
              
            </v-card> 

        <v-dialog v-model="dialogEditFlagToko" max-width="640">
          <v-card>
            <v-card-title class="headline">
              Flag Toko Libur
            </v-card-title>
            <v-card-text>
              {{ this.itemKdcab}} :: {{ this.itemKdtk}} - {{ this.itemNama}} <br/>
              Apakah Anda Yakin Flag Libur Toko ini?
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange darken-1" text @click="dialogEditFlagToko = false ">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="FlagLibur()">Flag Libur</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 

        <v-dialog v-model="dialogTokoLR" max-width="640">
          <v-card>
            <v-card-title class="headline">
              List Toko Libur
            </v-card-title>
            <v-card-text>
              <v-data-table :class="['word-wrap']" :headers="headerslr" :items="getlistLR" mobile-breakpoint="0">
                  
              </v-data-table> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange deep-2" @click="dialogTokoLR = false ">Close</v-btn> 
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogTokoTS" max-width="640">
          <v-card>
            <v-card-title class="headline">
              List Toko Tutup Sementara
            </v-card-title>
            <v-card-text>
              <v-data-table :class="['word-wrap']" :headers="headersts" :items="getlistTS" mobile-breakpoint="0">
                  
              </v-data-table> 
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange deep-2" @click="dialogTokoTS = false ">Close</v-btn> 
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
      cellStyleOption: {
                    bodyCellClass: ({ row, column }) => {
                      
                        if (column.field === "sudah" ) {
                            return "table-body-cell-class1";
                        }
                        if (column.field === "sudah_dt" ) {
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
                        if (column.field === "belum_dt" ) {
                            const valu = row[column.field]
                            if(valu === "0"){
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
      search3: "",  
      search4: "",
      dialogEditFlagToko: false,
      dialogTokoLR: false,
      dialogTokoTS: false,
      itemKdcab: "",
      itemKdtk: "",
      itemNama: "",
      dateAwal: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),
      tanggal: false,
      listCabangHareis: "",
      windowWidth: window.innerWidth,  
      headerslr: [{ text: 'Kdcab', value: 'kdcab',   fixed: true }, { text: 'Kdtk', value: 'toko',   fixed: true }, { text: 'Nama Toko', value: 'namatoko',   fixed: true }],
      headersts: [{ text: 'Kdcab', value: 'kdcab',   fixed: true }, { text: 'Kdtk', value: 'toko',   fixed: true }, { text: 'Nama Toko', value: 'namatoko',   fixed: true }], 
      headersx: [
          {field: 'kdcab', key: "a", title: 'Kdcab', align:'center'},
          {field: 'total_toko', key: "c",  title: 'Total Toko', align:'center'},
          {field: 'sudah', key: "d",  title: 'Sudah Proses ', align:'center'},
          {field: 'belum', key: "f", title: 'Belum Proses', align:'center'},
          {field: 'sudah_dt', key: "e", title: 'DT Proses', align:'center'},
          {field: 'belum_dt',key: "g",  title: 'DT Blm Proses', align:'center'}
      ],
      headers: [{ text: 'Kdcab', value: 'kdcab',   fixed: true }, { text: 'Kdtk', value: 'kdtk',   fixed: true }, { text: 'Nama', value: 'nama' }, { text: 'Tanggal Buka', value: 'tglbuka' }, { text: 'Sudah Proses', value: 't_proses' }, { text: 'Belum Proses', value: 't_belum' }, { text: 'Keterangan', value: 'proses' }],
      headers2: [
         { text: '#', value: 'action'},
         { text: 'Kdcab', value: 'kdcab', fixed: true },
         { text: 'Kdtk', value: 'kdtk', fixed: true }, 
         { text: 'Nama', value: 'nama' }, 
         { text: 'Nama Mgr', value: 'nama_mgr' }, 
         { text: 'Nama Spv', value: 'nama_spv' }, 
         { text: 'Tanggal Buka', value: 'tglbuka' },  
         { text: 'Keterangan', value: 'proses'},
        ],
      headers4: [
          {
            text: 'Kdcab', 
            value: 'kdcab',
            fixed: true
          },
          {
            text: 'Kdtk', 
            value: 'kdtk',
            fixed: true
          },
          {
            text: 'Nama', 
            value: 'nama'
          },
          {
            text: 'Nama Mgr', 
            value: 'nama_mgr'
          },
          {
            text: 'Nama Spv', 
            value: 'nama_spv'
          },
          {
            text: 'Tanggal Buka', 
            value: 'tglbuka'
          }, 
          {
            text: 'Keterangan', 
            value: 'proses_dt'
          },
        ],
      headers3: [
          {
            text: 'Cabang', 
            value: 'nama_cabang',
            fixed: true
          },
          {
            text: 'Nama File', 
            value: 'nama_file',
            fixed: true
          },
          {
            text: 'Extract File', 
            value: 'proses_extract',
            fixed: true
          },
          {
            text: 'Load Data', 
            value: 'proses_load'
          },
          {
            text: 'Pre Summary', 
            value: 'pre_summary'
          },
          {
            text: 'Summary', 
            value: 'summary'
          },
          {
            text: 'Upload HO', 
            value: 'upload_ho'
          },  
        ],
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    }, 
    getTokoAktif() {
      return this.$store.getters.tokoAktif;
    }, 
    getlistrekapIRISfix() {
      return this.$store.getters.listRekapHarIRIS;
    }, 
    getTokoLibur() {
      return this.$store.getters.tokoLR;
    }, 
    getTokoTs() {
      return this.$store.getters.tokoTS;
    }, 
    getlistLR() {
      return this.$store.getters.listLR;
    }, 
    getlistTS() {
      return this.$store.getters.listTS;
    }, 
    getbelumHareis() {
      return this.$store.getters.belumHareis;
    },  
    getsudahHareis() {
      return this.$store.getters.sudahHareis;
    },   
    getbelumHareisDT() {
      return this.$store.getters.belumHareisDT;
    },  
    getsudahHareisDT() {
      return this.$store.getters.sudahHareisDT;
    },   
    listdata() { 
      return this.$store.getters.listDataMonitGabIris;
    },  
    listperfile() { 
      return this.$store.getters.listDataPerfileGabIris;
    },  
    listrekapbelum() { 
      return this.$store.getters.rekapBelumProsesIris;
    },  
    listrekapbelumDT() { 
      return this.$store.getters.rekapBelumProsesIrisDT;
    },  
    getCabang() {
      return this.$store.getters.listCabangHareis;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangHareis.length === this.$store.getters.listCabangHareis.length
    },
    pilihSomeCabang () {
        return this.listCabangHareis.length > 0 && !this.$store.getters.listCabangHareis.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
  },
  methods: {  
      showEditDialogFlagToko(ikdcab,ikdtk,inama) { 
          this.itemKdcab = ikdcab
          this.itemKdtk = ikdtk
          this.itemNama = inama
          this.dialogEditFlagToko = !this.dialogEditFlagToko
      },
      FlagLibur(){
           let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
          const sendpost = {
            kdcab: this.itemKdcab,
            kdtk: this.itemKdtk,
            nama: this.itemNama,
            tanggal: this.dateAwal
          }
          this.$store.dispatch("flagTokoLibur", sendpost)
          .then(() => { 
            this.dialogEditFlagToko = false
            this.handleSubmitHareis()
            loading.hide()
          })
          .catch(() => {
            this.dialogEditFlagToko = false
            loading.hide()
          });  
      },
      handleSubmitHareis(){ 
        if(this.$refs.form.validate()){
           let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
          const a = this.listCabangHareis.map((item)=>{ 
            return item.id === undefined ? item : item.id
          })  
          const datanya = {
              kdcab:  a.toString(),
              tanggal: this.dateAwal,
          };
          this.$store.dispatch("getHariris", datanya).then(()=> { 
            loading.hide()
          }).catch(() => {
            loading.hide()
          })
        }
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangHareis = []
            } else {
              this.listCabangHareis = this.$store.getters.listCabangHareis.slice()
            }
          })
        },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    let loading = this.$loading.show({
      color:"#f09000",
      container: this.fullPage ? null : this.$refs.formContainer,
      backgroundColor: "#525252",
      loader: 'dots',
      canCancel: true, 
      onCancel: this.onCancel,
    })
    this.$store.dispatch("getCabangHareis", { kdcab : dataUser.cover}).then(()=> { 
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