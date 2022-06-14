<template> 

  <v-sheet elevation="10">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>  
      <v-tab key="report">
        Report Update Program
      </v-tab>  
    </v-tabs> 

    <v-tabs-items v-model="tab">
      <v-tab-item key="report">
        <v-card flat> 
           

          <v-card-text>  
            <div class="d-flex flex-column ma-4" >
            <v-form @submit.prevent="loaddata" ref="form">
              <v-flex lg12 md12 sm12>
                <v-row dense > 
                  <v-col cols="4" offset="2" >
                    <v-select
                      class="ma-1 pa-1 mx-4"
                      prepend-icon="mdi-home-map-marker"
                      v-model="namaprog"
                      item-text="nama_program"
                      item-value="nama_program"
                      :items="getnamaprog"
                      :rules="[v => !!v || 'Nama Program Harus diisi']"
                      label="Nama Program"
                      chips
                      clearable
                      deletable-chips
                      dense 
                      small-chips 
                      required
                    >
                      </v-select>   
                  </v-col> 
                  
                    <v-col cols="4" lg="1" class="ma-1 pa-1 mx-4">
                      <v-btn block color="primary" class="ma-2 white--text" small dark type="submit" >  
                        <v-icon left dark>
                          mdi-magnify
                        </v-icon>
                        Preview
                      </v-btn>
                    </v-col> 
                </v-row>
              </v-flex> 
            </v-form>
          </div>  
          <v-divider></v-divider>
            <v-divider></v-divider>

                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4"> 
                      <download-excel
                        ref="donwloadResultQuery"
                        class= "button is-primary" 
                        :data="listdata" 
                        worksheet="Data" 
                        name="Update Program.xls"
                        >
                        <v-btn color="secondary"  elevation="10">
                          <v-icon color="light-green darken-1">mdi-file-edit</v-icon> 
                          XLS
                        </v-btn>
                      </download-excel>                      
                    </v-col>

                    <v-col class="pa-2 justify-end" lg="4" offset="4"> 
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
              <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" >
                  <template v-slot:[`item.id`]="{ index }">
                    {{ index + 1 }}
                  </template> 
                
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                  </v-alert>
              </v-data-table>
              <v-divider></v-divider>
             
               

          </v-card-text>
        </v-card>
      </v-tab-item>  
    </v-tabs-items>


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
  </v-sheet>
  
</template>

<script> 

//import moment from 'moment';
export default { 
  data() {
    return { 
      namaprog:"",
      fullPage: false,
      absolute:true, 
      snackbar: false,  
      pesan: "",   
      tab: null,       
      search:"",       
      timeoutPesan:3000,      
      headers: [ 
          {text: 'Kdcab', value: 'kdcab',fixed: true }, 
          {text: 'Kdtk', value: 'toko'}, 
          {text: 'Nama', value: 'nama'}, 
          {text: 'Nama Program', value: 'nama_program'}, 
          {text: 'Versi Program', value: 'versi_program'}, 
          {text: 'Last Upd', value: 'addtime'}
      ],  
    } 
  },  
  computed: {   
    computeTanggal() {
      return this.dateAwal;
    },  
    listdata() { 
      return this.$store.getters.detailUpdateProg;
    },  
    getnamaprog() { 
      return this.$store.getters.namaprog;
    },    
     
  },
  methods: { 
         
      loaddata(){ 
         let loading = this.$loading.show({
            color:"#f09000",
            container: this.fullPage ? null : this.$refs.formContainer,
            backgroundColor: "#525252",
            loader: 'dots',
            canCancel: true, 
            onCancel: this.onCancel,
          })
        const dataUser = this.$store.getters.dataUsers
        const datanya = {
              kdcab:  dataUser.cover,
              namaprog:  this.namaprog
        };          
        this.$store.dispatch("getDataUpdProgAll", datanya).then(()=>{
           loading.hide()
        }).catch(() =>{
            loading.hide()
        })
      },  
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })   
      
      let loading = this.$loading.show({
        color:"#f09000",
        container: this.fullPage ? null : this.$refs.formContainer,
        backgroundColor: "#525252",
        loader: 'dots',
        canCancel: true, 
        onCancel: this.onCancel,
      })
          
    this.$store.dispatch("getDataNamaProg").then(()=>{
        loading.hide()
    }).catch(() =>{
        loading.hide()
    })
      
    
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
}     
.v-input {
    font-size: 1.0em;
}

</style> 

<style>
   
.table-header-cell-class {
    background: #42ddf5 !important;
    color: rgb(49, 49, 49) !important;
    text-align: center;
  } 
.table-footer-cell-class1 {
    background: #42ddf5 !important;
    color: rgb(49, 49, 49) !important;
    text-align: center;
    font-weight: bold;
  } 
  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  } 
  .skill-span {
        display: inline-block;
        margin-right: 5px;
        border-radius: 4px;
        color: #333;
        width: 25px;
        text-align: center; 
        font-weight: bold;
    } 
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #fc2841;
  }
</style>
 
 