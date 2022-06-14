export const mutations = { 
  set_cabang(state, data) {
    state.listCabangCoDasboard = data
  }, 
  set_catatanDashboard(state, data) {
    state.catatanDashboard = data
  }, 
  set_wordsCo(state, data) {
    
    state.wordsCO = data
  }, 
  set_footerDataDasboard(state, data) {
    state.footerDataDasboard = data 
  },    
  set_t_co_baru(state, data) {
    state.t_co_baru = data
  }, 
  set_t_co_reopen(state, data) {
    state.t_co_reopen = data
  }, 
  set_t_co_inprogress(state, data) {
    state.t_co_inprogress = data
  }, 
  set_t_co_btutup(state, data) {
    state.t_co_btutup = data
  }, 
  set_t_co_stutup(state, data) {
    state.t_co_stutup = data
  },
  set_t_co_all(state, data) {
    state.t_co_all = data
  },
  set_codashboardTable(state, data) {
    state.codashboardTable = data
  },  
  set_detailcoDashboard(state, data) {
    state.detailcoDashboard = data
  },  
  
   //ANCHOR =========================================
   set_catatanDashboardBulanan(state, data) {
    state.catatanDashboardBulanan = data
  }, 
  set_footerDataDasboardBulanan(state, data) {
    state.footerDataDasboardBulanan= data 
  },    
  set_t_sla(state, data) {
    state.t_sla = data
  }, 
  set_t_lsla(state, data) {
    state.t_lsla = data
  }, 
  set_t_co_bulanan(state, data) {
    state.t_co_bulanan = data
  },  
  set_codashboardTableBulanan(state, data) {
    state.codashboardTableBulanan = data
  },  
  
  set_detailcoDashboardBulanan(state, data) {
    state.detailcoDashboardBulanan = data
  }, 
};
