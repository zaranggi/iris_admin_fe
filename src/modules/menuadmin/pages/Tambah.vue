<template>
<v-container fluid>
  <v-row justify="space-between"> 
   <v-card  elevation="10" class="rounded-lg mx-auto"  width="100%"
    :loading="loadingmenu"
    color="#ededed" 
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Tambah Menu Administrator</v-card-title>
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
                v-model="name_menu"
                append-icon="mdi-library"
                :counter="35"
                :rules="[v => !!v || 'Nama Menu Harus diisi']"
                label="Nama Menu"
                required 
              ></v-text-field>
              
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="link"
                :counter="25"
                append-icon="mdi-link-variant"
                :rules="[v => !!v || 'Link Harus diisi']"
                label="Link"
                required
              ></v-text-field> 
              <v-text-field
               class="ma-1 pa-1 mx-4"
                v-model="bp"
                :counter="25"
                append-icon="mdi-link-variant"
                :rules="[v => !!v || 'Blueprints Harus diisi']"
                label="Blueprints"
                required
              ></v-text-field>
              <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-menu"
                v-model="listMainMenuAdmin"
                item-text="name_menu"
                item-value="id"
                :items="getMainMenuAdmin"
                label="Main Menu" 
                clearable 
                dense  
              ></v-select> 
              <v-text-field
                class="ma-1 pa-1 mx-4 mr-2"
                prepend-icon="mdi-menu"
                v-model="urut" 
                label="No Urutan Menu" 
              />
              
            </v-col>
            <v-col cols="12" lg="6">  
                <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-home-map-marker"
                v-model="listCabangMenuAdmin"
                item-text="nama_cabang"
                item-value="id"
                :items="getCabangMenuAdmin"
                :rules="[v => !!v || 'Cabang Harus diisi']"
                label="Akses Cabang"
                chips
                clearable
                deletable-chips
                dense
                multiple
                small-chips 
                required
              >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggle"
                    >
                      <v-list-item-action>
                        <v-icon :color="listCabangMenuAdmin.length > 0 ? 'indigo darken-4' : ''">
                            {{ iconCabang }}
                          </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Select All
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
              </v-select>  


              <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-folder-account"
                v-model="listDepMenuAdmin"
                item-text="nama_dep"
                item-value="id"
                :items="getDepMenuAdmin"
                :rules="[v => !!v || 'Departemen User Harus diisi']"
                label="Akses Departemen"
                chips
                  clearable
                  deletable-chips
                  dense
                  multiple
                  small-chips 
                required
              >
                    <template v-slot:prepend-item>
                      <v-list-item
                        ripple
                        @click="toggle2"
                      >
                        <v-list-item-action>
                          <v-icon :color="listDepMenuAdmin.length > 0 ? 'indigo darken-4' : ''">
                              {{ iconDep }}
                            </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>
                            Select All
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
              </v-select> 

              <v-select
                class="ma-1 pa-1 mx-4"
                prepend-icon="mdi-account-key"
                v-model="listJabatanMenuAdmin"
                item-text="nama_jabatan"
                item-value="id"
                :items="getJabatanMenuAdmin"
                :rules="[v => !!v || 'Level User Harus diisi']"
                label="Level Jabatan"
                  chips
                  clearable
                  deletable-chips
                  dense
                  multiple
                  small-chips 
                required
              >
              <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggle3"
                    >
                      <v-list-item-action>
                        <v-icon :color="listJabatanMenuAdmin.length > 0 ? 'indigo darken-4' : ''">
                            {{ iconJabatan }}
                          </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Select All
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
              
              
              
              </v-select> 
                <v-checkbox
                  class="ma-1 pa-1 mx-4"
                  v-model="active"
                  color="red"
                  label="Aktifkan Menu ?"
                ></v-checkbox>  
              <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveMenu">
                Simpan
              </v-btn>
            </v-col>
            <v-col cols="12" lg="4">
                
            </v-col>
          </v-row>
        </v-flex>  
      </v-form>
      
      </div>
      <div v-else> 
          <v-card-title>
            Data Menu Baru Berhasil ditambahkan
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
      name_menu: "",
      link: "",
      bp: "",
      urut: "",
      listMainMenuAdmin: "",
      listCabangMenuAdmin: "",
      listDepMenuAdmin: "",
      listJabatanMenuAdmin: "", 
      //listAuthAccess: "", 
      active: false, 
      submitted: false,
      errorMessages:"",  
      kudunomor: v  => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
        return 'Nomor Urut Harus Angka 0-999';
      }, 
  }),
  computed: { 
    getCabangMenuAdmin() {
      return this.$store.getters.listCabangMenuAdmin;
    }, 
    getDepMenuAdmin() {
      return this.$store.getters.listDepMenuAdmin;
    },
    getJabatanMenuAdmin() {
      return this.$store.getters.listJabatanMenuAdmin;
    }, 
    getMainMenuAdmin() {
      return this.$store.getters.listMainMenuAdmin;
    }, 
    /* getlistAuthAccess() {
      return this.$store.getters.listUsersMenu;
    }, */
    loadingmenu() {
      return this.$store.getters.loadingmenuAdmin;
    },
    pilihAllCabang () {
        return this.listCabangMenuAdmin.length === this.$store.getters.listCabangMenuAdmin.length
    },
    pilihSomeCabang () {
        return this.listCabangMenuAdmin.length > 0 && !this.$store.getters.listCabangMenuAdmin.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
    pilihAllDep () {
        return this.listDepMenuAdmin.length === this.$store.getters.listDepMenuAdmin.length
    },
    pilihSomeDep () {
        return this.listDepMenuAdmin.length > 0 && !this.$store.getters.listDepMenuAdmin.length
      },
    iconDep () { 
        if (this.pilihAllDep) return 'mdi-close-box'
        if (this.pilihSomeDep) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
    pilihAllJabatan () {
        return this.listJabatanMenuAdmin.length === this.$store.getters.listJabatanMenuAdmin.length
    },
    pilihSomeJabatan () {
        return this.listJabatanMenuAdmin.length > 0 && !this.$store.getters.listJabatanMenuAdmin.length
      },
    iconJabatan () { 
        if (this.pilihAllJabatan) return 'mdi-close-box'
        if (this.pilihSomeJabatan) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
    saveMenu() {
      if(this.$refs.form.validate()){  
        const a = this.listCabangMenuAdmin.map((item)=>{ 
                return item.id === undefined ? item : item.id
        })  
        const b = this.listDepMenuAdmin.map((item)=>{
                return item.id === undefined ? item : item.id
        })
        const c = this.listJabatanMenuAdmin.map((item)=>{
                return item.id === undefined ? item : item.id
        })  
        const datanya = {
        name_menu: this.name_menu,
        link: this.link,
        bp: this.bp,
        id_main: this.listMainMenuAdmin ==="" ? 0 : this.listMainMenuAdmin,
        urut: this.urut,
        listCabangMenu: a.toString(),
        listDepMenu: b.toString(),
        listJabatanMenu: c.toString(),
        active: this.active === true ? 'Y' : 'N',
        }; 
        console.log(datanya)
         this.$store
          .dispatch("simpanAddMenuAdmin", datanya) 
          .then(() => this.$router.push("/menuadmin/list"))
          .catch((err) => {
            this.errorMessages = err.msg;
            this.snackbar = true;
          }); 
      }else{
          this.errorMessages = "Data tidak boleh kosong";
          this.snackbar = true;
      }
      
    },
    toggle () {
        this.$nextTick(() => {
          if (this.pilihAllCabang) {
            this.listCabangMenuAdmin = []
          } else {
            this.listCabangMenuAdmin = this.$store.getters.listCabangMenuAdmin.slice()
          }
        })
      },
    toggle2 () {
        this.$nextTick(() => {
          if (this.pilihAllDep) {
            this.listDepMenuAdmin = []
          } else {
            this.listDepMenuAdmin = this.$store.getters.listDepMenuAdmin.slice()
          }
        })
      },
      
    toggle3 () {
        this.$nextTick(() => {
          if (this.pilihAllJabatan) {
            this.listJabatanMenuAdmin = ""
          } else {
            this.listJabatanMenuAdmin = this.$store.getters.listJabatanMenuAdmin.slice()
          }
        })
      },
  },
  mounted() {
    
      this.$store.dispatch("getCabangMenuAdmin");  
      this.$store.dispatch("getDepMenuAdmin"); 
      this.$store.dispatch("getMainMenuAdmin"); 
      this.$store.dispatch("getJabatanMenuAdmin");
       
    
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
