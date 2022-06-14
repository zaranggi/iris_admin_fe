import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listCabangCo: [], 
  coseries :[],
  datatable:[],
  detailco:[],
  permasalah :[],
  loadingco: true,
  catatanCo: ""
};

export default {
  state,
  actions,
  getters,
  mutations
};
