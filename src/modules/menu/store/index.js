import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  listDataMenu: [],
  listMainMenu: [],
  listCabangMenu: [],
  listDepMenu: [],
  listJabatanMenu: [], 
  loadingmenu: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
