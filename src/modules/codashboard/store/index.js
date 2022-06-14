import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const getDefaultState = () => {
  return {   
    listCabangCoDasboard: [],   
    codashboardTable:[], 
    footerDataDasboard:[],
    t_co_baru: 0 ,
    t_co_reopen: 0,
    t_co_inprogress: 0,
    t_co_btutup: 0,
    t_co_stutup: 0,
    t_co_all: 0, 
    detailcoDashboard:[],
    catatanDashboard:"", 
    wordsCO:[],
    codashboardTableBulanan:[], 
    footerDataDasboardBulanan:[],
    t_sla: 0 ,
    t_lsla: 0,
    t_co_bulanan: 0, 
    detailcoDashboardBulanan:[],
    catatanDashboardBulanan:"" 
  }
}
const state = getDefaultState();

export default {
  state,
  actions,
  getters,
  mutations
};
