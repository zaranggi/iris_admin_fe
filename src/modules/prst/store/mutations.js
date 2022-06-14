export const mutations = {
  set_loading(state, loading) {
    state.loadingPrst = loading
  },
  set_data_prst(state, data) {
    state.listDataPrst = data
    var sudahPr = data.filter(item => item.pr === 'Sudah').length; 
    var belumPr = data.filter(item => item.pr === 'Belum').length; 
    var sudahSt = data.filter(item => item.st === 'Sudah').length; 
    var belumSt = data.filter(item => item.st === 'Belum').length; 
    state.sudahPr = sudahPr
    state.belumPr = belumPr
    state.sudahSt = sudahSt
    state.belumSt = belumSt
  }, 
  set_cabang(state, data) {
    state.listCabangPrst = data
  },  
};
