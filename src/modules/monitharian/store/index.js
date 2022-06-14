import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listDataMonitGab:[],
  listDataMonitMaster:[],
  listDataMonitWrc: [],
  listDataMonitEis: [],
  rlistDataMonitWrc: [],
  rlistDataMonitEis: [],
  listCabangMonitharian: [],
  belumMonitWrc: 0,
  sudahMonitWrc: 0,
  belumMonitEis: 0,
  sudahMonitEis: 0,
  loadingMonitharian: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
