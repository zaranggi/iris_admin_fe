import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {   
  listCabangCotim: [], 
  cotim:[],
  cotim2:[],
  //cotimlama:[], 
  footerData:[],
  footerData2:[], 
  footerDataPersonil:[],
  coperjam:[], 
  cosekarang:[],
  sesuaisla:0,
  lewatsla:0,
  totalcobaru: 0 ,
  totalcoinprogress: 0,
  totalco:0, 
  listPersonil: [],
  listCoPersonildetail: [],
  listdataPersonil:[]
};

export default {
  state,
  actions,
  getters,
  mutations
};
