import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listDataHarwrc: [],
  listCabangHarwrc: [],
  listRekapHarwrc: [],
  belumHarwrc: 0,
  sudahHarwrc: 0,
  loadingharwrc: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
