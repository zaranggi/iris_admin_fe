<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%"
    :loading="loadingvquery"
  > 
    <v-card-title>
      <v-icon color="light-green darken-1">mdi-dns</v-icon>
      <span class="green--text font-weight-bold float-end"> {{ this.nama_cabang }}</span>  
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-subtitle>    
      <v-icon color="teal darken-3">mdi-home</v-icon>
          <span class="font-weight-bold"> Departemen : </span> 
          <span class="green--text font-weight-bold"> 
            {{ this.nama_dep }}
          </span>
          <br/>
      <v-icon color="teal darken-3">mdi-comment-multiple-outline</v-icon>
          <span class="font-weight-bold"> Ticket : </span> <span class="green--text font-weight-bold"> {{ this.$route.params.id }}
            <span class="float-right">   
                <span class="font-weight-bold"> {{ this.jenisba }}</span>  
            </span>
          </span>
      <br/>
      <v-icon color="teal darken-3">mdi-calendar</v-icon><span class="font-weight-bold"> Tanggal BA: </span> <span class="green--text font-weight-bold"> {{ this.tanggal | formatTglIndo }}
          <span class="float-right">   
              <v-chip v-if="labelnya === 'Low'" class="yellow accent-3 text-center">{{ labelnya }}</v-chip>
              <v-chip v-else-if="labelnya === 'Normal'" class="orange darken-2 text-center">{{ labelnya }}</v-chip>
              <v-chip v-else-if="labelnya === 'High'" class="red darken-1 text-center">{{ labelnya }}</v-chip>
              <v-chip v-else-if="labelnya === 'Priority'" class="lime darken-1 text-center">{{ labelnya }}</v-chip>
          </span>
        </span>
    </v-card-subtitle>
    
    <v-divider class="mx-4"></v-divider>

    <div class="d-flex flex-column ma-4">      
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >      
       
       <v-flex lg12 md12 sm12> 
          <v-row dense>
             <v-col cols="4">
              <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="nama_users"
                append-icon="mdi-account-settings"
                :counter="10" 
                label="Diajukan Oleh" 
                readonly
              ></v-text-field> 
              
            </v-col> 
            <v-col cols="6">  
              <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangVqueryTicket"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangVquery"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
                     chips  
                      dense
                      multiple
                      small-chips  
                      readonly
                  > 
              </v-select>
            </v-col>
            
          </v-row> 

          <v-row dense> 
            <v-col cols="12" lg="8"> 
              <v-textarea
               class="ma-1 pa-1 mx-4"
                v-model="keterangan"
                :counter="100"
                append-icon="mdi-text"
                label="Keterangan" 
                readonly
              ></v-textarea> 
            </v-col>
            <v-col cols="4">
                <v-banner
                  single-line 
                >  
                <template v-slot:actions>
                   <v-btn v-if="fileba != '' " color="success" dark small @click="downloadBa()">
                      Download File BA
                      <v-icon right dark>mdi-cloud-download</v-icon>
                    </v-btn> 
                   <v-btn v-if="fileba === ''" color="primary" dark small @click="showDialogUpload()">
                      Upload File BA
                      <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                  
                </template> 
              </v-banner>
            </v-col>
          </v-row> 
          <v-divider class="mx-4"></v-divider>
          <v-row dense>
            <v-col cols="12" >    
              <template>
                <v-container fluid>   
                  <v-textarea
                  class="ma-1 pa-1 mx-4 kecil"
                    v-model="queryOne" 
                    append-icon="mdi-text"
                    filled
                    auto-grow
                    readonly
                    label="Ticket - Query" 
                  ></v-textarea> 
                </v-container>
              </template>  
            </v-col>  
          </v-row>
        </v-flex> 
      </v-form>
      </div> 
      <v-row justify="center" v-if="this.fileba != '' ">
        <v-col cols="4" md="4" >  
          <v-card-actions v-if="this.ket_status != 'Finish' && this.jabatan <= 5">
              <v-btn small color="light-green darken-2" class="text-center ma-1 pa-1 mx-4" @click="showDialogTicket()">
                Approve
              </v-btn>
              <v-spacer />
              <v-btn small color="deep-orange darken-2" class="text-center ma-1 pa-1 mx-4" @click="showDialogRejectTicket()">
                Reject
              </v-btn> 
          </v-card-actions>
        </v-col>
      </v-row> 

    <v-divider class="mx-4"></v-divider> 
     <v-snackbar
        v-model="snackbar"
        :timeout="timeoutPesan"
        top
        color="amber darken-4"
        text
        elevation="24" 
        >
        {{ pesan }} 
        <template v-slot:action="{ attrs }">
          <v-btn 
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-dialog v-model="dialogUpload" max-width="650px">
        <v-card>
          <v-card-title class="headline">
            Upload BA Tiket  
          </v-card-title>
          <v-card-text>Silahkan Upload File BA Format PDF </v-card-text>
          <v-card-text> 
            <v-row no-gutters justify="center" align="center">
                
                  <v-col cols="8">
                    <v-file-input
                      show-size
                      type="file"
                      accept="application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      label="File input"
                      @change="selectFile"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="4" class="pl-2">
                    <v-btn color="success" dark small @click="uploadBaTicket">
                      Upload
                      <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-alert v-if="message" border="left" color="blue-grey" dark>
                  {{ message }}
                </v-alert>
          </v-card-text>         
          <v-card-actions> 
            <v-btn class="float-right" color="orange darken-1" text @click="dialogUpload = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog> 

      <v-dialog v-model="dialogAppTicket" max-width="650px">
        <v-card>
          <v-card-title class="headline">
            Approve Tiket  
          </v-card-title>
          <v-card-text>Apakah Anda Yakin?</v-card-text>
          <v-card-text>
              <v-textarea
                class="ma-1 pa-1 mx-4"
                v-model="keterangan_app1" 
                append-icon="mdi-text"
                filled
                auto-grow 
                label="Keterangan Approval" 
              ></v-textarea>   

              <v-autocomplete
                        class="ma-1 pa-1 mx-4"
                        prepend-icon="mdi-label"
                        v-model="kategori"
                        item-text="nama_kategori"
                        item-value="id"
                        :items="getDataxTikcketKategori"
                        :rules="[v => !!v || 'Kategori BA Harus diisi']"
                        label="Pilih Kategori" 
                          required 
                      > 
                  </v-autocomplete>            
          </v-card-text>        

          <v-card-actions>
            <v-btn color="green darken-1" text @click="approveTicket()">Approve</v-btn>
            <v-btn color="orange darken-1" text @click="dialogAppTicket = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog> 
    <v-dialog v-model="dialogRejectTicket" max-width="300px">
        <v-card>
          <v-card-title class="headline">
            Reject Tiket  
          </v-card-title>
          <v-card-text>Apakah Anda Yakin?</v-card-text>
          <v-card-actions>
            <v-btn color="red darken-1" text @click="rejectTicket()">Reject</v-btn>
            <v-btn color="orange darken-1" text @click="dialogRejectTicket = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog> 
     <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay> 
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
        <template v-slot:action="{ attrs }">
          <v-btn 
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

  </v-row>  
