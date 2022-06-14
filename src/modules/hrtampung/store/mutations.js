export const mutations = {
  set_rekap_tampung(state, data) {
    state.listrekapTampung = data.sort((a, b) => a.belum - b.belum).reverse()
  },

  set_data_tokobelum(state, data) {
    
    state.listtokoBelumTampung = data 
  },
  set_cabang_tampung(state, data) {
    state.listCabangHrTampung = data 
  },
  set_total_toko(state, data) {
    state.TotalTokoHrTampung = data 
  },
  set_sudah(state, data) {
    state.TotalSudahHrTampung = data 
  },
  set_belum(state, data) {
    state.TotalBelumHrTampung = data 
  }

}