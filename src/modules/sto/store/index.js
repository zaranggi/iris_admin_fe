import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listData: [],
  listCabangSto: [],
  loadingsto: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
