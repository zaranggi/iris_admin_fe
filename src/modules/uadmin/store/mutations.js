export const mutations = {
  
  set_uadmin(state, data) {
    state.listusers = data
  }, 
  
  set_cabang(state, data) {
    state.listCabang = data
  },  
  set_dep(state, data) {
    state.listDep = data
  },
  set_jabatan(state, data) {
    state.listJabatan = data
  }, 
  set_loading(state, loading) {
    state.loading = loading
  },
  
  set_listmenuclient(state, data) {
    
    state.listmenuclient = data
  },
  set_listmenuadmin(state, data) {
    
    state.listmenuadmin = data
  },
  set_onelistmenuclient(state, data) {
    
    state.onelistmenuclient = data
  },
  set_onelistmenuadmin(state, data) {
    
    state.onelistmenuadmin = data
  },
};
