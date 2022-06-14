<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title>  <v-icon color="light-green darken-1">mdi-dns</v-icon>Akses Menu - Iris Client </v-card-title>
      <v-divider />  
      <v-card-text >   
        <div class="d-flex flex-column ma-4">   
            <v-card outlined class="mt-2"> 
              <v-card-text>     
                <v-simple-table>
                   <template v-slot:default>
                    <thead>
                      <tr>
                        <th>
                          <label class="form-checkbox">
                            <input type="checkbox" v-model="selectAll" @click="select">
                            <i class="form-icon"></i>
                          </label>
                        </th>
                        
                        <th>ID Main</th>  
                        <th>Urut</th>  
                        <th>Nama Menu</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in listmenuclient" :key="i.id">
                        
                        <td>   
                          <label class="form-checkbox">
                              <input type="checkbox" :value="i.id" v-model="selected">
                            <i class="form-icon"></i>
                            </label>
                        </td>   
                         <td>   
                           {{i.id_main}}
                        </td>   

                         <td>   
                           {{i.urut}}
                        </td>   

                        <td v-if="i.link ==='#'" class ="font-weight-bold"> {{i.name_menu}}</td>
                        <td v-else><span class="pr-10">{{i.name_menu}}</span></td>

                        <td v-if="i.link ==='#'" class ="font-weight-bold"> {{i.link}}</td>
                        <td v-else>{{i.link}}</td> 
                      </tr>
                    </tbody>  
                  </template>
                </v-simple-table> 
                 <v-btn small color="teal accent-3" class="d-flex justify-end mb-6" @click="saveMenuClient">
                    Simpan
                  </v-btn>
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
        <v-progress-circular :size="70" :width="7" color="cyan accent-2" style="position:fixed;bottom:50%" indeterminate>
        </v-progress-circular>
      </v-overlay> 
    </v-card>
    
    
</template>

<script>
export default {
  data() { 
    return { 
      selected: [],
      selectAll: false,    
      timeoutPesan:2000,  
      snackbar: false,  
      pesan: "", 
      absolute:true,
      search: "",  
      overlay: false,   
      windowWidth: window.innerWidth,
       
    };
  },
  computed: {   
    listmenuclient() {
      return this.$store.getters.listmenuclient;
    },     
    getonelistmenuclient() {
      return this.$store.getters.onelistmenuclient;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }, 
  },
  methods: {  
    loadItemsClient() {  
       this.overlay = true 
       let dataUser = this.$store.getters.dataUsers
       const sendpost = { 
              kdcab:  dataUser.kdcab,
              id_jabatan:  dataUser.id_jabatan,
              id_dep:  dataUser.id_dep
          }

        this.$store.dispatch("getListMenuClientEdit", sendpost).then(() => {
           for (let i in this.getonelistmenuclient) {
            this.selected.push(this.getonelistmenuclient[i].id);
          }
          this.overlay = false
        }).catch( () => {
          this.overlay = false
        })
    }, 
    select() {
			this.selected = [];
			if (!this.selectAll) {
				for (let i in this.listmenuclient) {
					this.selected.push(this.listmenuclient[i].id);
				}
			}
    }, 
    saveMenuClient(){
        this.overlay = true  
        const sendpost = { 
              id: this.$route.params.id,
              id_menu: this.selected.toString()

        }
        this.$store.dispatch("simpanUpdateMenuClient", sendpost).then(() => {
            this.overlay = false
            this.errorMessages = "Update Sukses";
            this.snackbar = true;
            this.$router.push("/uadmin/list")
        }).catch( () => {
          this.overlay = false
          this.errorMessages = "Update Gagal";
          this.snackbar = true;
        })

    }
    
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })  
    const sendpost = { 
              id:  this.$route.params.id,
        }
    this.overlay = true  
    this.$store.dispatch("getOneMenuClientEdit", sendpost).then(() =>{
      this.overlay = false
      this.loadItemsClient()
    }).catch(() => {
      this.overlay = false
    });
 
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
}  
.v-data-table tbody tr:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.12) !important; }
</style>