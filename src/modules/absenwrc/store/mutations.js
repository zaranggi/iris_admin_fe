export const mutations = {
  set_loading_wrc(state, loading) {
    state.loadingWrc = loading
  }, 
  // WRC Cabang
  set_data_wrc(state, data) {    
    state.listDataWrc = data 
  },  
  set_cabang_wrc(state, data) {
    state.listCabangWrc = data
  },  
};
