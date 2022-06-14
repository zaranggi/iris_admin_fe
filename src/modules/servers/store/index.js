import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  listDataServer: [],
  listCabangServer: [], 
  loadingserver: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