</v-container>
</template> 

<script>    
import axios from "axios";
import download from 'js-file-download';

export default {
  name: "Tambah",
  data: () => ({   
      nama_dep:"",
      nama_cabang:"",
      timeoutPesan:2000,
      DialogTicket: false, 
      jenisba:"",
      snackbar: false,
      keterangan:"",
      kategori:"",
      jabatan:999,
      keterangan_app1:"",
      nama_users:"",
      fileba:"",
      tanggal:"",
      labelnya:"",
      ket_status:"",
      cabang:"",
      queryOne: "",
      pesan: "", 
      overlay: true,
      running: false, 
      listCabangVqueryTicket: [], 
      submitted: false,
      dialogAppTicket:false,
      dialogUpload:false,
      dialogRejectTicket: false, 
      errorMessages:"",  

      currentFile: undefined,
      message: "",
      fileInfos: [],
  }),
  computed: {   
    getqueryOne() {
      return this.$store.getters.queryOne;
    },    
    getDataxTikcketKategori() {
      return this.$store.getters.listDataxTicketKategori;
    },   
    loadingvquery() {
      return this.$store.getters.loadingvquery;
    },  
    getCabangVquery(){
      return this.$store.getters.listCabangVqueryTicket;
    }
    
  },
  methods: {
   
    showDialogUpload() {
        this.dialogUpload = !this.dialogUpload
    },
    showDialogTicket() {
        this.dialogAppTicket = !this.dialogAppTicket
    },
    showDialogRejectTicket() {
        this.dialogRejectTicket = !this.dialogRejectTicket
    },
    rejectTicket() {
      this.dialogAppTicket = false
      this.overlay = true 
        const datanya = {
          id:  this.$route.params.id, 
        };
        this.$store
          .dispatch("rejectTicket", datanya)
          .then(() => {
            this.overlay = false
            this.$router.push("/ticket/list")
          })
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
            this.overlay = false
          }); 
    }, 
    selectFile(file) {
      this.currentFile = file
    },
    uploadBaTicket() {
      
      if (!this.currentFile) {
        this.message = "Pastikan File Sudah Dipilih!";
        return;
      }
      console.log(this.currentFile)
      this.dialogUpload = false
      this.overlay = true
      this.message = ""; 
      const formData = new FormData(); 
      formData.append('filesba', this.currentFile)
      formData.append('idtiket', this.$route.params.id)

      axios.post("/api/ticket/uploadba", formData)
          .then(() => { 
            this.overlay = false
            this.pesan = "Upload File Sukses!";  
            this.snackbar = true; 
            this.reloadpage()
          })
          .catch(() => {
            
            this.overlay = false
            this.pesan = "Upload File Gagal!";
            this.snackbar = true;
            this.currentFile = undefined; 
          });
    }, 
    downloadBa() {
      axios.post('/api/ticket/downloadba',
      { 'file': this.fileba },
      { responseType: 'blob' })
      .then(res => {              
          download(res.data, this.fileba);
      }).catch(err => {
        console.log(err)
      }) 
    },
    approveTicket() { 

      this.dialogAppTicket = false
      this.overlay = true
      let dataUser = this.$store.getters.dataUsers
        const datanya = {
          id_tiket:  this.$route.params.id,
          app1: dataUser.nama,
          cabang: this.cabang,
          vquery: this.queryOne,
          kategori: this.kategori,
          keterangan_app1: this.keterangan_app1,
        }; 
        this.$store
          .dispatch("appTicket", datanya)
          .then(() => {
            this.dialogRejectTicket = false
            this.overlay = false
            this.$router.push("/ticket/list")
          })
          .catch((err) => {
            this.errorMessages = err.msg;
            this.dialogRejectTicket = false
            this.snackbar = true;
            this.overlay = false
          });  
    },    
   reloadpage() { 
      this.$store.dispatch("getOneTicket", {id: this.$route.params.id})
      .then(response => { 
        const n = response[0]  
        this.nama_users = n.nama_users
        this.keterangan = n.keterangan
        this.tanggal = n.tanggal
        this.queryOne = n.vquery
        this.nama_cabang = n.nama_cabang
        this.nama_dep = n.nama_dep
        this.fileba = n.fileba
        this.jenisba = n.jenisba
        this.labelnya = n.ket_label
        this.ket_status = n.ket_status
        this.cabang = n.cabang
        if(typeof(n.cabang) !== 'undefined' || n.cabang !== null){
          let s = n.cabang.split(",")
          for (let i = 0; i < s.length; i++) {
              this.listCabangVqueryTicket.push(parseInt(s[i])) 
          }
        } 
        n.isactive === 'N' ? this.isactive = true : this.isactive = false
        n.isadmin === 'Y' ? this.isadmin = true : this.isadmin = false
        
      })
      .catch(() => {
        
      });
   } 
  }, 
  mounted() {   

      let dataUser = this.$store.getters.dataUsers
      this.jabatan = dataUser.id_jabatan
      this.$store.dispatch("getCabangVquery",{ kdcab : dataUser.cover});
      this.$store.dispatch("getxKategoriTicket"); 
      this.$store.dispatch("getOneTicket", {id: this.$route.params.id})
      .then(response => { 
        const n = response[0]  
        this.nama_users = n.nama_users
        this.keterangan = n.keterangan
        this.tanggal = n.tanggal
        this.queryOne = n.vquery
        this.fileba = n.fileba
        this.jenisba = n.jenisba
        this.nama_cabang = n.nama_cabang
        this.nama_dep = n.nama_dep
        this.labelnya = n.ket_label
        this.ket_status = n.ket_status
        this.cabang = n.cabang
        if(typeof(n.cabang) !== 'undefined' || n.cabang !== null){
          let s = n.cabang.split(",")
          for (let i = 0; i < s.length; i++) {
              this.listCabangVqueryTicket.push(parseInt(s[i])) 
          }
        } 
        n.isactive === 'N' ? this.isactive = true : this.isactive = false
        n.isadmin === 'Y' ? this.isadmin = true : this.isadmin = false
        
      })
      .catch(e => {
        console.log(e);
      }); 
      this.overlay = false
     
  }, 
  
  template: '<div ref="table"></div>'
  
};
</script>
 
<style>
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
  
}
 .v-list-item__title {
    align-self: center;
    font-size: 0.8125rem;
    font-weight: 500;
}
 
  .v-text-field input {
   font-size: 0.8125rem;
   font-weight: 500;
  }
  .v-label {
    font-size: 14px;
   font-weight: 500;
  }

</style> 
<style scoped>
.word-wrap {
  white-space:nowrap;
} 
  .txt {
  width: 100%;
  height: auto;
}
  .kecil {
    font-size: 0.7rem;
}
</style>