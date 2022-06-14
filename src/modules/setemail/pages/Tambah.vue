<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%" color="#ededed" 
  >
     
    <v-card-title>Tambah Data Email Cabang</v-card-title>
    <v-divider class="mx-4"></v-divider>

    <div class="d-flex flex-column ma-4">
      <v-form
        ref="form"
        @submit.prevent="onSubmit"
      >
       <v-flex lg12 md12 sm12>
          <v-row dense>
            <v-col cols="4" xs="12">   
              <v-autocomplete
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home"
                    v-model="listCabangEmail"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabangEmail"
                    :rules="[v => !!v || ' Cabang Harus diisi']"
                    label="Region / Cabang"
                      chips
                      clearable
                      dense
                      small-chips 
                    required
                  >
              </v-autocomplete>
            </v-col>
          </v-row>
              
          <v-row dense>
            <v-col cols="4" xs="12">   
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="email1"
                :counter="50"
                append-icon="mdi-email-outline" 
                label="Email 1" 
                :rules="[v => !!v || 'Email 1 Harus diisi']"
              ></v-text-field>   
            </v-col>  
            <v-col cols="4" xs="12">   
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="email2"
                :counter="50"
                append-icon="mdi-email-outline" 
                label="Email 2" 
              ></v-text-field>   
            </v-col> 
             
            <v-col cols="4" xs="12">   
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="email3"
                :counter="50"
                append-icon="mdi-email-outline" 
                label="Email 3" 
              ></v-text-field>  
            </v-col> 
          </v-row>
          <v-row dense>
            <v-col cols="4" xs="12">   
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="email4"
                :counter="50"
                append-icon="mdi-email-outline" 
                label="Email 4" 
              ></v-text-field>   
            </v-col>
            <v-col cols="4" xs="12">   
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="email5"
                :counter="50"
                append-icon="mdi-email-outline" 
                label="Email 5" 
              ></v-text-field>  
            </v-col> 
          </v-row> 

             
        </v-flex> 

      </v-form>  
      <v-card-actions>
        <v-btn small color="teal accent-3" class="d-flex mb-2" justify="center" @click="saveEmail">
                Simpan
              </v-btn> 
      </v-card-actions> 
      </div>
      <v-overlay :opacity="0.8" :absolute="absolute" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeoutPesan"
        top
        color="amber darken-4"
        text
        elevation="24" 
        >
        {{ errorMessages }} 
         
      </v-snackbar>

    </v-card>
  </v-row>
  
</v-container>
</template>
 

<script>

export default {
  name: "Tambah",
  data: () => ({  
      listCabangEmail: "",
      email1: "",
      email2: "",
      email3: "",
      email4: "", 
      email5: "", 
      snackbar: false, 
      timeoutPesan:3000,
      submitted: false,
      errorMessages:"",   
      absolute:true, 
      overlay: true,
  }),
  computed: {  
    getCabangEmail() {
          return this.$store.getters.listCabangSetemail;
        }, 
  },
  methods: {
    saveEmail() {
      if(this.$refs.form.validate()){  
        this.overlay = true
        const datanya = { 
          kdcab: this.listCabangEmail,
          email1: this.email1,
          email2: this.email2,
          email3: this.email3,
          email4: this.email4,
          email5: this.email5,
        }   
        this.$store
          .dispatch("simpanAddSetemail", datanya)
          .then(() =>{
            this.overlay = false
            this.errorMessages = "Insert Data Sukses";
            this.snackbar = true;
            this.$router.push("/setemail/list")            
            } )
          .catch((err) => {
            this.overlay = false
            this.errorMessages = err.msg;
            this.snackbar = true;
          })  

      }else{
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },
  }, 
  mounted() {
    
      this.$store.dispatch("getCabangEmail").then(
         this.overlay = false
      ).catch(
         this.overlay = false
      );   
       
    
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
