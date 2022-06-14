import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  jadwalUpdateToko:[],
  listCabangUpdateToko:[], 
  detailUpdateToko: [],
  listHistoryUpdateToko:[],
};

export default {
  state,
  actions,
  getters,
  mutations
};
