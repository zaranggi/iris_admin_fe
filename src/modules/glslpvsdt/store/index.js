import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listDataGlslpvsdt: [],
  listCabangGlslpvsdt: [],
  loadingGlslpvsdt: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
