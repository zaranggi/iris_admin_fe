<template> 

<v-sheet elevation="10"> 
        <v-card flat>  
          <v-card-text> 
              <v-form @submit.prevent="handleSubmitCotim">
                  <v-flex lg12 md12 sm12>
                    <v-row dense >   
                        <v-col cols="12" lg="4">
                          <v-select
                              class="ma-1 pa-1 mx-4"
                              v-model="shift"
                              :items="items"
                              item-text="nama_shift"
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
                        </v-col>
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
                                label="Tanggal"
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
                 <v-card >
                <v-container>
                  <v-row dense>
                    <v-col cols="4">
                      <v-card class="mx-auto green darken-1 rounded-lg" elevation="10" >
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Baru </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> <v-icon large class="white--text">mdi mdi-trending-up</v-icon>  
                              {{ this.totalcobaru }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto amber darken-2 rounded-lg" elevation="10" >
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Inprogress </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> <v-icon large class="white--text">mdi mdi-trending-up</v-icon>   {{ this.totalcoinprogress }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto purple darken-2 rounded-lg" elevation="10" >
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> Total CO </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> {{ this.totalco }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-spacer></v-spacer>
                
                <v-card class="mx-auto" v-show="tampil"> 
                  <v-card-text>
                  <div id="chart1">
                     <apexchart  ref="myChart2" type="line" height="400"
                        :options="chartOptions" :series="series2"
                      ></apexchart>
                      
                    </div> 
                  </v-card-text>   
                </v-card>
                <v-card class="mx-auto" v-show="tampil">   
                  <v-card-text>
                    <ve-table 
                        fixed-header
                        :border-x="true" 
                        :border-y="true"
                        :columns="headersDetail"
                        :table-data="listdata" 
                        :cell-style-option="cellStyleOption"
                        :footer-data="footerData"
                        :cell-span-option="cellSpanOption"
                        class="dataTable"  
                        :max-height="450"    
                    /> 
                    <div v-show="listdata.length === 0" class="empty-data">Data Empty.</div>
                  </v-card-text> 

                  <v-card-text>
                    <ve-table 
                        fixed-header
                        :border-x="true" 
                        :border-y="true"
                        :columns="headersDetail2"
                        :table-data="listdata2" 
                        :cell-style-option="cellStyleOption2"
                        :footer-data="footerData2"
                        :cell-span-option="cellSpanOption2"
                        class="dataTable"  
                        :max-height="450"    
                    /> 
                    <div v-show="listdata2.length === 0" class="empty-data">Data Empty.</div>
                  </v-card-text> 

                 
                </v-card>
          </v-card-text>
        </v-card>
      
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay> 
  </v-sheet> 

</template>   
<script>
import dateFormat from 'dateformat';
export default { 
  data() {
    return { 
      absolute:true,
      tab:null,
      tampil:false, 
      timeoutPesan:3000, 
      keterangan: "", 
      snackbar: false,
      pesan: "", 
      search: "", 
      tanggal:"", 
      shift:"",  
      series:[],
      series2:[],
      series3: [],
      startRowIndex: 0,
      sortOption: {
                    sortChange: (params) => { 
                        this.sortChange(params);
                    },
                },
      cellStyleOption: {
          headerCellClass: ({ rowIndex }) => {
            if (rowIndex === 0 || rowIndex === 1) {
              return "table-header-cell-class";
            }
          },
         footerCellClass: () => {
             
              return "table-footer-cell-class1";
            
          },
        },
        
      cellStyleOption2: {
          headerCellClass: ({ rowIndex }) => {
            if (rowIndex === 0 || rowIndex === 1) {
              return "table-header-cell-class";
            }
          },
         footerCellClass: () => {
             
              return "table-footer-cell-class1";
            
          },
        },
      cellSpanOption: {
        footerCellSpan: this.footerCellSpan,
      },
      cellSpanOption2: {
        footerCellSpan: this.footerCellSpan,
      },
      items:[ { nama_shift : 'Shift 1: 06:00 - 15:00', id: 'S1'},
              { nama_shift : 'Shift 2 A: 15:00 - 00:00', id: 'S2A'},
              { nama_shift : 'Shift 2 B: 14:00 - 23:00', id: 'S2B'},
              { nama_shift : 'Shift 3: 23:00 - 08:00',id: 'S3'},
              { nama_shift : 'Semua Shift', id: 'All'}
            ],
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      dateBulan: new Date().toISOString().substr(0, 7),
      timeoutId: 0, 
      
      headersDetail:[
        {
                field: "rowIndex",
                key: "a",
                title: "#",
                width: 30,
                fixed: "center",
                renderBodyCell: this.renderRowIndex
        },
        {field: "diambil_oleh" , key: "diambil_oleh", title: "Nama",  align: "left"},
        
        {title: "CO",  align: "center",
          children: [
              {field: "t_inprogress" , key: "t_inprogress", title: "Inprogress",  align: "center",
                renderBodyCell: ({ row, column}) => {
                    const cellData = row[column.field];
                    if(cellData === 0){
                      return (
                            <span
                                class="skill-span"
                                style={
                                   "background-color:#d8899c; text-align: center;"
                                }
                            >
                                {cellData}
                            </span>
                        );
                    } 
                    else{
                      return (
                            <span
                                class="skill-span"
                                style={
                                    "background-color:#38eb62" 
                                }
                            >
                                {cellData}
                            </span>
                        );
                    }
                       
                    
                }
              },
              {field: "t_co" , key: "t_co", title: "1D", align: "center"},
              {field: "t_co_month" , key: "t_co_month", title: "1 Month",align: "center"},
          ]
        },
        
        {
          title: "DURASI SELESAI",  align: "center",
          children: [
              {field: "t_durasi" , key: "t_durasi", title: "Total", align: "center"},
              {field: "avg_durasi" , key: "avg_durasi", title: "AVG Per-Co",align: "center"},
              {field: "min_selesai" , key: "min_selesai", title: "Start Selesai",align: "center"},
              {field: "max_selesai" , key: "max_selesai", title: "Last Selesai",align: "center"}
            ]
        },
       
        
      ], 
      headersDetail2:[
        {
                field: "rowIndex",
                key: "a",
                title: "#",
                width: 30,
                fixed: "center",
                renderBodyCell: this.renderRowIndex
        },
        {field: "diambil_oleh" , key: "diambil_oleh", title: "Nama",  align: "left"},
        
        {title: "CO",  align: "center",
          children: [
              {field: "t_inprogress" , key: "t_inprogress", title: "Inprogress",  align: "center",
                renderBodyCell: ({ row, column}) => {
                    const cellData = row[column.field];
                    if(cellData === 0){
                      return (
                            <span
                                class="skill-span"
                                style={
                                   "background-color:#d8899c; text-align: center;"
                                }
                            >
                                {cellData}
                            </span>
                        );
                    } 
                    else{
                      return (
                            <span
                                class="skill-span"
                                style={
                                    "background-color:#38eb62" 
                                }
                            >
                                {cellData}
                            </span>
                        );
                    }
                       
                    
                }
              },
              {field: "t_co" , key: "t_co", title: "1D", align: "center"},
              {field: "t_co_month" , key: "t_co_month", title: "1 Month",align: "center"},
          ]
        },
        
        {
          title: "DURASI SELESAI",  align: "center",
          children: [
              {field: "t_durasi" , key: "t_durasi", title: "Total", align: "center"},
              {field: "avg_durasi" , key: "avg_durasi", title: "AVG Per-Co",align: "center"},
              {field: "min_selesai" , key: "min_selesai", title: "Start Selesai",align: "center"},
              {field: "max_selesai" , key: "max_selesai", title: "Last Selesai",align: "center"}
            ]
        },
        
      ],  
    } 
  }, 
  computed: { 
    computeTanggal() {
      return this.dateAwal;
    },    
    listdata() { 
      return this.$store.getters.cotim;
    },   
    listdata2() { 
      return this.$store.getters.cotim2;
    },   
     
    footerData() { 
      return this.$store.getters.footerData;
    }, 
    footerData2() { 
      return this.$store.getters.footerData2;
    },  
    barcotim() { 
      return this.$store.getters.barcotim;
    },  
    coperjam() { 
      return this.$store.getters.coperjam;
    },   
    sesuaisla() { 
      return this.$store.getters.sesuaisla;
    }, 
    lewatsla() { 
      return this.$store.getters.lewatsla;
    }, 
    totalcobaru() { 
      return this.$store.getters.totalcobaru;
    },    
    totalco() { 
      return this.$store.getters.totalco;
    },    
    totalcoinprogress() { 
      return this.$store.getters.totalcoinprogress;
    },    
    
    cosekarang() { 
      return this.$store.getters.cosekarang;
    },
    chartOptions() {
     return ({
       chart: {
              height: 400,
              type: 'line', 
              toolbar: {
                show: true
              },
            },
            theme: {
              palette: "palette8",
            },            
            
            title: {
              text: 'Tren Complaint Online per Jam',
              align: 'center'
            },
            subtitle: {
              
                text: "Tanggal : " +  dateFormat('yyyy-mm-dd') ,
                align: 'center',
                style: {
                   floating: true
                },
            },
            animations: {
              enabled: true,
              easing: 'linear',
              speed: 2000,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            },
            dropShadow: {
              enabled: true,
              opacity: 0.3,
              blur: 5,
              left: -7,
              top: 22
            },
            annotations: {
              xaxis: [ {
                x: 0,
                x2: 6,
                fillColor: '#3381f5',
                opacity: 0.2,
                label: {
                  borderColor: '#775DD0',
                  style: {
                    color: '#fff',
                    background: '#775DD0',
                  },
                  text: 'Shift 3',
                }
              },
               {
                x: 6,
                x2: 15,
                fillColor: '#04bf62',
                opacity: 0.2,
                label: {
                  borderColor: '#B3F7CA',
                  style: {
                    fontSize: '10px',
                    color: '#fff',
                    background: '#04bf62',
                  },
                  offsetY: -10,
                  text: 'Shift 1',
                }
              },
               {
                x: 15,
                x2: 24,
                fillColor: '#eb9b07',
                opacity: 0.2,
                label: {
                  borderColor: '#eb9b07',
                  style: {
                    fontSize: '10px',
                    color: '#fff',
                    background: '#eb9b07',
                  },
                  offsetY: -10,
                  text: 'Shift 2',
                }
              }], 
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  colors: ['#fa3c62']
                },
                background: {
                  enabled: true,
                  foreColor: '#fff',
                  borderRadius: 4,
                  padding: 5,
                  opacity: 1,
                  borderWidth: 1, 
                  borderColor: '#fff'
                }, 
                offsetX: 0,
                dropShadow: {
                  enabled: true
                }
            }, 
            stroke: {
              curve: 'smooth',
              width: 3,
              colors: '#7f09ed'
            },
            grid: {
              borderColor: '#e7e7e7',
              padding: {
                right: 30,
                left: 20
              }
            },
            markers: {
              size: 0,
              hover: {
                size: 0
              }
            },
            xaxis: {
               type: "time",
               title: {
                text: 'Jam'
              },
            },
            yaxis: {
              title: {
                text: 'Total CO'
              },
            }, 
            tooltip: {
              theme: 'dark',
              x: {
                show: true
              },
              y: {
                title: {
                   formatter: function () {
                      return 'Total CO:'
                   },
                }
              }
            },
    })
    }, 
     
    
  },
  methods: { 
      
      handleSubmitCotim(){
         if(this.dateAwal.length === 0 || this.shift.length === 0){
              this.overlay = false
              this.pesan = "Silahkan Pilih Shift dan Tanggal Terlebih Dahulu!";
              this.snackbar = true;   
         }else{
            this.overlay = true 
            this.pesan = "Proses Data...";
            this.snackbar = true;   
            
            const kota = this.$store.getters.listCabangCotim.map((item)=>{ 
                    
                  return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
            })  

            let dataUser = this.$store.getters.dataUsers
            const datanya = {  
                kdcab:  kota.toString(),
                kode_cabang: dataUser.kode_cabang,
                tanggal: this.dateAwal, 
                shift: this.shift,
            };
            
            this.$store.dispatch("getCotim", datanya).then( () =>{                    
                const xperjam = [{ data: this.coperjam.map((r)=> {
                    return r
                  }) 
                }]    
                this.$refs.myChart2.updateSeries(xperjam) 
                this.tampil = true
                this.overlay = false
            }).catch(() => { 
              this.tampil = false
              this.overlay = false
            })    
         }
          
      },  
       
      renderRowIndex({ rowIndex }) {
          return <span>{rowIndex + this.startRowIndex + 1}</span>;
      },
      footerCellSpan({ column, rowIndex }) {
        if (rowIndex === 0) {
          if (column.field === "diambil_oleh") {
            return { 
              colspan: 1, 
              rowspan:1,
            };
          } 
        }
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
  .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
}
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
 
 