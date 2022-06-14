import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listDataWrc: [],
  listCabangWrc: [],
  loadingWrc: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
