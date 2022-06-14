<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Analisa Complaint Online </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitCo">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="6" >
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangCo"
                    item-text="nama_cabang"
                    item-value="nama_cabang"
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
                        <v-icon :color="listCabangCo.length > 0 ? 'indigo darken-4' : ''">
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
                          label="Tanggal Awal"
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

                  <v-col cols="2" >
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
                          label="Tanggal Akhir"
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

      <v-card outlined class="mt-2"> 
        <v-card-text>   
           <div id="chart2">
            <apexchart  ref="myChart3" type="bar" height="400" 
              :options="chartoptons3" :series="series3"
            ></apexchart>
          </div> 
        </v-card-text>   
      </v-card>  

      <v-card outlined class="mt-2"> 
        <v-card-text>   
           <div id="chart2">
            <apexchart  ref="myChart" height="550" 
              :options="chartOptions" :series="series"
            ></apexchart>
          </div> 
        </v-card-text>   
      </v-card>  
      </v-card-text>

       

<v-dialog v-model="dialogDetailCabang">  
            <v-card class="mx-auto"> 
              <v-card-text>
                <ve-table 
                    fixed-header
                    :border-x="true" 
                    :border-y="true" 
                    :columns="headers"
                    :table-data="listdata" 
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498" 
                    :cell-selection-option="cellSelectionOption"
                    :event-custom-option="eventCustomOption"  
                    rowKeyFieldName="asal" 
                />
                <div v-show="listdata.length === 0" class="empty-data">Data Empty.</div>
              </v-card-text>  
              <v-card-actions>
                <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
              </v-card-actions>
            </v-card>  
    </v-dialog>  

    
<v-dialog v-model="dialogDetail">

      <v-sheet elevation="10">
    
        <v-tabs
          v-model="tabdetail"
          align-with-title
        >  
          <v-tabs-slider color="yellow"></v-tabs-slider> 
          <v-tab key="detail">
            Detail
          </v-tab>
          <v-tab key="catatan">
            Catatan SPV
          </v-tab>
        </v-tabs> 

        <v-tabs-items v-model="tabdetail">
          <v-tab-item key="detail">
            <v-card class="mx-auto"> 
              <v-card-text>
                <ve-table 
                    fixed-header
                    :border-x="true" 
                    :border-y="true" 
                    :max-height="350"   
                    :columns="headersDetail"
                    :table-data="listDetailCo"  
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498" 
                    :cell-selection-option="cellSelectionOption"
                    :event-custom-option="eventCustomOption"  
                    rowKeyFieldName="asal" 
                />
                <div v-show="listDetailCo.length === 0" class="empty-data">Data Empty.</div>
              </v-card-text>  
              <v-card-actions>
                <v-btn color="lime lighten-1" @click="dialogDetail = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item key="catatan">
            <v-card class="mx-auto"> 
              <v-card-text v-html="catatanCo"> 
              </v-card-text>  
              <v-card-actions>
                <v-btn color="lime lighten-1" @click="dialogDetail = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet> 
    </v-dialog>   


      <v-dialog v-model="dialogAdd" max-width="650px">
        <v-card class="mx-auto">
          <v-card-title>
            Detail Masalah Cabang {{ this.cabanginputan }} 
          </v-card-title>
          <v-card-text> 
               <v-select
                  class="ma-1 pa-1 mx-4"
                  v-model="shift"
                  :items="items"
                  item-text="nama_jenis"
                  item-value="id"
                  label="Laporan Shift"
                  prepend-icon="mdi-clipboard-outline"  
                  chips
                  clearable
                  deletable-chips
                  dense 
                  small-chips 
                  required
                ></v-select>  
              <v-textarea
                class="ma-1 pa-1 mx-4"
                v-model="keterangan" 
                append-icon="mdi-text"
                filled
                auto-grow 
                label="Keterangan Masalah" 
              ></v-textarea> 
            
          </v-card-text>  
          <v-card-actions>
            <v-btn color="teal accent-3" @click="simpanKeterangan()">Simpan</v-btn>
            <v-btn color="amber accent-1" @click="dialogAdd = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog> 

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
     
    </v-card>  
