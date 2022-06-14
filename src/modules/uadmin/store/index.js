import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  listusers: [],
  listCabang: [],
  listDep: [],
  listJabatan: [], 
  listmenuclient:[],
  listmenuadmin:[],
  onelistmenuclient:[],
  onelistmenuadmin:[],
  loading: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
