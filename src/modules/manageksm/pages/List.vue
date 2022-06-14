<template>
    <v-card width="100%" height="100%" elevation="10" class="rounded-lg" >
      <v-card-title primary-title> Manage KSM</v-card-title>
      <v-divider />
      <v-card-text>
     
        <div class="d-flex flex-column ma-4">  
            <v-card outlined class="mt-2">
              <v-card-title >
                <v-flex lg12 md12 sm12>
                  <v-row dense >
                    <v-col class="mr-auto"> 
                        List Data KSM
                    </v-col>
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
                  <v-data-table :class="['word-wrap']" :headers="headers" :items="listdataksm" :search="search" mobile-breakpoint="0" >
                    <template v-slot:[`item.id`]="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }"> 
                        <v-icon color="green lighten-2" small class="mr-2" @click="editServer(item.actions)">mdi-pencil</v-icon>
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
    </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      myloading: false, 
      windowWidth: window.innerWidth, 
      dialog: false,
      editedItem: {},
      dialogDeleteServer: false,
      itemToDeleteServer: {},
      headers: [{
            text: 'No', 
            value: 'id',
            fixed: true 
          },
          {
            text: 'Toko', 
            value: 'toko',
            fixed: true
          },
          {
            text: 'Nomor KSM', 
            value: 'noksm',
            fixed: true
          },
          {
            text: 'Nama Penyewa', 
            value: 'nama_penyewa',
            fixed: true
          },
          {
            text: 'Nama Tenant', 
            value: 'nama_tenant',
            fixed: true
          }, 
          {
            text: 'Alamat', 
            value: 'alamat'
          },
          {
            text: 'Status Tenant', 
            value: 'status_tenant'
          },
          {
            text: 'Actions', 
            value: 'actions'
          },
        ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }, 
    listdataksm() {
      return this.$store.getters.listDataKsm;
    },  
    isMobile() {
      return this.windowWidth <= 300
    }
  },
  methods: { 
    loadItems() { 
      this.$store.dispatch("getListKsm") 
    },   
    showDeleteDialog(item) {
      this.itemToDeleteServer = item
      this.dialogDeleteServer = !this.dialogDeleteServer
    },
    editServer(id){
      this.$router.push({'name':'manageksm.details', params: { id : id }})
    }
  },
  mounted() {   
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.loadItems()  
  },
}
</script>

<style scoped>
.word-wrap {
  white-space:nowrap;
} 
</style>