</template>   
<script>
import { mapState, mapMutations } from "vuex";
import dateFormat from 'dateformat';
export default { 
  data() {
    return {
      absolute: true,
      tabdetail:null,
      datatable:[],
      cabanginputan:"",
      timeoutPesan:3000,
      dialogDetail: false,
      dialogDetailCabang:false,
      tanggal_detail:"",
      cabangdetail:"",
      masalahdetail:"",
      dialogAdd: false,
      tanggal_ket: "",
      asal_ket:"",
      keterangan: "", 
      snackbar: false,
      pesan: "", 
      shift: "", 
      search: "", 
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      dateAkh: new Date().toISOString().substr(0, 10),
      tanggal1: false, 
      tanggal2: false, 
      listCabangCo:"",
      pilihcabang:"", 
      enableColumnFixed: true,
      enableLoading: false,
      timeoutId: 0,
      headers:[], 
      items:[ { nama_jenis : 'Shift 1: 06:00 - 15:00', id: 'Shift 1'},
              { nama_jenis : 'Shift 2: 15:00 - 00:00', id: 'Shift 2'}
            ],
      headersDetail:[
        {field: "NOCO" , key: "NOCO", title: "NO COMPLAIN", width: 125, align: "center"},
        {field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 125, align: "center"},
        {field: "TOKO" , key: "TOKO", title: "TOKO", width: 250, align: "left"},
        {field: "DESKRIPSI" , key: "DESKRIPSI", title: "DESKRIPSI", align: "left"},
        {field: "SOLUSI" , key: "SOLUSI", title: "SOLUSI",align: "left"}
      ], 
      eventCustomOption: {         
        bodyCellEvents: ({ row,column }) => {
          return { 
            click: () => {    
              if( column["key"] != "TANGGAL" && column["key"] != "MASALAH" && column["key"] != "expand"){
                this.timeoutId++;
                if(this.timeoutId === 1)
                { 
                  var ini = this
                  setTimeout(function() {
                      switch(ini.timeoutId) {     // check the event type
                            case 1:
                              ini.showDetailCO(row["TANGGAL"], column["key"], row["MASALAH"])
                              break;
                            default:
                              ini.showAddKeterangan(row["TANGGAL"], column["key"]+"|"+row["MASALAH"])
                      }
                      ini.timeoutId = 0;               // reset the first click
                  }, 200);  
                } 
              }
            } 
          };
        }, 
      },
      cellSelectionOption: {
          // default true
          enable: true,
        },
      sortOption: {
                sortChange: params => {
                    this.sortChange(params);
                }
            }, 
      windowWidth: window.innerWidth, 
      expandOption: {
                  render: ({ row }) => { 
                    if(row["keterangan_fix"].length > 0){
                      var a = row["keterangan_fix"] 
                        return (
                            <p>
                              <span style="font-weight:bold;"> Detail Masalah: </span><br/>
                            <span class="text-caption">  {a}  </span>
                            </p>
                        );
                    }else{
                      return (
                            <p>
                              <span style="font-weight:bold;"> Detail Masalah: </span><br/> 
                            </p>
                        );
                    }
                    
                  }
              },
      masalah:[],    
      series:[], 
      series3:[],
      series2:[], 
           
      
    } 
  }, 
  computed: {
    ...mapState(["Sidebar_drawer"]),
    computeTanggal() {
      return this.dateAwal;
    },   
    catatanCo() { 
      return this.$store.getters.catatanCo;
    },   
    chartOptions() {
        return ({
          chart: {
              height: 450,
              type: 'heatmap',
              selection: {
                enabled: true
              }, 
              toolbar: { 
                show: true,
                offsetX: 0,
                offsetY: 0,
                autoSelected: 'zoom',
                export: {
                  csv: {
                    filename: undefined,
                    columnDelimiter: ',',
                    headerCategory: 'category',
                    headerValue: 'value',
                    dateFormatter(timestamp) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  svg: {
                    filename: undefined,
                  },
                  png: {
                    filename: undefined,
                  }
                },  
              },
              brush: {
                  autoScaleYaxis: true
              },
              events: { 
                dataPointSelection: (event, chartContext, config) => {
                    var xtgl = config.w.config.series[config.seriesIndex].data[config.dataPointIndex].x
                    var kateg = config.w.config.series[config.seriesIndex].data[config.dataPointIndex].y
                    this.detailCabang(xtgl,kateg)
                }  
              } 
            },
            plotOptions: {
              heatmap: {
                shadeIntensity: 0.5,
                radius: 5,
                colorScale: {
                  ranges: [
                    {
                      from: 0,
                      to: 10,
                      name: 'Rendah',
                      color: '#71eb34'
                    }, 
                    {
                      from: 11,
                      to: 100,
                      name: 'Sedang',
                      color: '#ebd034'
                    }, 
                    {
                      from: 101,
                      to: 250,
                      name: 'Tinggi',
                      color: '#f5790c'
                    }, 
                    {
                      from: 251,
                      to:900,
                      name: 'Extreme',
                      color: '#ed0037'
                    }, 
                  ]
                }
              }
            },
            title: {
                text: "Tren Kategori Masalah Per Tanggal",
                align: 'center', 
                style: {
                   floating: true
                },
            }, 
            dataLabels: {
              enabled: true,
              style: { 
                  fontWeight: 'bold',
                  colors: ['#474747']
              },
            }, 
            //colors: ["#ff2bd5","#ffe000","#a2ff03","#9005fa","#02fae9","#0b76bd","#00e357","#d49c02","#ff0000"], 
            grid: {
              padding: {
                right: 0
              }
            },
            xaxis: {
                categories: [],
                labels: {
                  show: true,
                  title: {
                    text: 'Tanggal',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-title',
                    },
                  }
                }
            },
            legend: {
              show: true,
              position:'right'
            },
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false
            },
            tooltip: {  
              theme: 'dark', 
            },  
      })
    },
    
    chartoptons3(){
      return ({
            chart: {
              type: 'bar', 
            },
            plotOptions: {
              bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: 'bottom'
                },
              }
            },
            colors: ["#fa2a6c","#ffe000","#3af2af","#765ffa","#f7a539","#ff5cfa","#4ae30e","#ff7717","#e1ff59","#8ee4fa","#f73939"
            ], 
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.8,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.3,
                opacityTo: 1,
                stops: [0,  50, 100],
                colorStops: []
              }
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  colors: ['#000000']
                },
                background: {
                  enabled: true,
                  foreColor: '#fff',
                  borderRadius: 4,
                  padding: 1,
                  opacity: 0.5,
                  borderWidth: 1, 
                },
                formatter: function (val, opt) {
                  return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                },
                offsetX: 0,
                dropShadow: {
                  enabled: true
                }
            },
            stroke: {
              width: 1,
              colors: ['#FFF']
            }, 
            yaxis: {
              labels: {
                show: false
              },
              decimalsInFloat: 2,
              ticks: {
                precision: 0,
                beginAtZero: true,
              },
            }, 
            title: {
               text: 'Jumlah Co Per Kategori Masalah',
                align: 'center', 
                style: {
                   floating: true
                },
            },  
            subtitle: {
               text: "Periode : " +  dateFormat(String(this.dateAwal), 'yyyy-mm-dd')  + " s/d " + dateFormat(String(this.dateAkh) , 'yyyy-mm-dd'),
                align: 'center',
                style: {
                   floating: true
                },
            },
            tooltip: {
              theme: 'dark',
              x: {
                show: false
              },
              y: {
                title: {
                   formatter: function () {
                      return ''
                   },
                }
              }
            }
      })
    },
    computeTanggal2() {
      return this.dateAkh;
    },  
    listDetailCo() { 
      return this.$store.getters.detailco;
    }, 
    listdata() { 
      return this.$store.getters.datatable;
    }, 
    loading() {
      return this.$store.getters.loadingco;
    },    
    myCoseries() { 
      return this.$store.getters.coseries;
    },   
    myCoPermasalah() { 
      return this.$store.getters.permasalah;
    },    
    getCabang() {
      return this.$store.getters.listCabangCo;
    }, 
    pilihAllCabang () {
        return this.listCabangCo.length === this.$store.getters.listCabangCo.length
    },
    pilihSomeCabang () {
        return this.listCabangCo.length > 0 && !this.$store.getters.listCabangCo.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
  },
  methods: { 
       ...mapMutations({
        setSidebarDrawer: "SET_SIDEBAR_DRAWER"
      }),
      handleSubmitCo(){
        this.overlay = true
        if(this.listCabangCo.length === 0){
              this.overlay = false
              this.pesan = "Silahkan Pilih Cabang Terlebih Dahulu!";
              this.snackbar = true;   
        }else if(this.dateAwal.substr(0,7) != this.dateAkh.substr(0,7)){
              this.overlay = false
              this.pesan = "Silahkan Pilih Periode Tanggal yang Sama!";
              this.snackbar = true;   
        }else{
          
            this.pesan = "Proses Data...";
            this.snackbar = true;   

            const a = this.listCabangCo.map((item)=>{ 
            
              return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
            })  
            const datanya = {
                kdcab:  a.toString(),
                tanggal1: this.dateAwal,
                tanggal2: this.dateAkh,
            };
            this.pilihcabang = a.toString()
            this.$store.dispatch("getCo", datanya).then( () =>{  
            
              const x = this.myCoseries.map((item)=>{ 
                return {
                  name: `${item.name}`, 
                  data: item.data.map((item) =>{ 
                    return item
                  })
                }
              }) 
              const xx = [{ data: this.myCoPermasalah.map((r)=> {
                  return r
                }) 
              }] 
               
              this.$refs.myChart.updateSeries(x)
              //this.$refs.myChart2.updateSeries(x)
              this.$refs.myChart3.updateSeries(xx)
              this.datatable= []
              this.headers = []
              this.overlay = false

          }).catch((e) => {
            console.log(e)
            this.overlay = false
          })
        }
      },
      simpanKeterangan () { 
        if(this.shift.length === 0 || this.keterangan.length === 0){
                this.pesan = "Shift dan Keterangan Harus Diisi";
                this.snackbar = true;              
        }else{
          this.dialogAdd = false
          this.overlay = true
          let dataUser = this.$store.getters.dataUsers
            const datanya = {
              tanggal_ket:  this.tanggal_ket,
              asal_ket:  this.asal_ket,
              keterangan: this.keterangan,
              shift: this.shift,
              nama_user: dataUser.nama
            }; 
            this.$store
              .dispatch("simpanKeterangan", datanya)
              .then(() => {
                this.dialogAdd = false
                this.overlay = false
                this.pesan = "Update Data Berhasil";
                this.keterangan = ""
                this.shift = ""
                this.snackbar = true;              
                this.detailCabang(this.tanggal_ket)  
              })
              .catch((e) => {
                console.log(e)
                this.pesan = "Maaf Input Data Gagal";
                this.dialogAdd = false
                this.snackbar = true;
                this.overlay = false
              }); 
        }
      },
      showDetailCO(tanggal,cabang,masalah) {
        this.tanggal_detail = tanggal
        this.cabangdetail = cabang
        this.masalahdetail = masalah
        this.dialogDetail = !this.dialogDetail
         const payload = {
            kdcab: cabang,
            tanggal: tanggal,
            masalah: masalah,
          }; 
        this.$store.dispatch("getDetailCo", payload).then( () =>{  
        })
      },
      showAddKeterangan(tanggal,asal) {
        this.tanggal_ket = tanggal
        this.asal_ket = asal
        this.cabanginputan = asal.split("|")[0]
        this.dialogAdd = !this.dialogAdd
      },
      detailCabang (tanggal,kateg) {
          this.overlay = true 
          this.pesan = "Proses Data...";
          this.snackbar = true;
          const dataPercabang = {
            kdcab:  this.pilihcabang.replace(/,/g,"','"),
            tanggal: tanggal,
            kateg: kateg,
          };
          
          this.$store.dispatch("getPerCabang", dataPercabang).then( () =>{  
                     
            var a = [{field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 125, align: "center",fixed: "left"},
                {field: "MASALAH" , key: "MASALAH",title: "MASALAH", align: "left", width: 275,fixed: "left"}]
            var b = this.pilihcabang.split(",") 
            for(const r of b){
              a.push({
                field: r , key: r, title: r, width: 100,
                renderBodyCell: ({ row, column }) => {
                  const text = row[column.field];
                  //const warna = row[`${column.field}_r`] === 1 ? "#C14242" : "#FFFFFF"
                  if(row[`${column.field}_r`] === 1){
                        return (
                            <span
                                class="skill-span"
                                style="background-color:#C14242">
                                {text}
                            </span>
                        );
                  }else{
                        return (
                            <span
                                style="color:rgb(167, 161, 161)">
                                {text}
                            </span>
                        );
                  } 
                                                
                },
              })
            } 
            this.headers = a 
            this.overlay = false
            this.dialogDetailCabang = !this.dialogDetailCabang
          }).catch(() => {
            this.overlay = false
            this.dialogDetailCabang = false
          })

      },
        closeDialog(){ 
        this.detailcoDashboard = []
        this.tabdetail = null
        this.dialogDetailCabang = false 
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangCo = []
            } else {
              this.listCabangCo = this.$store.getters.listCabangCo.slice()
            }
          })
      },
      
        
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangCo", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
}   
  .skill-span {
    display: inline-block;
    margin-right: 5px;
    padding: 3px 8px;
    border-radius: 4px;
    width: 50px;
    color: rgb(228, 228, 228);
}
  
table.ve-table-content tbody tr td {
  font-size: 8px;
}

</style>

<style lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>