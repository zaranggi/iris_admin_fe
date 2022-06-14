<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title>Monitoring Toko Baru</v-card-title>
      <v-divider />  
      <v-card-text >   
       
        <div class="d-flex flex-column ma-4">  
            
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Cek Kelengkapan Toko Baru

               
              <v-col class="text-right">
                <v-btn color="teal darken-1" icon @click="getNewTokoBaru()">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>

                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="8"> 
                      <download-excel
                            ref="donwloadResultQuery"
                            class= "button is-primary" 
                            :data="listdataTokoBaru" 
                            worksheet="Data" 
                            name="Toko Baru.xlsx"
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdataTokoBaru" :search="search" mobile-breakpoint="0"> 
                     
                    <template v-slot:[`item.kdtk_baru`]="{ item }">                   
                        <v-icon medium color="teal darken-1" class="mr-3" @click="showDetailDialog(item.kdtk_baru)">mdi-eye-check-outline</v-icon>
                        <v-icon medium color="amber darken-4" class="mr-3" @click="checkToko(item.kdtk_baru)">mdi-book-check-outline</v-icon>
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
              <v-icon color="cyan ">mdi-cloud-circle</v-icon>  ({{ Dkdcab }}) {{ Dkdtk }} - {{ Dnama }} || 
              <span v-if="Dkdtk.substr(0,1) ==='T'" class="text--primary"> Reguler</span>
              <span v-else class="text--primary"> Franchise</span>
              
            </v-card-title> 
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
               <v-row dense>
                  <v-col cols="7">
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
                        <tr><td style="font-weight: bold;">Koneksi</td><td>{{ Dip_remote }}</td></tr>
                        <tr><td style="font-weight: bold;">Initial Aktif</td><td><span v-html="initial_detail"></span></td></tr>
                        <tr><td style="font-weight: bold;">Stock 0</td><td> {{ stock }} item dengan Stock = 0 dan item sudah pernah ada BPB</td></tr>
                        <tr><td style="font-weight: bold;">Stock > 0 & HPP = 0 </td><td> {{ stock_hpp }} item dengan Stock > 0 namun HPP = 0</td></tr>
                        <tr><td style="font-weight: bold;">Stock > 0 & PRICE = 0</td><td> {{ price }} item dengan Stock > 0 namun Price = 0</td></tr>
                        <tr><td style="font-weight: bold;">Promosi</td><td>{{ promo_sumber }}</td></tr>
                        <tr><td style="font-weight: bold;">Program Setting</td><td> Total {{ program_setting }} </td></tr>
                        <tr><td style="font-weight: bold;">Virbacaprod</td><td> Total {{ vir_bacaprod }}</td></tr>
                        
                      </tbody> 
                  </v-simple-table>
                </template>
                  </v-col>
                  <v-col cols="5">
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
                        <tr><td style="font-weight: bold;">Kantong Plastik</td> <td> {{ Plastik }} PLU </td></tr>
                        <tr><td style="font-weight: bold;">Dept, Divisi, Kat</td> <td> Dept = {{ Dept }}, Divisi = {{ Divisi }}, Kat = {{ Kat }} </td></tr>
                        <tr><td style="font-weight: bold;">Const Toko</td><td><span v-html="const_toko"></span></td></tr>
                      </tbody> 
                  </v-simple-table>
                </template>
                  </v-col>
               </v-row> 
                <v-divider></v-divider> 
                <template>
                  <v-container fluid>
                    <v-text-field 
                      class="ma-1 pa-1 mx-4"
                        v-model="npb_intransit"
                        append-icon="mdi-truck-check"
                        :rules="[v => !!v || 'NPB Intransit Harus diisi']"
                        label="NPB Intransit"
                        required 
                      ></v-text-field>
                      
                    <v-text-field 
                      class="ma-1 pa-1 mx-4"
                        v-model="promo_belum_potong"
                        append-icon="mdi-scale-off"
                        :rules="[v => !!v || 'Promo Belum main Harus diisi']"
                        label="Promo Belum Main/Potong"
                        required 
                      ></v-text-field>
                      
                    <v-text-field 
                      class="ma-1 pa-1 mx-4"
                        v-model="posrt_mtran"
                        append-icon="mdi-source-branch-sync"
                        :rules="[v => !!v || 'Posrt Mtran Harus diisi']"
                        label="Posrt Mtran"
                        required 
                      ></v-text-field>
                    <v-text-field 
                      class="ma-1 pa-1 mx-4"
                        v-model="posrt_mstran"
                        append-icon="mdi-source-branch-sync"
                        :rules="[v => !!v || 'Posrt Mstran Harus diisi']"
                        label="Posrt Mstran"
                        required 
                      ></v-text-field>
                    <v-textarea
                      clearable
                      v-model="catatan"
                      clear-icon="mdi-close-circle"
                      label="Catatan Pengecekan"
                    ></v-textarea>  
                  </v-container> 
                </template> 
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="orange accent-3" elevation="15" @click="DialogDetail = false">
                <v-icon dark>mdi-close</v-icon>
                Cancel
              </v-btn>
              <v-btn color="light-green " elevation="15" @click="saveKeteranganTokoBaru()">
                <v-icon dark>mdi-plus</v-icon>
                Simpan 
              </v-btn>
            </v-card-actions>
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
      Dkdcab:"", 
      Dkdtk:"", 
      Dnama:"", 
      Dtglbuka:"", 
      stock:"", 
      npb_intransit:"", 
      stock_hpp:"", 
      price:"", 
      promo_belum_potong:"", 
      promo_sumber:"", 
      promo_total:"", 
      posrt_mtran:"", 
      posrt_mstran:"", 
      initial_detail:"", 
      vir_bacaprod:"", 
      program_setting:"", 
      Dept:"",
      Divisi:"",
      Kat:"",
      Plastik:"",
      Dip_remote:"", 
      const_toko:"", 
      catatan:"", 
      DialogDetail: false, 
      timeoutPesan:2000,  
      snackbar: false, 
      itemKdtk: "",
      pesan: "", 
      absolute:true,
      search: "",  
      overlay: false,   
      windowWidth: window.innerWidth,  
      headers: [ 
          {text: '#', value: 'kdtk_baru', align:'center', fixed: true}, 
          {text: 'Tgl Buka', value: 'tglbuka'}, 
          {text: 'Kdcab', value: 'kdcab'},  
          {text: 'Nama Toko', value: 'nama'}, 
          {text: 'Remote', value: 'ip_remote'},
          {text: 'Checker', value: 'nama_user'},
          {text: 'Updtime', value: 'updtime'}, 
      ],
         
    };
  },
  computed: {    
    listdataTokoBaru() {  
      return this.$store.getters.listTokoBaru;
    },   
    isMobile() {
      return this.windowWidth <= 300
    },
      
  },
  methods: {  
      loaddataTokobaru(){
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        this.$store.dispatch("getListTokoBaru", { kdcab : dataUser.cover}).then(()=> {
              this.overlay = false
            }).catch(() => {
              this.overlay = false
            });
      }, 
      showDetailDialog(item) {
          this.itemKdtk = item
          const datanya = {
            kdtk:  this.itemKdtk
          };
              this.$store.dispatch("getDetailTokoBaru", datanya).then((r)=> { 
                  this.Dkdcab= r[0].kdcab,
                  this.Dkdtk= r[0].kdtk,
                  this.Dnama= r[0].nama,
                  this.Dtglbuka= r[0].tglbuka,
                  this.stock= r[0].stock,
                  this.npb_intransit= r[0].npb_intransit,
                  this.stock_hpp= r[0].stock_hpp,
                  this.price= r[0].price,
                  this.promo_belum_potong= r[0].promo_belum_potong,
                  this.promo_sumber= r[0].promo_sumber,
                  this.promo_total= r[0].promo_total,
                  this.posrt_mtran= r[0].posrt_mtran,
                  this.posrt_mstran= r[0].posrt_mstran,
                  this.initial_detail= r[0].initial_detail,
                  this.program_setting= r[0].program_setting,
                  this.vir_bacaprod= r[0].vir_bacaprod,
                  this.Dept= r[0].dept,
                  this.Divisi= r[0].divisi,
                  this.Kat= r[0].kat,
                  this.Plastik= r[0].plastik,
                  this.Dip_remote= r[0].ip_remote,
                  this.const_toko= r[0].const_toko,
                  this.catatan= r[0].catatan,

                  this.overlay = false

                  this.DialogDetail = !this.DialogDetail
              }).catch(() => {
                
                this.overlay = false
              }) 
      }, 
      checkToko(item) {
        this.itemKdtk = item
         let dataUser = this.$store.getters.dataUsers
        this.overlay = true
              this.pesan = "Update Data...";
              this.snackbar = true;   
               
              const datanya = {
                  kdtk:  this.itemKdtk, 
                  nama_user: dataUser.nama
              };
              console.log(datanya)
              this.$store.dispatch("getCheckToko", datanya).then(()=> {
                this.overlay = false
                this.loaddataTokobaru()
                
              }).catch(() => {
                this.overlay = false
              }) 
      }, 

      saveKeteranganTokoBaru(){
         
          this.DialogDetail = false
          this.overlay = true 
          let dataUser = this.$store.getters.dataUsers
          console.log(this.catatan)
          const sendpost = { 
              kdtk:  this.itemKdtk,
              user:  dataUser.nama,
              catatan: this.catatan,
              npb_intransit: this.npb_intransit,
              promo_belum_potong: this.promo_belum_potong,
              posrt_mtran: this.posrt_mtran,
              posrt_mstran: this.posrt_mstran,
            }
          this.$store.dispatch("saveKeteranganTokoBaru", sendpost)
            .then(() => {

                this.overlay = false
                this.loaddataTokobaru()
                
            })
            .catch(() => {
              this.overlay = false
            });   
      },
      getNewTokoBaru(){
          this.overlay = true
          let dataUser = this.$store.getters.dataUsers
          const sendpost = { 
              kdcab:  dataUser.cover
          }
          this.$store.dispatch("getNewTokoBaru", sendpost)
            .then(() => {

                this.overlay = false
                this.loaddataTokobaru()
                
            })
            .catch(() => {
              this.overlay = false
            });   
      }
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    this.loaddataTokobaru()
    
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
}  
</style>