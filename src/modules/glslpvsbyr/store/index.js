import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listDataGlslpvsbyr: [],
  listCabangGlslpvsbyr: [],
  glslpvsbyrdetail: [],
  loadingGlslpvsbyr: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
