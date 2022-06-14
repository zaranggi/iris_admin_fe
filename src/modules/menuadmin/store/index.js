import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  listDataMenuAdmin: [],
  listMainMenuAdmin: [],
  listCabangMenuAdmin: [],
  listDepMenuAdmin: [],
  listJabatanMenuAdmin: [], 
  loadingmenuAdmin: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
