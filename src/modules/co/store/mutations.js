export const mutations = {
  set_loading(state, loading) {
    state.loadingco = loading
  }, 
  set_cabang(state, data) {
    state.listCabangCo = data
  }, 
  set_catatanCo(state, data) {
    state.catatanCo = data[0].keterangan
  }, 
  set_coseries(state, data) {
    state.coseries = data
    //console.log(data)
  },  
  set_datatable(state, data) {
    state.datatable = data  
  },   
  set_header(state, data) {
    state.headerCo = data  
  }, 
  set_detailco(state, data) {
    state.detailco = data  
  },  
  set_permasalah(state, data) {
    state.permasalah = data  
    
  },    
};
