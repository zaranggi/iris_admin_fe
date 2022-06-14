import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listDataPrst: [],
  listCabangPrst: [],
  sudahPr: 0,
  belumPr: 0,
  sudahSt: 0,
  belumSt: 0,
  loadingPrst: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
