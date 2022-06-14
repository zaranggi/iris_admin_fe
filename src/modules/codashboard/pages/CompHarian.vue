<template>  
  <v-layout>
        <v-card fluid>
          <v-app-bar flat color="rgba(0, 0, 0, 0)"> 
            <v-spacer></v-spacer>
            <v-btn color="tosca" icon @click="loadawal()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text>   
                  <v-row dense>
                    <v-col cols="4">
                      <v-card class="mx-auto green darken-1 rounded-lg" elevation="10" 
                      @click.stop="showDetailCOKategori('OPEN')">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Baru </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text">mdi-new-box</v-icon>  
                              {{ this.t_co_baru }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto amber darken-2 rounded-lg" elevation="10" 
                      @click.stop="showDetailCOKategori('INPROGRESS')">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Inprogress </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text">mdi mdi-trending-up</v-icon>   
                                {{ this.t_co_inprogress }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto red accent-2 rounded-lg" elevation="10" 
                      @click.stop="showDetailCOKategori('REOPEN')">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Reopen </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text">mdi-alert-circle-outline</v-icon> 
                                {{ this.t_co_reopen }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto cyan accent-4 rounded-lg" elevation="10"
                      @click.stop="showDetailCOKategori('RESOLVED')" >
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Belum Ditutup </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text">mdi-clipboard-text</v-icon>  
                              {{ this.t_co_btutup }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card class="mx-auto teal lighten-1 rounded-lg" elevation="10" 
                       @click.stop="showDetailCOKategori('CLOSED')" >
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title class="headline white--text"> CO Sudah Ditutup </v-list-item-title>
                              <v-list-item-subtitle class="white--text">{{  new Date() | formatSekarang }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-text>
                            <v-row align="center">
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text">mdi-newspaper</v-icon>   {{ this.t_co_stutup }} </v-col> 
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
                              <v-col class="display-3 white--text" cols="12"> 
                                <v-icon large class="white--text"> mdi-google-analytics</v-icon> 
                                 {{ this.t_co_all }} </v-col> 
                            </v-row>
                          </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row> 
 
              <v-divider></v-divider>  
              
                <v-form @submit.prevent="handleSubmitCo">
                  <v-container>
                      <v-row dense > 
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
                              header-color="green lighten-1"
                              @input="tanggal = false" 
                            ></v-date-picker>
                          </v-menu>
                        </v-col> 

                          <v-col cols="3">
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
                                dense 
                                small-chips 
                                required
                              ></v-select>
                          </v-col> 

                          <v-col cols="5">
                            <v-select
                              class="ma-1 pa-1 mx-4"
                              prepend-icon="mdi-home-map-marker"
                              v-model="listCabangCoDasboard"
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
                                  <v-icon :color="listCabangCoDasboard.length > 0 ? 'indigo darken-4' : ''">
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
                      

                          <v-col cols="1" class="ma-1 pa-1 mx-4">
                            <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                              <v-icon left dark>
                                mdi-magnify
                              </v-icon>
                              Preview
                            </v-btn>
                          </v-col>     
                      
                      </v-row>
                    </v-container>
                 </v-form> 

                  <v-divider></v-divider>
 
                  <ve-table 
                      fixed-header
                      :border-x="true" 
                      :border-y="true" 
                      :columns="headers"
                      :table-data="listdata"
                      row-key-field-name="rowKey" 
                      row-hover-color="#2fc498"
                      row-click-color="#2fc498"
                      is-horizontal-resize 
                      :cell-selection-option="cellSelectionOption"
                      :cell-style-option="cellStyleOption"
                      :event-custom-option="eventCustomOption" 
                      :footer-data="footerDataDasboard"
                      rowKeyFieldName="asal" 
                  /> 
                  <div v-show="listdata.length === 0" class="empty-data">Data Empty.</div> 

                   <v-divider></v-divider>
                <v-row dense > 
                    <v-col cols="8" offset="2" >
                      <span class="headline white--text"> 
                        Trending Hari ini
                                  </span>
              
					<div
						style="
							height: 480px;
							position: relative;
							width: 100%;
						"
					>
						<div
							:style="(progressVisible && progress)
								? {
									filter: 'blur(8px)',
									opacity: 0.3,
									pointerEvents: 'none',
									transform: 'scale(0.7,0.7)',
								}
								: {}
							"
							style="
								bottom: 0;
								left: 0;
								position: absolute;
								right: 0;
								top: 0;
								transition-duration: 1s;
							"
						>
            <vue-word-cloud 
              :words="getwords"                        
              :font-size-ratio="1/20" 
              :progress.sync="progress"  
              :color="colorPick"
              :animation-duration="5000"
							:animation-easing="animationEasing"
							:animation-overlap="1/2"
							:enter-animation="enterAnimation"
              font-family="Anton"
              >
								<template v-slot="props">
									<v-tooltip top>
										<template v-slot:activator="{on}">
											<div
												style="cursor: pointer;"
												v-on="on"
												@click="onWordClick(props.word)"
											>{{ props.text }}</div>
										</template>
										<div
											style="text-align: center;"
										>{{ props.text }}<br/>({{ props.weight }})</div>
									</v-tooltip>
								</template>
							</vue-word-cloud>
						</div>
						<v-scale-transition>
							<v-progress-circular
								v-if="progressVisible && progress"
								:rotate="-90"
								:size="200"
								:value="(progress.completedWords / progress.totalWords) * 100"
								:width="20"
								class="v-no-animation"
								color="primary"
								style="
									bottom: 0;
									left: 0;
									margin: auto;
									position: absolute;
									right: 0;
									top: 0;
								"
							>{{ progress.completedWords }} of {{ progress.totalWords }}</v-progress-circular>
						</v-scale-transition>
					</div> 
                     
                    </v-col>
                </v-row>
                
          </v-card-text>
        </v-card>
      

     <v-dialog v-model="dialogAdd" max-width="650px">
        <v-card class="mx-auto">
          <v-card-title>
            Detail Masalah Cabang {{ this.cabanginputan }} 
          </v-card-title>
          <v-card-text> 
               <v-select
                  class="ma-1 pa-1 mx-4"
                  v-model="shift_ket"
                  :items="itemshift"
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
                    :columns="headersDetail"
                    :table-data="listDetailCo"
                    :scroll-width="980"
                    row-hover-color="#2fc498"
                    row-click-color="#2fc498"
                />
                <div v-show="listDetailCo.length === 0" class="empty-data">Data Empty.</div>
              </v-card-text>  
              <v-card-actions>
                <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item key="catatan">
            <v-card class="mx-auto"> 
              <v-card-text v-html="catatanDashboard"> 
              </v-card-text>  
              <v-card-actions>
                <v-btn color="lime lighten-1" @click="closeDialog()">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet> 
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

  </v-layout>
  
</template>

<script>

import Chance from 'chance';
import dateFormat from 'dateformat';
// Instantiate Chance so it can be used
var chance = new Chance();

export default { 
  data() {
    return {  
      animation: undefined,
      progress: undefined,
			progressVisible: true,
      fullPage: false,
      absolute:true,
      tab: null,  
      tabdetail:null,     
      dialogAdd: false,
      dialogDetail: false, 
      keterangan: "", 
      tanggal_ket: "",
      asal_ket:"",
      timeoutPesan:2000,  
      overlay:true,
      snackbar: false,
      pesan: "",   
      shift:"", 
      shift_ket:"", 
      cabanginputan:"",
      tanggal_detail:"",
      masalahdetail:"", 
      cabangdetail:"", 
      listCabangCoDasboard:"",
      tanggal: false,
      itemshift:[ { nama_jenis : 'Shift 1: 06:00 - 15:00', id: 'Shift 1'},
              { nama_jenis : 'Shift 2: 15:00 - 00:00', id: 'Shift 2'}
            ],  
      headers:[],  
       headersDetail:[
        {field: "NOCO" , key: "NOCO", title: "NO COMPLAIN", width: 125, align: "center"},
        {field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 125, align: "center"},
        {field: "TOKO" , key: "TOKO", title: "TOKO", width: 250, align: "left"},
        {field: "DESKRIPSI" , key: "DESKRIPSI", title: "DESKRIPSI", align: "left"},
        {field: "SOLUSI" , key: "SOLUSI", title: "SOLUSI",align: "left"},
        {field: "diambil_oleh" , key: "Diambil", title: "DIAMBIL OLEH",align: "left"},
        {field: "tanggal_ambil" , key: "tanggal_ambil", title: "TGL AMBIL",align: "left"}
      ], 
      timeoutId: 0,
      dateAwal: "",
      items:[ { nama_shift : 'Shift 1: 06:00 - 15:00', id: 'S1'},
            { nama_shift : 'Shift 2: 15:00 - 00:00', id: 'S2'},
            { nama_shift : 'Shift 3: 23:00 - 08:00',id: 'S3'},
            { nama_shift : 'Semua Shift', id: 'All'}
          ], 
      cellSelectionOption: { 
          enable: true,
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
      eventCustomOption: {         
        bodyCellEvents: ({ row,column }) => {
          return { 
            click: () => {    
              
              if( column["key"] != "TANGGAL" && column["key"] != "MASALAH" && column["key"] != "expand"){
                this.timeoutId++;
                if(this.timeoutId === 1)
                { 
                  var ini2 = this
                  setTimeout(function() {
                      switch(ini2.timeoutId) {     // check the event type
                            case 1:     
                              ini2.showDetailCO(row["TANGGAL"], column["key"], row["MASALAH"])
                              break;
                            default: 
                              ini2.showAddKeterangan(row["TANGGAL"], column["key"]+"|"+row["MASALAH"])
                      }
                      ini2.timeoutId = 0;               // reset the first click
                  }, 200);  
                } 
              } 
            } 
          };
        }, 
      }, 
      masalah:[], 
      animationItems: [
					{
						text: 'bounce',
						value: ['bounceIn', 'bounceOut'],
					},
					{
						text: 'fade',
						value: ['fadeIn', 'fadeOut'],
					},
					{
						text: 'flipX',
						value: ['flipInX', 'flipOutX'],
					},
					{
						text: 'flipY',
						value: ['flipInY', 'flipOutY'],
					},
					{
						text: 'rotate',
						value: ['rotateIn', 'rotateOut'],
					},
					{
						text: 'zoom',
						value: ['zoomIn', 'zoomOut'],
					},
			],
      animationEasingValues: [
					'ease',
					'linear',
					'ease-in',
					'ease-out',
					'ease-in-out',
					'cubic-bezier(0.1,0.7,1.0,0.1)',
				],
    } 
  },
  watch: {
			progress: function(currentProgress, previousProgress) {
				if (previousProgress) {
					this.progressVisible = false;
				}
			},
	},
  created: function() { 
			this.animation = chance.pickone(this.animationItems).value;
			this.animationEasing = chance.pickone(this.animationEasingValues);
		},
  computed: {  
    enterAnimation: function() {
				return [
					'animated',
					this.animation[0],
				]
					.map(function(value) {
						return 'animate__' + value;
					})
					.join(' ');
			},  
    colorPick(){
      var colors = ['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47'];
				return function() {
					return chance.pickone(colors);
				};
    },
    getwords(){
      return this.$store.getters.wordsCO;
    },
    computeTanggal() {
      return this.dateAwal;
    },      
    catatanDashboard() { 
      return this.$store.getters.catatanDashboard;
    },     
    listdata() { 
      return this.$store.getters.codashboardTable;
    },   
    listDetailCo() { 
      return this.$store.getters.detailcoDashboard;
    }, 
    t_co_baru() { 
      return this.$store.getters.t_co_baru;
    },    
    t_co_reopen() { 
      return this.$store.getters.t_co_reopen;
    },    
    t_co_inprogress() { 
      return this.$store.getters.t_co_inprogress;
    },    
    t_co_btutup() { 
      return this.$store.getters.t_co_btutup;
    },    
    t_co_stutup() { 
      return this.$store.getters.t_co_stutup;
    },    
    t_co_all() { 
      return this.$store.getters.t_co_all;
    },    
    footerDataDasboard() { 
      return this.$store.getters.footerDataDasboard;
    }, 
    getCabang() {
      return this.$store.getters.listCabangCoDasboard;
    }, 
    pilihAllCabang () {
        return this.listCabangCoDasboard.length === this.$store.getters.listCabangCoDasboard.length
    },
    pilihSomeCabang () {
        return this.listCabangCoDasboard.length > 0 && !this.$store.getters.listCabangCoDasboard.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
     
  }, 
  methods: { 
     
    onWordClick(word) {
				this.snackbarVisible = true;
				this.snackbarText = "Total :" + word[0];
			},
      closeDialog(){ 
        this.detailcoDashboard = []
        this.tabdetail = null
        this.dialogDetail = false 
      },
      
      handleSubmitCo(){
         if(this.shift.length === 0){ 
              this.pesan = "Silahkan Pilih Shift Terlebih Dahulu!";
              this.snackbar = true;   
         }else{
          let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });

            this.pesan = "Proses Data...";
            this.snackbar = true;   
            const kotas = this.listCabangCoDasboard.map((item)=>{ 
            
              return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
            })  
            const datanya = {
                kdcab:  kotas.toString(),  
                tanggal: this.dateAwal, 
                shift: this.shift,
            };
            this.$store.dispatch("getCoDashboard", datanya).then( () =>{   
                var a = [{field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 125, align: "center",fixed: "left"},
                  {field: "MASALAH" , key: "MASALAH",title: "MASALAH", align: "left", width: 250,fixed: "left"}
                ]
                
                kotas.map((r) => {
                  a.push({
                    field: r , key: r, title: r, width: 100,
                    renderBodyCell: ({ row, column }) => {
                      const text = row[column.field];
                      //const warna = row[`${column.field}_r`] === 1 ? "#C14242" : "#FFFFFF"
                      if(row[`${column.field}_r`] === 1){
                            return (
                                <span
                                    class="skill-span"
                                    style="background-color:#C14242; color:#ffff">
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
                }) 
                this.headers = a  
                loading.hide()
            }).catch(() => {  
              loading.hide()
            })    
         }
          
      }, 
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangCoDasboard = []
            } else {
              this.listCabangCoDasboard = this.$store.getters.listCabangCoDasboard.slice()
            }
          })
      },
      loadawal() {
          this.shift = ""
          this.tanggal = ""
          this.listCabangCoDasboard = []
          
         let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });

          this.pesan = "Proses Data...";
          this.snackbar = true;   
          let dataUser = this.$store.getters.dataUsers
    
          this.$store.dispatch("getCabangCoDashboard", { kdcab : dataUser.cover}).then(() =>{
                
                const kota = this.$store.getters.listCabangCoDasboard.map((item)=>{ 
                    
                  return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
                })  
                var xxtgl = ""
                this.dateAwal === "" ? xxtgl = dateFormat('yyyy-mm-dd') : xxtgl = this.dateAwal
                const datanya = {
                    kdcab:  kota.toString(),
                    tanggal: xxtgl,
                    shift: "All",
                }; 
                
                this.$store.dispatch("getCoDashboard", datanya).then( () =>{   
                  var ha = [{field: "TANGGAL" , key: "TANGGAL", title: "TANGGAL", width: 100, align: "center",fixed: "left"},
                      {field: "MASALAH" , key: "MASALAH",title: "MASALAH", align: "left", width: 200,fixed: "left"}
                  ]
                  
                  kota.map((r) => {
                      ha.push({
                      field: r , key: r, title: r,
                      renderBodyCell: ({ row, column }) => {
                        const text = row[column.field];
                        
                        //const warna = row[`${column.field}_r`] === 1 ? "#C14242" : "#FFFFFF"
                        if(row[`${column.field}_r`] === 1){
                              return (
                                  <span
                                      class="skill-span"
                                      style="background-color:#C14242;color:#ffff;">
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
                   
                  }) 
                  this.headers = ha 
                  //this.headersbulanan = habulanan 
                  loading.hide()
                }) 
              
              
          }).catch((e) => {  
            console.log(e)
            loading.hide()
          }) 
          
           
      },
       
      simpanKeterangan () { 
      if(this.shift_ket.length === 0 || this.keterangan.length === 0){
              this.pesan = "Shift dan Keterangan Harus Diisi";
              this.snackbar = true;              
      }else{
        this.dialogAdd = false
         let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });
        let dataUser = this.$store.getters.dataUsers
          const datanya = {
            tanggal_ket:  this.tanggal_ket,
            asal_ket:  this.asal_ket,
            keterangan: this.keterangan,
            shift: this.shift_ket,
            nama_user: dataUser.nama
          }; 
          this.$store
            .dispatch("simpanKeteranganDashboard", datanya)
            .then(() => {
              this.dialogAdd = false
              loading.hide()
              this.pesan = "Update Data Berhasil";
              this.keterangan = ""
              this.shift_ket = ""
              this.snackbar = true;              
              this.handleSubmitCo
            })
            .catch((e) => {
              console.log(e)
              this.pesan = "Maaf Input Data Gagal";
              this.dialogAdd = false
              this.snackbar = true;
              loading.hide()
            }); 
      }
    },
    showDetailCO(tanggal,cabang,masalah) {
      this.pesan = "Loading..."
      this.snackbar = true
       let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });     
      this.tanggal_detail = tanggal
      this.cabangdetail = cabang
      this.masalahdetail = masalah 
      
        const payload = {
          kdcab: cabang,
          tanggal: tanggal,
          masalah: masalah,
          shift: this.shift,
        }; 
      this.$store.dispatch("getDetailCoDashboard", payload).then( () =>{  
        this.dialogDetail = !this.dialogDetail
        loading.hide()
      }).catch(()=>{
        loading.hide()
      })
    },
    showDetailCOKategori(status_co) {
      this.pesan = "Loading..."
      this.snackbar = true
       let loading = this.$loading.show({ 
                    color:"#f09000",
                    container: this.fullPage ? null : this.$refs.formContainer,
                    backgroundColor: "#525252",
                    loader: 'dots', 
                    canCancel: true,
                });  
      this.dateAwal === "" ? this.tanggal_detail = dateFormat('yyyy-mm-dd')  : this.tanggal_detail = this.dateAwal
     
      const kota = this.$store.getters.listCabangCoDasboard.map((item)=>{ 
                    
                  return item.nama_cabang === undefined ? item.substr(5,20) : item.nama_cabang.substr(5,20)
                })  

      
        const payload = {
          kdcab: kota.toString(),
          tanggal: this.tanggal_detail,
          status_co: status_co,
        }; 
      this.$store.dispatch("getDetailCoDashboardStatusCo", payload).then( () =>{  
        this.dialogDetail = !this.dialogDetail
        loading.hide()
      }).catch(()=>{
        loading.hide()
      })
    },
    
    showAddKeterangan(tanggal,asal) {
      this.tanggal_ket = tanggal
      this.asal_ket = asal
      this.cabanginputan = asal.split("|")[0]
      this.dialogAdd = !this.dialogAdd
    },
      
  },
  mounted() {   
    this.loadawal()
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
     
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
        color: #ededed;
        width: 25px;
        text-align: center; 
        font-weight: bold;
        font-size: 14px;
    } 
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #fc2841;
  }
</style>
 
 