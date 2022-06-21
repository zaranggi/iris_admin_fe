<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%"
    :loading="loading"
    color="#ededed" 
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Edit Server </v-card-title>
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
                v-model="listCabangServer"
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
                :rules="[v => !!v || 'Jenis Server Harus diisi']"
                label="Jenis Server"
                required
              ></v-select>  
              <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="ipserver"
                append-icon="mdi-account-settings"
                :counter="15"
                :rules="[v => !!v || 'ipserver User Harus diisi']"
                label="IP Server"
                required 
              ></v-text-field>
            </v-col>  
            <v-col cols="12" lg="4">
               <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="database"
                :counter="25"
                append-icon="mdi-account-settings" 
                label="Database" 
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
            Data User Baru Berhasil ditambahkan
          </v-card-title>  
          <v-card-actions>
            <v-btn color="success" @click="kembali">Kembali</v-btn>
          </v-card-actions> 
      </div>
    </v-card>
  </v-row>
  
</v-container>
</template>
 

<script>

export default {
  name: "Tambah",
  data: () => ({    
     ipserver: "",
      jenis_server: "",
      username: "",
      password: "", 
      port: "",
      database: "",
      listCabangServer: "",
      submitted: false,
      errorMessages:"", 
      jenis: [
          { id: 'FTP TAMPUNG', value:'TAMPUNG'}, 
          { id: 'EIS', value: 'EIS'}, 
          { id: 'IRIS',value: 'IRIS'}, 
          { id: 'WRC',value: 'WRC'},
          { id: 'PBRO',value: 'PBRO'},
          { id: 'FTP NPP',value: 'NPP'}
        ],      
  }),
  created: function(){
    this.getData();
  },
  computed: { 
    getCabang() {
      return this.$store.getters.listCabangServer;
    },
   
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    saveServer() {
      if(this.$refs.form.validate()){
        const a = this.listCabangServer.toString()
        const b = a.split("-")
        const kdtknya = b[0].trim()
        const namanya = b[1].trim()

        const datanya = {
          id: this.$route.params.id,
          kdcab: kdtknya,
          namacabang: namanya,
          jenis: this.jenis_server.toString(),
          ipserver: this.ipserver,
          database: this.database,
          user: this.username,
          password: this.password,
          port: this.port,
        };
        this.$store
          .dispatch("simpanUpdateServer", datanya)
          .then(() => this.$router.push("/server/list"))
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
          });
      }else{
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },  
    getData() {
        this.$store.dispatch("getOneServer", {id: this.$route.params.id})
          .then(response => {
            let n = response[0]
            this.listCabangServer = n.namacabang
            this.jenis_server = n.jenis
            this.ipserver = n.ipserver
            this.database = n.database
            this.username = n.user
            this.password = n.pass
            this.port = n.port 
          })
          .catch(e => {
            console.log(e);
          });
    }

  },
  mounted() {
    if(this.$store.getters.listCabangServer.length == 0){
      this.$store.dispatch("getCabangServer");
    } 
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
