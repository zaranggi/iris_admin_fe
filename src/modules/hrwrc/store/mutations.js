export const mutations = {
  set_loading(state, loading) {
    state.loadingharwrc = loading
  },
  set_data_wrc(state, data) {
    state.listDataHarwrc = data

    const sudah = data.filter(item => item.proses_dt === 'Sudah Proses' || item.proses_wt === 'Sudah Proses' || item.proses_st === 'Sudah Proses').length; 
    const belum = data.filter(item => item.proses_dt === 'Belum Proses' || item.proses_wt === 'Belum Proses' || item.proses_st === 'Belum Proses').length; 
    
    state.listDataHarwrc = data.filter(item => item.proses_dt === 'Belum Proses' || item.proses_wt === 'Belum Proses' || item.proses_st === 'Belum Proses')
    
    state.sudahHarwrc = sudah
    state.belumHarwrc = belum
  }, 
  set_cabang(state, data) {
    state.listCabangHarwrc = data
  },  
  set_rekap_wrc(state, data) {
    state.listRekapHarwrc = data.sort((a, b) => a.belum - b.belum).reverse()
  },  
};
