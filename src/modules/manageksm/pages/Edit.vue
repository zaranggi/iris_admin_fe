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

    <v-card-title>Edit Tenant </v-card-title>
    <v-divider class="mx-4"></v-divider>

    <div v-if="!submitted" class="d-flex flex-column ma-4">
      <v-form ref="form" @submit.prevent="onSubmit">
       <v-flex lg12 md12 sm12>
          <v-row dense>

            <v-col cols="12" lg="4">
              <v-select
                class="ma-1 pa-1 mx-4"
                append-icon="mdi-file"
                v-model="status_tenant"
                item-text="id"
                item-value="id"
                :items="status"
                :rules="[v => !!v || 'Status harus di isi']"
                label="Status Tenant"
                required
              ></v-select>
            </v-col>  

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="noksm"
                label="Nomor KSM" 
              ></v-text-field>
            </v-col>  

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                v-model="tanggalAwal"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      label="Periode Awal"
                      v-model="computeAwal"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="periodeAwal"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                v-model="tanggalAkhir"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      label="Periode Akhir"
                      v-model="computeAkhir"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="periodeAkhir"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="item_jual"
                label="Item Jual" 
              ></v-text-field>
            </v-col>  

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="listrik"
                :items="listrik"
                label="Listrik" 
              ></v-text-field>
            </v-col>  
            
            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="computePengajuan"
                      class="ma-1 pa-1 mx-4"
                      label="Tanggal Pengajuan"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="tglPengajuan"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                v-model="ketPengajuan"
                append-icon="mdi-file" 
                label="Ket. Pengajuan" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      v-model="computeProses"
                      label="Tanggal Proses"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="tglProses"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="ketProses"
                label="Ket. Proses" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      v-model="computeExisting"
                      label="Tanggal Existing"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="tglExisting"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="ketExisting"
                label="Ket. Existing" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      v-model="computeBatal"
                      label="Tanggal Batal"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="tglBatal"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                v-model="ketBatal"
                label="Ket. Batal" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="4">
              <v-menu
                class="ma-1 pa-1 mx-4"
                ref="menu"
                :close-on-content-click="false" 
                transition="scale-transition"
                offset-y
                min-width="auto">
                 <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="ma-1 pa-1 mx-4"
                      v-model="computeIlegal"
                      label="Tanggal Ilegal"
                      append-icon="mdi-calendar" 
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                 <v-date-picker
                    v-model="tglIlegal"
                    no-title
                    color="green lighten-1" 
                    @input="tanggal = false"
                  ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="4">
              <v-text-field
               class="ma-1 pa-1 mx-4"
                :counter="25"
                append-icon="mdi-file" 
                label="Ket. Ilegal" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="12">
              <v-btn small color="teal accent-3" 
                  class="d-flex mb-6" @click="saveData">
                <v-icon
                  left
                  dark
                >
                  mdi-cloud-upload
                </v-icon>
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
            <v-btn color="success" >Kembali</v-btn>
          </v-card-actions> 
      </div>
    </v-card>
  </v-row>
  
</v-container>
</template>
 

<script>

export default {
  data : () => ({
    errorMessage : "",
    status_tenant : "",
    noksm : "",
    periodeAwal : "",
    periodeAkhir : "",
    item_jual : "",
    listrik : "0",
    tglPengajuan : "",
    ketPengajuan : "",
    tglProses : "",
    ketProses : "",
    tglExisting : "",
    ketExisting : "",
    tglBatal : "",
    ketBatal : "",
    tglIlegal : "",
    ketIlegal : "",
    submitted : false,
    tanggalAwal : false,
    tanggalAkhir : false,
    status: [
          { id: 'Pengajuan'}, 
          { id: 'Proses'}, 
          { id: 'Existing'}, 
          { id: 'Batal'}, 
          { id: 'Ilegal'}, 
        ]
  }),
  created : function(){
    this.getData();
  },
  computed : {
    loading(){
      return this.$store.getters.loadingksm
    },
    computeAwal(){
      return this.periodeAwal
    },
    computeAkhir(){
      return this.periodeAkhir
    },
    computePengajuan(){
      return this.tglPengajuan
    },
    computeProses(){
      return this.tglProses
    },
    computeExisting(){
      return this.tglExisting
    },
    computeBatal(){
      return this.tglBatal
    },
    computeIlegal(){
      return this.tglIlegal
    }
  },
  methods : {
    saveData(){
      if(this.$refs.form.validate()){
        const datanya = {
          id : this.$route.params.id,
          status_tenant : this.status_tenant,
          noksm : this.noksm,
          periode_awal : this.periodeAwal,
          periode_akhir : this.periodeAkhir,
          item_jual : this.item_jual,
          listrik : this.listrik,
          tgl_pengajuan : this.tglPengajuan,
          ket_pengajuan : this.ketPengajuan,
          tgl_proses : this.tglProses,
          ket_proses : this.ketProses,
          tgl_existing : this.tglExisting,
          ket_existing : this.ketExisting,
          tgl_batal : this.tglBatal,
          ket_batal : this.ketBatal,
          tgl_ilegal : this.tglIlegal,
          ket_ilegal : this.ketIlegal,
        }
        this.$store
            .dispatch("simpanUpdateData", datanya)
            .then(() => this.$router.push("/manageksm/list"))
            .catch((err) => {
              this.errorMessage == err.msg;
              this.snackbar = true;
            })
      }else{
        this.errorMessages = "Data tidak boleh kosong";
        this.snackbar = true;
      }
    },
    getData(){
      this.$store.dispatch("getOneData", {id : this.$route.params.id})
        .then(response => {
          let n = response[0] 
          this.status_tenant = n.status_tenant
          this.toko = n.toko
          this.noksm = n.noksm
          this.item_jual = n.item_jual == '' ? '-' : n.item_jual
          this.listrik = n.listrik == '' ? '0' : n.listrik
          this.periodeAwal = n.periode_awal
          this.periodeAkhir = n.periode_akhir
          this.tglPengajuan = n.tgl_pengajuan
          this.ketPengajuan = n.ket_pengajuan
          this.tglProses = n.tgl_proses
          this.ketProses = n.ket_proses
          this.tglExisting = n.tgl_existing
          this.ketExisting = n.ket_existing
          this.tglBatal = n.tgl_batal
          this.ketBatal = n.ket_batal
          this.tglIlegal = n.tgl_ilegal
          this.ketIlegal = n.ket_ilegal
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted() {
    
  }
  
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
