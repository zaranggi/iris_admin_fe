<template>

    <v-card width="100%" height="100%" elevation="10" class="rounded-lg">
      <v-card-title> Cek GLSLP Vs BYR Iris </v-card-title>
      <v-divider />  
      <v-card-text > 
        <div class="d-flex flex-column ma-4" >
          <v-form @submit.prevent="handleSubmitGlslpvsbyr">
            <v-flex lg12 md12 sm12>
              <v-row dense justify="center"> 
                <v-col cols="12" lg="4">
                  <v-select
                    class="ma-1 pa-1 mx-4"
                    prepend-icon="mdi-home-map-marker"
                    v-model="listCabangGlslpvsbyr"
                    item-text="nama_cabang"
                    item-value="id"
                    :items="getCabang"
                    :rules="[v => !!v || 'Cabang Harus diisi']"
                    label="Cabang"
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
                        <v-icon :color="listCabangGlslpvsbyr.length > 0 ? 'indigo darken-4' : ''">
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
                  </template></v-select>   
                </v-col> 
                
                <v-col cols="12" lg="3">
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
                          label="Pilih Tanggal"
                          prepend-icon="mdi-calendar" 
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                     <v-date-picker
                        v-model="dateAwal"
                        no-title
                        color="green lighten-1" 
                        @input="tanggal = false"
                      ></v-date-picker>
                    </v-menu>
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

         
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title > <v-icon color="light-green darken-1">mdi-dns</v-icon> Cek BYR
                <v-flex lg12 md12 sm12>
                  <v-row dense > 
                    <v-col class="pa-2" lg="4"> 
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdata" :search="search" mobile-breakpoint="0" 
                  :loading="loading"> 
                    
                    <template v-slot:[`item.id`]="{ item }">
                      <v-icon small color="lime darken-2" class="mr-2" @click="viewDetail(item.id)"  >mdi-magnify</v-icon>
                    </template> 
                    <template v-slot:[`item.Diskon_G`]="{ item }">
                      {{ item.Diskon_G | separator  }}
                    </template>
                     <template v-slot:[`item.Diskon_B`]="{ item }">
                      {{ item.Diskon_B | separator  }}
                    </template>
                     <template v-slot:[`item.Ppn_G`]="{ item }">
                      {{ item.Ppn_G | separator  }}
                    </template>
                    
                     <template v-slot:[`item.Ppn_B`]="{ item }">
                      {{ item.Ppn_B | separator  }}
                    </template>
                     <template v-slot:[`item.Titipan_Supplier`]="{ item }">
                      {{ item.Titipan_Supplier | separator  }}
                    </template>
                     <template v-slot:[`item.Joint_Promo`]="{ item }">
                      {{ item.Joint_Promo | separator  }}
                    </template>
                     <template v-slot:[`item.Sel_Diskon`]="{ item }">
                      {{ item.Sel_Diskon | separator  }}
                    </template>
                     <template v-slot:[`item.Sel_Ppn`]="{ item }">
                      {{ item.Sel_Ppn | separator  }}
                    </template>
                    
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                    </v-alert>
                  </v-data-table> 
                </v-layout> 
              </v-card-text>
              
            </v-card> 
        </div>
      </v-card-text>

      <v-dialog v-model="dialogDetail">
        <v-card class="mx-auto">
          <v-card-text>
             <ve-table 
                fixed-header
                :border-x="true" 
                :border-y="true"
                :max-height="400"   
                :columns="headers2"
                :table-data="listdata2"
                :scroll-width="980"
                row-hover-color="#2fc498"
                row-click-color="#2fc498" 
            /> 
          </v-card-text>  
          <v-card-actions>
            <v-btn color="lime lighten-1" @click="dialogDetail = false">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog> 

      <v-overlay :opacity="0.8" :value="overlay">
        <v-progress-circular :size="70" :width="7" color="cyan accent-2"  style="position:fixed;bottom:50%"  indeterminate>
        </v-progress-circular>
      </v-overlay>
    </v-card>
    
    
</template>

