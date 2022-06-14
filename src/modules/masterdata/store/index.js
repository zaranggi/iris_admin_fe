import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listDataMdata: [],
  listCabangMdata: [], 
  loadingMdata: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
