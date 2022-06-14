import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {
  datavquery: "",
  tableData:[],
  listCabangVquery: [],
  listDepVquery: [],
  listLabelVquery: "",
  loadingvquery: false
};

export default {
  state,
  actions,
  getters,
  mutations
};
