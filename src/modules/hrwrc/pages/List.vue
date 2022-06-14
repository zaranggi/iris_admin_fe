<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Monitoring Data Harian WRC </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitHarwrc">
            <v-flex lg12 md12 sm12>
              <v-row dense > 
                 <v-col cols="7">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangHarwrc"
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
                        <v-icon :color="listCabangHarwrc.length > 0 ? 'indigo darken-4' : ''">
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
                
                <v-col cols="12" lg="2">
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
                           
                           {{ (this.getsudahHarwrc + this.getbelumHarwrc) | numeral('0,0') }}
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
                        <v-list-item-subtitle class="white--text">Sudah Proses</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getsudahHarwrc | numeral('0,0') }}
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
                        <v-list-item-subtitle class="white--text">Belum Proses</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-text>
                      <v-row align="center">
                        <v-col class="display-3 white--text" cols="12"> 
                          <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                          {{ this.getbelumHarwrc | numeral('0,0')}}
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
             <v-col cols="6" offset-md="3">
              <v-divider
                inset
              ></v-divider>
              
                <ve-table 
                    fixed-header
                    :border-x="true" 
                    :border-y="true" 
                    :columns="headers2"
                    :table-data="getlistrekapWrc"
                    :cell-style-option="cellStyleOption" 
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498"
                />
                
                <div v-show="getlistrekapWrc.length === 0" class="empty-data">Tidak Ada Data</div>

             </v-col>
          </v-row>
        </template>
        

        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Absensi All Toko
                      <v-flex lg12 md12 sm12>
                        <v-row dense > 
                           <v-col class="pa-2" md="4"> 
                              <download-excel
                                ref="donwloadResultQuery"
                                class= "button is-primary" 
                                :data="listdata" 
                                worksheet="Data" 
                                name="absensiharian.xls"
                                >
                                <v-btn color="secondary"  elevation="10">
                                  <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                                  XLS
                                </v-btn>
                              </download-excel>
                          </v-col>
                          <v-col class="pa-2" md="4" justify="end"> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" 
                  :loading="loading">
                    <template v-slot:[`item.no`]="{ index }">
                      {{ index + 1 }}
                    </template> 
                    
                    <template v-slot:[`item.proses_dt`]="{ item }">       
                      <v-chip v-if="item.proses_dt === 'Belum Proses'"  color="error" label>
                        {{ item.proses_dt}}
                      </v-chip>
                      <span v-else depressed>
                        {{ item.proses_dt}}
                      </span>                         
                    </template> 
                    
                    <template v-slot:[`item.proses_wt`]="{ item }">                        
                       <v-chip v-if="item.proses_wt === 'Belum Proses'"  color="error" label>
                        {{ item.proses_wt}}
                      </v-chip>
                      <span v-else depressed>
                        {{ item.proses_wt}}
                      </span>                                 
                    </template> 
                    <template v-slot:[`item.proses_st`]="{ item }">                        
                       <v-chip v-if="item.proses_st === 'Belum Proses'"  color="error" label>
                        {{ item.proses_st}}
                      </v-chip>
                      <span v-else depressed>
                        {{ item.proses_st}}
                      </span>                                 
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
      <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" indeterminate>
        </v-progress-circular>
      </v-overlay>
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
      search: "", 
      overlay: true,
      dateAwal: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0].substr(0, 10),  
      tanggal: false,
      listCabangHarwrc: "",
      windowWidth: window.innerWidth,  
      headers2: [
          {field: 'kdcab', key: "a", title: 'Kdcab', align:'center'},
          {field: 'total_toko', key: "c",  title: 'Total Toko', align:'center'},
          {field: 'sudah', key: "d",  title: 'Sudah Proses', align:'center'},
          {field: 'sudah_persen', key: "e", title: '%', align:'center'},
          {field: 'belum', key: "f", title: 'Belum Proses', align:'center'},
          {field: 'belum_persen',key: "g",  title: '%', align:'center'}
      ],
      headers: [
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
            text: 'DT', 
            value: 'proses_dt'
          },
          {
            text: 'WT', 
            value: 'proses_wt'
          },
          {
            text: 'ST', 
            value: 'proses_st'
          },
        ],
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },
    getlistrekapWrc(){
      return this.$store.getters.listRekapHarwrc;
    },
    loading() {
      return this.$store.getters.loadingharwrc;
    },   
    getbelumHarwrc() {
      return this.$store.getters.belumHarwrc;
    },  
    getsudahHarwrc() {
      return this.$store.getters.sudahHarwrc;
    },   
    listdata() { 
      return this.$store.getters.listDataHarwrc;
    },  
    getCabang() {
      return this.$store.getters.listCabangHarwrc;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangHarwrc.length === this.$store.getters.listCabangHarwrc.length
    },
    pilihSomeCabang () {
        return this.listCabangHarwrc.length > 0 && !this.$store.getters.listCabangHarwrc.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {  
      handleSubmitHarwrc(){
        this.overlay = true
        const a = this.listCabangHarwrc.map((item)=>{ 
          return item.id === undefined ? item : item.id
        })  
        const datanya = {
            kdcab: a.toString(),
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getHarwrc", datanya).then(()=> {
          this.overlay = false
        }).catch(() => {
          this.overlay = false
        })
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangHarwrc = []
            } else {
              this.listCabangHarwrc = this.$store.getters.listCabangHarwrc.slice()
            }
          })
        },
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangHarwrc", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 

  .v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 290px;
}
</style>

<style>
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