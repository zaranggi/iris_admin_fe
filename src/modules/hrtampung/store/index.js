import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listrekapTampung : [],
  listtokoBelumTampung : [],
  listCabangHrTampung: [],
  TotalTokoHrTampung: 0,
  TotalSudahHrTampung: 0,
  TotalBelumHrTampung: 0
};

export default {
  state,
  actions,
  getters,
  mutations
};
