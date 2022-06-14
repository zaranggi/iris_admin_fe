<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Cek GLSLP Vs Mtran Toko </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitGlslpvsmtran">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="4" >
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangGlslpvsmtran"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabang"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                    chips
                    clearable 
                    dense
                    small-chips 
                    required
                  > </v-select>
                </v-col> 
                
                <v-col cols="3">
                    <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangGlslpvsmtranJadwal"
                    item-text="tanggal"
                    item-value="tanggal"
                    :items="getJadwal"
                    :rules="[v => !!v || 'Jadwal Rekon Harus diisi']"
                    label="Jadwal Rekon"
                    chips
                    clearable 
                    dense
                    small-chips 
                    required
                  > </v-select>
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

         
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Cek Sales
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4"> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0"> 
                     
                    <template v-slot:[`item.id`]="{ item }">                   
                        <v-icon small color="red darken-2" class="mr-2" @click="showSaveDialog(item.id)">mdi-message</v-icon>
                    </template>

                    <template v-slot:[`item.tanggal`]="{ item }">
                      {{ item.tanggal | formatTgl}}
                    </template>
                    <template v-slot:[`item.sel_sales`]="{ item }">
                      {{ item.sel_sales | numeral('0,0') }}
                    </template>
                    <template v-slot:[`item.sel_hpp`]="{ item }">
                      {{ item.sel_hpp | numeral('0,0') }}
                    </template>
                    <template v-slot:[`item.sel_ppn`]="{ item }">
                      {{ item.sel_ppn | numeral('0,0') }}
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay>
      
      <v-dialog v-model="DialogKeterangan" max-width="560px">
          <v-card>
            <v-card-title class="headline" color="deep-purple lighten-1">
              <v-icon color="cyan ">mdi-cloud-circle</v-icon> Input Keterangan Penanganan 
            </v-card-title>
            <v-card-text> 
               <v-divider class="mx-4"></v-divider>
              <template>
                <v-container fluid>
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
              <v-btn color="light-green " elevation="15" @click="saveKeterangan()">
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
      DialogKeterangan: false,     
      keterangan:"",
      timeoutPesan:2000,  
      snackbar: false,
      itemToSave: {},
      pesan: "", 
      absolute:true,
      search: "",  
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      dateAkh: new Date().toISOString().substr(0, 10), 
      tanggal: "",
      listCabangGlslpvsmtran: "",
      listCabangGlslpvsmtranJadwal: "",
      windowWidth: window.innerWidth,  
      headers: [ 
          {text: 'id', value: 'id',fixed: true},
          {text: 'Kdcab', value: 'kdcab',fixed: true},
          {text: 'Tanggal', value: 'tanggal'}, 
          {text: 'Kdtk', value: 'kdtk'}, 
          {text: 'Nama', value: 'nama'}, 
          {text: 'Sel Sales', value: 'sel_sales'}, 
          {text: 'Sel PPn', value: 'sel_ppn'}, 
          {text: 'Sel HPP', value: 'sel_hpp'}, 
          {text: 'Keterangan', value: 'keterangan'}, 
          {text: 'User', value: 'nama_user'},
          {text: 'TJual', value: 'tjual'},
          {text: 'TPPn', value: 'tppn'}, 
          {text: 'THPP', value: 'thpp'},  
          {text: 'Sales GL', value: 'sales'},
          {text: 'PPn GL', value: 'ppn'},
          {text: 'Hpp GL', value: 'hpp'},
      ],
         
    };
  },
  computed: {    
    listdata() {  
      return this.$store.getters.listDataGlslpvsmtran;
    },  
    getCabang() {
      return this.$store.getters.listCabangGlslpvsmtran;
    },
    getJadwal() {
      return this.$store.getters.listDataGlslpvsmtranJadwal;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
      
  },
  methods: {  
      handleSubmitGlslpvsmtran(){
        if(this.listCabangGlslpvsmtran.length === 0){
              this.overlay = false
              this.pesan = "Form harus terisi!";
              this.snackbar = true;   
         }else{
              this.overlay = true
              this.pesan = "Proses Data...";
              this.snackbar = true;   
               
              const datanya = {
                  kdcab:  this.listCabangGlslpvsmtran.toString(),
                  tanggal: this.listCabangGlslpvsmtranJadwal, 
              };
              this.$store.dispatch("getGlslpvsmtran", datanya).then(()=> {
                this.overlay = false
              }).catch(() => {
                this.overlay = false
              })
         }
        
      }, 
        
      showSaveDialog(item) {
        this.itemToSave = item
        this.DialogKeterangan = !this.DialogKeterangan
      },
      saveKeterangan(){
        if(this.listCabangGlslpvsmtran.length === 0 || this.keterangan.length === 0 || this.listCabangGlslpvsmtranJadwal.length === 0){
            this.overlay = false
            this.pesan = "Form harus terisi!";
            this.snackbar = true;   
        }else{
          this.overlay = true 
          let dataUser = this.$store.getters.dataUsers
          const sendpost = {
              id: this.itemToSave,
              keterangan: this.keterangan,
              user:  dataUser.nama,
              kdcab:  this.listCabangGlslpvsmtran.toString()
            }
          this.$store.dispatch("saveKeterangan", sendpost)
            .then(() => {
                const datanya = {
                  kdcab:  this.listCabangGlslpvsmtran.toString(),
                  tanggal: this.listCabangGlslpvsmtranJadwal, 
                };
                this.$store.dispatch("getGlslpvsmtran", datanya)

                this.overlay = false
                this.DialogKeterangan = false
                
            })
            .catch((err) => {
              console.log(err);
            });  
        }     
        
      }
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangGlslpvsmtran", { kdcab : dataUser.cover});
    this.$store.dispatch("getGlslpvsmtranJadwal", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>