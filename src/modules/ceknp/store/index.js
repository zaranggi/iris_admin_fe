import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listCabangCeknp: [],
  listTokoCeknp: [],
  listDataCeknp_ora: [],
  listDataCeknp_rt: []
};

export default {
  state,
  actions,
  getters,
  mutations
};
