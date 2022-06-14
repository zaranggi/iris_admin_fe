<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> List Ticket Query</v-card-title>
      <v-divider />
      <v-card-text> 
        
       <div class="d-flex flex-column ma-4" >
          <v-form ref="formUpdate" @submit.prevent="SubmitviewTicket">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="2" xs="12">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="PilihJenisBA"
                    item-text="nama"
                    item-value="id"
                    :items="itemJenisBA"
                    :rules="[v => !!v || 'Jenis BA diisi']"
                    label="Jenis BA" 
                    required
                  >
                    </v-select>   
                </v-col> 
                <v-col cols="2" xs="12">
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
                        label="Pilih Periode"
                        prepend-icon="mdi-calendar" 
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateAwal"
                      no-title
                      color="green lighten-1" 
                      type="month"
                      @input="tanggal = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col> 

                  <v-col cols="1" xs="1" class="ma-1 pa-1 mx-4">
                  <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                    <v-icon left dark>
                      mdi-magnify
                    </v-icon>
                    Get Data
                  </v-btn>
                </v-col> 
                <v-col cols="2" class="ma-1 pa-1 mx-4">
                  <download-csv
                      class= "button is-primary"
                      :data= "listdataticket"
                      name="Data Ticket.csv">
                      <v-btn color="secondary"  small elevation="10" class="ma-2 white--text">
                        <v-icon color="light-green darken-1">mdi-file-download</v-icon> 
                        Download
                      </v-btn>
                  </download-csv>
                </v-col> 
            </v-row>
          </v-flex> 
        </v-form>
      </div>  
            <v-card flat>
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4" offset ="8"> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdataticket" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      <div class="text-center">
                          <span >  {{ index + 1 }}</span>
                        </div>  
                    </template>
                     <template v-slot:[`item.tquery`]="{ item }">
                      <div class="text-center">
                          <span >  {{ item.tquery }}</span>
                        </div>  
                    </template>
                     <template v-slot:[`item.notiket`]="{ item }">  
                       <div v-if="item.ket_label === 'Low'" class="text-center">
                          <span class="green--text font-weight-bold">  {{item.notiket}}</span>
                        </div> 
                        
                       <div v-else-if="item.ket_label === 'Normal'" class="text-center">
                          <span class="orange--text font-weight-bold">  {{item.notiket}}</span>
                        </div> 
                        
                       <div v-else-if="item.ket_label === 'High'" class="text-center">
                          <span class="red--text font-weight-bold">{{item.notiket}}</span>
                        </div> 
                        
                       <div v-else-if="item.ket_label === 'Priority'" class="text-center">
                          <span class="lime--text font-weight-bold">  {{item.notiket}}</span>
                        </div> 
                    </template>
                    <template v-slot:[`item.ket_status`]="{ item }">   
                         <div v-if="item.ket_status === 'Reject'" class="text-center">
                          <span class="pink--text font-weight-bold"> {{ item.ket_status }}</span>
                        </div>   
                        <div v-else class="accent-3 text-center">
                          <span class="black--text font-weight-bold"> {{ item.ket_status }}</span>
                        </div>                     
                    </template>                    
                    <template v-slot:[`item.tanggal`]="{ item }">   
                         <div class="text-center">
                          <span class="black--text"> {{ item.tanggal | formatTglIndo}}</span>
                        </div>                       
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">  
                        <v-icon color="green lighten-2" small class="mr-2" @click="editTicket(item.actions)">mdi-pencil</v-icon>                      
                        <v-icon v-if="item.ket_status != 'Finish' && jabatan <= 5 " small color="red darken-2" class="mr-2" @click="actTicket(item.actions)">mdi-delete</v-icon>
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table>
  
                   <v-dialog v-model="dialogReject" max-width="300px">
                      <v-card>
                        <v-card-title class="headline">
                          Reject Tiket  
                        </v-card-title>
                        <v-card-text>Apakah Anda Yakin?</v-card-text>
                        <v-card-actions>
                          <v-btn color="orange darken-1" text @click="dialogReject = false">Cancel</v-btn>
                          <v-btn color="green darken-1" text @click="rejectTicket()">Reject</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog> 
                </v-layout> 
              </v-card-text>
              
            </v-card>   
      <v-overlay :absolute="absolute" :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      absolute: true,
      overlay: false,
      search: "",
      windowWidth: window.innerWidth,  
      dialogReject: false, 
      jabatan: 999,
      itemToReject: "",
      PilihJenisBA:"",
      PilihKategori:"",
      dateAwal: new Date().toISOString().substr(0, 7),
      tanggal: false,
      itemJenisBA:[
        { id : "IN" , nama: "BA Masuk"},
        { id : "OUT" , nama: "BA Keluar"}
      ],
      headers: [
        {text: 'No', value: 'id',fixed: true },
        {text: 'Actions', value: 'actions'},
        {text: 'Jenis', value: 'jenisba'},
        {text: 'Kategori', value: 'nama_kategori'},
        {text: 'Nomor Tiket', value: 'notiket',fixed: true},
        {text: 'Tgl', value: 'tanggal'},
        {text: 'Cabang', value: 'nama_cabang'},
        {text: 'Departemen', value: 'nama_dep'},
        {text: 'Diajukan Oleh', value: 'nama_users',fixed: true},
        {text: 'Status', value: 'ket_status'}
        ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loadingTicket;
    },  
    computeTanggal() {
      return this.dateAwal;
    },   
    listdataticket() {
      return this.$store.getters.listDataTicket;
    },  
    getDataxTikcketKategori() {
      return this.$store.getters.listDataxTicketKategori;
    }, 
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
      SubmitviewTicket(){
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        if(this.$refs.formUpdate.validate()){
          const datanya = {
            kdcab : dataUser.kdcab,
            jenisba: this.PilihJenisBA, 
            tanggal: this.dateAwal
          }; 
           this.$store
            .dispatch("getTicketListTertentu", datanya)
            .then(() => {  
              this.overlay = false  
            })
            .catch(() => {  
              this.overlay = false  
            }); 
        }else{ 
            this.overlay = false 
        } 
      },
      loadItems() { 
        this.overlay = true
        let dataUser = this.$store.getters.dataUsers
        this.$store.dispatch("getTicketList", { kdcab : dataUser.kdcab}).then(() => { 
              this.overlay = false 
        })
          .catch(() => {
            this.overlay = false 
          });
      },    
      actTicket(item) {
        this.itemToReject = item
        this.dialogReject = !this.dialogReject
      },
      rejectTicket() {  
        this.overlay = true
           const sendpost = {
            id: this.itemToReject
          }
          this.$store.dispatch("rejectTicket", sendpost)
          .then(() => {
              this.dialogReject = false
              this.overlay = false
              this.loadItems()
          })
          .catch(() => {
            this.overlay = false 
          });
      }, 
      editTicket(id) {
        this.$router.push({ name: "ticket.details", params: { id: id } });
      },
      
  },
  mounted() {  
    let dataUser = this.$store.getters.dataUsers
    this.jabatan = dataUser.id_jabatan 
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth 
    })
    this.loadItems()  
  },  
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>