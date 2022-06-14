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

    <v-card-title>Tambah Data User </v-card-title>
    <v-divider class="mx-4"></v-divider>

    <div v-if="!submitted" class="d-flex flex-column ma-4">
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >
       <v-flex lg12 md12 sm12>
          <v-row dense>
            <v-col cols="12" lg="4">
              <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="nik"
                append-icon="mdi-account-settings"
                :counter="10"
                :rules="[v => !!v || 'Nik User Harus diisi']"
                label="Nik"
                required 
              ></v-text-field>
              
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="nama"
                :counter="25"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'Nama User Harus diisi']"
                label="Nama"
                required
              ></v-text-field>
               <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="id_chat"
                :counter="25"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'No HP/WA Harus diisi']"
                label="No HP/WA"
                required
              ></v-text-field>
              <v-text-field
                autocomplete="current-password" 
               class="ma-1 pa-1 mx-4"
                v-model="password"
                label="Password"
                :append-icon="cekpass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (cekpass = !cekpass)"
                :type="cekpass ? 'password' : 'text'"
                :rules="[rules.password]"
                @input="_=>password=_"
              ></v-text-field>  
              <v-text-field 
               class="ma-1 pa-1 mx-4"
                v-model="ip"
                append-icon="mdi-account-settings"
                :rules="[v => !!v || 'IP User Harus diisi']"
                label="Host Akses"
                required 
              ></v-text-field>
           <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-folder-account"
                v-model="priority"
                item-text="nama"
                item-value="id" 
                :items="listpriority"
                :rules="[v => !!v || 'Priority Harus diisi']"
                label="Priority"
                required
              ></v-select> 
               <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-folder-account"
                v-model="akses_toko" 
                :items="listakses_toko"
                item-text="nama"
                item-value="id"
                multiple chips
                :rules="[v => !!v || 'Akses Toko Harus diisi']"
                label="Akses Toko"
                required
              ></v-select> 
               
            </v-col>
            <v-col cols="12" lg="4">
                <v-autocomplete
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-home-map-marker"
                v-model="listCabang"
                item-text="nama_cabang"
                item-value="id"
                :items="getCabang"
                :rules="[v => !!v || 'Cabang Harus diisi']"
                label="Cabang"
                required
              ></v-autocomplete>  
              <v-autocomplete
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-folder-account"
                v-model="listDep"
                item-text="nama_dep"
                item-value="id"
                :items="getDep"
                :rules="[v => !!v || 'Departemen User Harus diisi']"
                label="Departemen"
                required
              ></v-autocomplete> 

              <v-autocomplete
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-account-key"
                v-model="listJabatan"
                item-text="nama_jabatan"
                item-value="id"
                :items="getJabatan"
                :rules="[v => !!v || 'Level User Harus diisi']"
                label="Level User"
                required
              ></v-autocomplete> 
              
                <v-checkbox
                  class="ma-1 pa-1 mx-4"
                  v-model="isadmin"
                  color="primary"
                  label="Admin Page"
                ></v-checkbox>  
                <v-checkbox
                  class="ma-1 pa-1 mx-4"
                  v-model="isactive"
                  color="red"
                  label="Block User"
                ></v-checkbox>  
                 <v-checkbox
                  class="ma-1 pa-1 mx-4"
                  v-model="flag_gabung"
                  color="red"
                  label="Flag Gabung"
                ></v-checkbox>  
                 <v-checkbox
                  class="ma-1 pa-1 mx-4"
                  v-model="ismobile"
                  color="red"
                  label="Akses Mobile "
                ></v-checkbox>  

              <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveUadmin">
                Simpan
              </v-btn>
            </v-col>
             <v-col cols="12" lg="4">
                <v-autocomplete
                  class="ma-1 pa-1 mx-4"
                  prepend-icon="mdi-home-map-marker"
                  v-model="listCabangCover"
                  multiple chips 
                    clearable
                    deletable-chips
                    dense
                  item-text="nama_cabang"
                  item-value="id"
                  :items="getCabangCover"
                  :rules="[v => !!v || 'Cabang Harus diisi']"
                  label="Coverage Cabang"
                  required
                > 
                </v-autocomplete>  
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
      id: null,
      nik: "",id_chat: "",
      nama: "",
      password: "",
      listCabang: "",
      listDep: "",
      listJabatan: "",
      listCabangCover: "", 
      ip:"",
      priority: "",
      akses_toko: [],
      ismobile: false,
      flag_gabung: false,
      isactive: false,
      isadmin: false,
      submitted: false,
      errorMessages:"", 
      cekpass: false, 
      rules: { 
        password: cekpass => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
          return (
            pattern.test(cekpass) ||
            "Min. 8 Karakter mengandung huruf kapital dan Angka"
          );
        }
      },
     listakses_toko: [
        {id:'Reguler', nama:'Reguler'}, 
        {id:'Franchise', nama:'Franchise'}, 
        {id:'Ceriamart', nama:'Ceriamart'}
        ],
      listpriority: [ 
                  {id : "High", nama: "High"}, 
                  {id : "Medium", nama: "Medium"}, 
                  {id : "Low", nama: "Low"}]
      
  }),
  computed: {
    getCabang() {
      return this.$store.getters.listCabang;
    },
    getCabangCover() {
      return this.$store.getters.listCabang;
    },
    getDep() {
      return this.$store.getters.listDep;
    },
    getJabatan() {
      return this.$store.getters.listJabatan;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    saveUadmin() {
      if(this.$refs.form.validate()){
        const datanya = {
        nik: this.nik,
        nama: this.nama,
        id_chat: this.id_chat,
        password: this.password,
        listCabang: this.listCabang,
        listJabatan: this.listJabatan,
        listCabangCover: this.listCabangCover.toString(),
        
        ip: this.ip,
        priority: this.priority,
        akses_toko: this.akses_toko.toString(),

        listDep: this.listDep,
        isactive: this.isactive === false ? 'Y' : 'N',
        isadmin: this.isadmin === true ? 'Y' : 'N',
        flag_gabung: this.flag_gabung === false ? 'Y' : 'N',
        ismobile: this.ismobile === true ? 'Y' : 'N',
        };
        this.$store
          .dispatch("simpanAdd", datanya)
          .then(() => 
            this.$router.push("/uadmin/list")
            //console.log("sukses")
          )
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
          });
      }else{
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },
  },
  mounted() {
    
      this.$store.dispatch("getCabang"); 
      this.$store.dispatch("getDep"); 
      this.$store.dispatch("getJabatan");
       
    
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
