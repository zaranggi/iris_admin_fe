import actions from "./actions";
import getters from "./getters";
import { mutations } from "./mutations";

const state = {  
  listRekapHarIRIS: [],
  listDataMonitMasterIris:[],
  listDataMonitGabIris:[],
  listDataPerfileGabIris: [],
  rekapBelumProsesIris:[],
  rekapBelumProsesIrisDT:[],
  listDataHareis: [],
  listCabangHareis: [],
  belumHareis: 0,
  sudahHareis: 0,
  belumHareisDT: 0,
  sudahHareisDT: 0,
  tokoTS: 0,
  tokoLR: 0,
  listLR: 0,
  listTS: 0,
  tokoAktif:0,
  loadinghareis: true
};

export default {
  state,
  actions,
  getters,
  mutations
};
