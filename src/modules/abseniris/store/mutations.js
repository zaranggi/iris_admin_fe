export const mutations = {
  set_loading_absiris(state, loading) {
    state.loadingAbsIris = loading
  }, 
  // Iris Cabang
  set_data_absiris(state, data) {    
    state.listDataAbsIrisV = data 
     
  },  
  set_cabang_absiris(state, data) {
    state.listCabangAbsIris = data
  },  
};
