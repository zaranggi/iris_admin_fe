<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Tambah Server FTP DC</v-card-title>
    <v-divider class="mx-4"></v-divider>

    <div v-if="!submitted" class="d-flex flex-column ma-4">
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >
       <v-flex lg12 md12 sm12>
          <v-row dense>
            <v-col cols="12" lg="4"> 
               <v-autocomplete
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-home-map-marker"
                v-model="listCabangServerdc"
                item-text="nama_cabang"
                item-value="nama_cabang"
                :items="getCabang"
                :rules="[v => !!v || 'Cabang Harus diisi']"
                label="Cabang"
                required
              ></v-autocomplete>  
              <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-home-map-marker"
                v-model="jenis_server"
                item-text="id"
                item-value="value"
                :items="jenis"
                :rules="[v => !!v || 'Jenis Gudang Harus diisi']"
                label="Jenis Gudang"
                required
              ></v-select>  
              <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="kodegudang"
                append-icon="mdi-home-map-marker"
                :counter="4"
                :rules="[v => !!v || 'Kode Gudang Harus diisi']"
                label="Kode Gudang"
                required 
              ></v-text-field> 
               <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="nama"
                append-icon="mdi-home-map-marker"
                :counter="25"
                :rules="[v => !!v || 'Nama Gudang Harus diisi']"
                label="Nama Gudang"
                required 
              ></v-text-field>
              
            </v-col>   
             <v-col cols="12" lg="4"> 
               <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="ipserver"
                append-icon="mdi-account-settings"
                :counter="15"
                :rules="[v => !!v || 'ipserver User Harus diisi']"
                label="IP Server"
                required 
              ></v-text-field>
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="username"
                :counter="25"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Username Harus diisi']"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="password"
                :counter="25"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Password Harus diisi']"
                label="Password"
                required
              ></v-text-field>
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="port"
                :counter="4"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Port Harus diisi']"
                label="Port"
                required
              ></v-text-field> 
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="pathserver" 
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Path Server Harus diisi']"
                label="Path Server"
                required
              ></v-text-field>
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="pathdown" 
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Path Download Harus diisi']"
                label="Path Download"
                required
              ></v-text-field> 
               <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveServer">
                Simpan
              </v-btn>
            </v-col>  
          </v-row>
        </v-flex>



      </v-form>
      
      </div>
      <div v-else> 
          <v-card-title>
            Data Baru Berhasil ditambahkan
          </v-card-title>  
          <v-card-actions>
            <v-btn color="success" @click="kembali">Kembali</v-btn>
          </v-card-actions> 
      </div>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeoutPesan"
        top
        color="amber darken-4"
        text
        elevation="24" 
        >
        {{ errorMessages }} 
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
      <v-overlay :absolute="absolute" :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay>
       
    </v-card>
  </v-row>
  
</v-container>
</template>
 

<script>

export default {
  name: "Tambah",
  data: () => ({ 
      absolute:true,
      overlay: false,  
      timeoutPesan:2000,
      snackbar: false,
      ipserver: "",
      username: "",
      password: "",
      listCabangServerdc :"",
      port: "",
      jenis_server: "", 
      nama: "",
      kodegudang: "",
      pathdown: "",
      pathserver: "",
      submitted: false,
      errorMessages:"", 
      jenis: [ 
          { id: 'DCI', value: 'DCI'},
          { id: 'DCS', value:'DCS'}
        ],      
  }),
  computed: {
    getCabang() {
      return this.$store.getters.listCabangServerdc;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    saveServer() {
       this.overlay = true
      if(this.$refs.form.validate()){
        const a = this.listCabangServerdc.toString()
        const b = a.split("-")
        const kdcabnya = b[0].trim()

        const datanya = {
          kdcab: kdcabnya,
          kodegudang : this.kodegudang,
          nama : this.nama,
          jenis_server: this.jenis_server.toString(),
          ipserver: this.ipserver,
          username: this.username,
          password: this.password,
          port: this.port,
          pathdown: this.pathdown,
          pathserver: this.pathserver,
        }  

        this.$store
          .dispatch("simpanAddServerDc", datanya)
          .then(() => this.$router.push("/serversdc/list"))
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
          })  
          this.overlay = false
      }else{
          this.overlay = false
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },
  },
  mounted() {
      this.$store.dispatch("getCabangServerdc");
    
  },
  
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
