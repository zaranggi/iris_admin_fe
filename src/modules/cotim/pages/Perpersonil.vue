<template> 

<v-sheet elevation="10"> 
        <v-card flat>  
          <v-card-text> 
              <v-form @submit.prevent="handleSubmitCoPerpersonil">
                  <v-flex lg12 md12 sm12>
                    <v-row dense >   
                        <v-col cols="12" lg="6">
                           <v-autocomplete
                                class="ma-1 pa-1 mx-4"
                                prepend-icon="mdi-home-map-marker"
                                v-model="nama_personil"
                                multiple small-chips 
                                clearable
                                deletable-chips
                                dense
                                item-text="nama"
                                item-value="nama"
                                :items="getPersonil"
                                :rules="[v => !!v || 'Personil Harus diisi']"
                                label="Pilih Personil"
                                required
                              > 
                              </v-autocomplete>  
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
                 
              <v-spacer></v-spacer> 
                <v-card>   
                  <v-card-text>
                     
                    <ve-table 
                        fixed-header
                        :border-x="true" 
                        :border-y="true"
                        :columns="headersDetailPerpersonil"
                        :table-data="listdataPersonil" 
                        :cell-style-option="cellStyleOption"
                        :footer-data="footerDataPersonil"
                        :cell-span-option="cellSpanOption"
                        class="dataTable"  
                    /> 
                    <div v-show="listdataPersonil.length === 0" class="empty-data">Data Empty.</div>

                   
                     <v-layout style="padding-top:56px">
                        <v-data-table :class="['word-wrap']" :headers="headers_co_detail_personil" :items="getlistCoPersonildetail" mobile-breakpoint="0">
                        </v-data-table> 
                      </v-layout> 

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
//import dateFormat from 'dateformat';
export default { 
  data() {
    return {  
      listPersonil: "",
      absolute:true,  
      timeoutPesan:3000,  
      snackbar: false,
      pesan: "", 
      search: "", 
      tanggal:"",  
      nama_personil:"",   
      startRowIndex: 0, 
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
       
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      dateBulan: new Date().toISOString().substr(0, 7),
      timeoutId: 0, 
      headers_co_detail_personil: [  
          {text: 'Diambil Oleh', value: 'diambil_oleh'},
          {text: 'No CO', value: 'no_komplain'},
          {text: 'Cabang', value: 'cabang_lokasi_asal'},
          {text: 'Toko', value: 'kode_lokasi_asal'},
          {text: 'Tgl Buat', value: 'tanggal_buat'},
          {text: 'Tgl Ambil', value: 'tanggal_ambil'},
          {text: 'Tgl Selesai', value: 'tanggal_selesai'},
          {text: 'Durasi', value: 'durasi_selesai'},
          {text: 'Deskripsi', value: 'deskripsi'},
          {text: 'Solusi', value: 'solusi'}
      ],
      headersDetailPerpersonil:[
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
    listdataPersonil() { 
      return this.$store.getters.listdataPersonil;
    },    
    getlistCoPersonildetail() { 
      return this.$store.getters.listCoPersonildetail;
    },    
    getPersonil() { 
      return this.$store.getters.listPersonil;
    },  
    footerDataPersonil() { 
      return this.$store.getters.footerDataPersonil;
    },  
     
    
  },
  methods: { 
       
      
      handleSubmitCoPerpersonil(){
         if(this.dateAwal.length === 0){
              this.overlay = false
              this.pesan = "Silahkan Pilih Tanggal Terlebih Dahulu!";
              this.snackbar = true;   
         }else{
            this.overlay = true 
            this.pesan = "Proses Data...";
            this.snackbar = true;   
             
            const datanya = {   
                tanggal: this.dateAwal, 
                nama_personil: this.nama_personil.toString(),
            };
            
            this.$store.dispatch("getCoPersonil", datanya).then( () =>{    
                this.tampil_personil = true
                this.overlay = false
            }).catch(() => { 
              this.tampil_personil = false
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

    this.$store.dispatch("getPersonil", { kdcab : dataUser.cover}).then(()=> { 
           this.overlay = false
    }).catch(() => {
        this.overlay = false
    });

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
     .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
}
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
 
 