export const mutations = {
  set_loading_variance(state, loading) {
    state.loadingvariance = loading
  }, 
  // EIS Cabang
  set_data_variance(state, data) {    
    state.listDataVariance = data 
  },   
  set_cabang_variance(state, data) {    
    state.listCabangVariance = data 
  },   
};
