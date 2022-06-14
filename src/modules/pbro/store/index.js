import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  DataHoldPbro: [],
  DataHoldPbroInfoAm: [],
  DataPb30Menit: [], 
  listTokoHold: [],
  listTokoHoldAm: [],  
  listToko30Menit: [], 
  DataDetailItem:[],
  TotalPbroHold: 0, 
  TotalPbro30: 0, 
  TotalPbroGagal: 0, 
  TotalReqPbro: 0, 
};

export default {
  state,
  actions,
  getters,
  mutations
};
