export const mutations = {
  
  set_servers(state, data) {
    state.listDataServer = data
  }, 
  
  set_cabang(state, data) {
    state.listCabangServer = data
  },  
  
  set_loading(state, loading) {
    state.loadingserver = loading
  },
};
