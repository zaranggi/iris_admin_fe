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

    <v-card-title>Edit Data Departemen </v-card-title>
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
                v-model="nama_dep"
                :counter="25"
                append-icon="mdi-account-settings" 
                label="Nama Departemen" 
                :rules="[v => !!v || 'Nama Departemen Harus diisi']"
              ></v-text-field> 
                <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveDep">
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
    </v-card>
  </v-row>
  
</v-container>
</template>
 

<script>

export default {
  name: "Tambah",
  data: () => ({  
      nama_dep: "",  
      submitted: false,
      errorMessages:"", 
  }),
  created: function(){
    this.getData();
  },
  computed: { 
    
    loading() {
      return this.$store.getters.loadingmancabang;
    },
  },
  methods: {
    saveDep() {
      if(this.$refs.form.validate()){
        
        const datanya = {
          id: this.$route.params.id,
          nama_dep: this.nama_dep
        };
        this.$store
          .dispatch("simpanUpdateDep", datanya)
          .then(() => this.$router.push("/Dep/list"))
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
        this.$store.dispatch("getOneDep", {id: this.$route.params.id})
          .then(response => {
            let n = response[0]
            this.nama_dep = n.nama_dep
          })
          .catch(e => {
            console.log(e);
          });
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
