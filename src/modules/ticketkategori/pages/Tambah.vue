<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%" 
    color="#ededed" 
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Tambah Data Kategori Ticket</v-card-title>
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
                v-model="nama_kategori"
                :counter="25"
                append-icon="mdi-account-settings" 
                label="Nama Kategori" 
                :rules="[v => !!v || 'Nama Kategori Harus diisi']"
              ></v-text-field>  
               <v-btn small color="teal accent-3" class="d-flex justify-end mb-2" @click="saveTicketKategori">
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
      nama_kategori: "", 
      submitted: false,
      errorMessages:"",   
  }),
  computed: {  
  },
  methods: {
    saveTicketKategori() {
      if(this.$refs.form.validate()){  
        const datanya = { 
        nama_kategori: this.nama_kategori
        }  

        this.$store
          .dispatch("simpanAddTicketKategori", datanya)
          .then(() => this.$router.push("/ticketkategori/list"))
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
          })  

      }else{
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },
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
