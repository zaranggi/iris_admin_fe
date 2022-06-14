import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listCekMtc: [], 
  listCekMtcCabang: [], 
  listCekMtcToko: [], 
  listCekMtc_mtrandetail: [],
  listCekMtc_mtran_iris: [],
  listCekMtc_mtran_toko: [],
  listCekMtc_mstran_iris: [],
  listCekMtc_mstran_toko: [], 
  listCekMtc_docno_mtran: [], 
  listCekMtc_docno_mstran: [], 
  listCekMtc_listrik: [], 
  listCekMtc_paymentpoint: [], 
  listCekMtc_spdmast: [], 
  listCekMtc_const: [],
  listCekMtc_const2: "", 
  listCekMtc_plastik: [], 
};

export default {
  state,
  actions,
  getters,
  mutations
};