<script>
export default {
  data() {
    return {
      dialogDetail:false,
      search: "",  
      overlay: true,
      dateAwal: new Date().toISOString().substr(0, 10),
      tanggal: false,
      listCabangGlslpvsbyr: "",
      tanggal_detail: "",
      cabang_detail: "",
      toko_detail: "",
      windowWidth: window.innerWidth,  
       
      headers: [
          { 
            text: '',
            value: 'id',
            fixed: true
          },   
          {
            text: 'TOKO', 
            value: 'kode_toko'
          },
          {
            text: 'Diskon_G', 
            value: 'Diskon_G'
          },
          {
            text: 'Ppn_G', 
            value: 'Ppn_G'
          },
          {
            text: 'Ppn_B', 
            value: 'Ppn_B'
          },
          {
            text: 'Titipan_Supplier', 
            value: 'Titipan_Supplier'
          }, 
          {
            text: 'Joint_Promo', 
            value: 'Joint_Promo'
          }, 
          {
            text: 'Sel_Diskon', 
            value: 'Sel_Diskon'
          }, 
          {
            text: 'Sel_Ppn', 
            value: 'Sel_Ppn'
          }, 
        ],
      headers2: [ 
        {field: "tanggal" , key: "tanggal", title: "Tanggal", width: 125, align: "center"},
        {field: "kode_toko" , key: "kode_toko", title: "kode_toko", width: 125, align: "center"},
        {field: "Kode_G" , key: "Kode_G", title: "Kode_G", align: "center"},
        {field: "Kode_B" , key: "Kode_B", title: "Kode_B", align: "center"},
        {field: "nomor" , key: "nomor", title: "nomor",  align: "center",sortBy: ""},
        {field: "Diskon_G" , key: "Diskon_G", title: "NDiskon_G", align: "center",sortBy: ""},
        {field: "Diskon_B" , key: "Diskon_B", title: "Diskon_B",  align: "center",sortBy: ""},
        {field: "Ppn_G" , key: "Ppn_G", title: "Ppn_G",  align: "center",sortBy: ""},
        {field: "Ppn_B" , key: "Ppn_B", title: "Ppn_B",  align: "center",sortBy: ""},
        {field: "Sel_Diskon" , key: "Sel_Diskon", title: "Sel_Diskon", align: "center",sortBy: ""},
        {field: "Sel_Ppn" , key: "Sel_Ppn", title: "Sel_Ppn",  align: "center",sortBy: ""}           
      ],
        
        
    };
  },
  computed: {
    computeTanggal() {
      return this.dateAwal;
    },    
    loading() {
      return this.$store.getters.loadingGlslpvsbyr;
    },   
     
    listdata() {  
      return this.$store.getters.listDataGlslpvsbyr;
    }, 
    listdata2() {  
      return this.$store.getters.glslpvsbyrdetail;
    },       
    getCabang() {
      return this.$store.getters.listCabangGlslpvsbyr;
    },
    isMobile() {
      return this.windowWidth <= 300
    },
    pilihAllCabang () {
        return this.listCabangGlslpvsbyr.length === this.$store.getters.listCabangGlslpvsbyr.length
    },
    pilihSomeCabang () {
        return this.listCabangGlslpvsbyr.length > 0 && !this.$store.getters.listCabangGlslpvsbyr.length
      },
    iconCabang () { 
        if (this.pilihAllCabang) return 'mdi-close-box'
        if (this.pilihSomeCabang) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    }, 
  },
  methods: {  
      handleSubmitGlslpvsbyr(){
        this.overlay = true
        const a = this.listCabangGlslpvsbyr.map((item)=>{ 
          return item.id === undefined ? item : item.id
        })  
        const datanya = {
            kdcab:  a.toString(),
            tanggal: this.dateAwal,
        };
        this.$store.dispatch("getGlslpvsbyr", datanya).then(()=> {
          this.overlay = false
        }).catch(() => {
          this.overlay = false
        })
      },
      toggle () {
          this.$nextTick(() => {
            if (this.pilihAllCabang) {
              this.listCabangGlslpvsbyr = []
            } else {
              this.listCabangGlslpvsbyr = this.$store.getters.listCabangGlslpvsbyr.slice()
            }
          })
      },
      viewDetail(id) {
        console.log(id)
        
        this.tanggal_detail = id.split("|")[0]
        this.toko_detail = id.split("|")[1]
        this.cabang_detail = id.split("|")[2]
        this.dialogDetail = !this.dialogDetail
         const payload = {
            tanggal: this.tanggal_detail,
            kdcab: this.cabang_detail,
            toko: this.toko_detail,
          }; 
        this.$store.dispatch("getDetail", payload).then( () =>{  

        })
      },
      
      
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    }) 
    let dataUser = this.$store.getters.dataUsers
    this.$store.dispatch("getCabangGlslpvsbyr", { kdcab : dataUser.cover});
    this.overlay = false
  },
};
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>