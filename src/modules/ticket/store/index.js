import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  listDataTicket: [],
  listDataxTicketKategori: [],
  listCabangVqueryTicket:[],
  queryOne: "",   
  loadingTicket: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
