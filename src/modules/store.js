import Vue from "vue";
import Vuex from "vuex"; 
import axios from "axios";
import UadminStore from "./uadmin/store";
import MenuStore from "./menu/store";
import MenuAdminStore from "./menuadmin/store";
import StoStore from "./sto/store";
import HrEis from "./hreis/store";
import Hrtampung from "./hrtampung/store";
import HrWrc from "./hrwrc/store";
import Prst from "./prst/store";
import Monitharian from "./monitharian/store";
import ProdsupStore from "./prodsup/store";
import ServerStore from "./servers/store";
import CabangStore from "./cabang/store";
import JabatanStore from "./jabatan/store";
import DepStore from "./dep/store";
import VqueryStore from "./vquery/store";
import TicketStore from "./ticket/store";
import VarianceStore from "./mvariance/store";
import MasterdataStore from "./masterdata/store";
import AbsenwrcStore from "./absenwrc/store";
import AbsenirisStore from "./abseniris/store";
import GlslpvsdtStore from "./glslpvsdt/store";
import GlslpvsbyrStore from "./glslpvsbyr/store";
import GlslpvsmtranStore from "./glslpvsmtran/store";
import MnppStore from "./mnpp/store";
import CoStore from "./co/store";
import CotimStore from "./cotim/store";
import CodashboardStore from "./codashboard/store";
import CodispenStore from "./codispen/store";
import RekonsalesJadwalStore from "./rekonsalesjadwal/store";
import RekonwtJadwalStore from "./rekonwtjadwal/store";
import UpdateTokoStore from "./updatetoko/store";
import UpdateProgramStore from "./updateprogram/store";
import TokoBaruStore from "./tokobaru/store";
import CekMtcStore from "./cekmtc/store";
import RekonwtStore from "./rekonwt/store";
import CodispentiketStore from "./codispentiket/store";
import CodispenmasalStore from "./codispenmasal/store";
import DownloadstxStore from "./downloadstx/store";
import RekonstxStore from "./rekonstx/store";
import RekonbklStore from "./rekonbkl/store";
import SetemailStore from "./setemail/store";
import TicketKategoriStore from "./ticketkategori/store";
import ServersdcStore from "./serversdc/store";
import PbroStore from "./pbro/store";
import PbroreportStore from "./pbroreport/store";
//import UserWaStore from "./userwa/store";
import ceknpStore from "./ceknp/store";
import updprogStore from "./updprog/store";

Vue.use(Vuex);

const state = {
  drawer: true,
  authStatus: "",
  token: localStorage.getItem("token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  loader: false,
  users: JSON.parse(localStorage.getItem("user")) || {},
  Sidebar_drawer: null,
  Customizer_drawer: true,
  SidebarColor: 'white',
  SidebarBg: '',
  vMenu: '',
  fullscreenShow: false,
  fullscreen: false
}


const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios
        .post("/api/login", payload)
        .then(response => {
          const access_token = response.data.token;
          const refresh_token = response.data.refreshToken;
          const user = response.data.user;

          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("user", JSON.stringify(user));

          axios.defaults.headers.common["Authorization"] = 'Bearer ' + access_token;
          commit("auth_success", access_token);
          commit("refresh_success", refresh_token);
          commit("set_users", user);

          resolve(response);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });

  },
  
  saveTokensToStorage: async function({ commit }, payload) { 
    try {     
      localStorage.setItem("token", payload.token);
      localStorage.setItem("refresh_token", payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(payload.user));

      axios.defaults.headers.common["Authorization"] = 'Bearer ' + payload.token;
      commit("auth_success", payload.token);
      commit("refresh_success", payload.refreshToken);
      commit("set_users", payload.user);
        payload

    } catch (error) { 
      return (null);
    }
  },  

  getviewlistmenu: async function({ commit }) { 
    try {     
        const eksekusi_menu = async () => { 
            
            const a = await axios.get("/api/auth/getviewlistmenu").then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      id: item.id,
                      name_menu: item.name_menu,
                      link: item.link,
                      urut: item.urut,
                      id_main: item.id_main,
                      icon: item.icon,
                      ket: item.ket
                    }
                  })

                } 
            })
            .catch(() => { 
              return true
              
            })
          
          return a 
        }  
        await eksekusi_menu().then(data => {  
          const mainmenu = data.filter(item => item.id_main === 0)
          const submenu = data.filter(item => item.id_main != 0)
          const listmenuall = []

          var indexnya = 0
          for (const e of mainmenu) {
            indexnya += 1
              const ceksub = submenu.filter(item => item.id_main === e.id) 
              const subnya = []
              var indexsubnya = 0
              for (const ee of ceksub) {
                indexsubnya += 1
                subnya.push({ title: `${indexnya}.${indexsubnya} - ${ee.name_menu}`, to: ee.link })
              }
              listmenuall.push({
                title: `${indexnya}. ${e.name_menu}`,
                icon: e.icon,
                items: subnya
              })
          } 
                   
          commit("set_vmenu", listmenuall)  
        }) 

    } catch (error) { 
      return (null);
    }
  },  

  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },

  FullscreenToggle: async (context, payload) => {
    context.commit('FULLSCREEN_TOGGLE', payload);
  },
  FullscreenBtn: async (context, payload) => {
    context.commit('FULLSCREEN_BTN', payload);
  },
  TOGGLE_DRAWER({ commit }) {
    commit('toggleDrawer');
  }

}
const getters = {
  DRAWER_STATE: state => !!state.drawer,
  authorized: state => !!state.token,
  token: state => !!state.token,
  refresh_token: state => !!state.refresh_token, 
  authstatus: state => state.authStatus,
  dataUsers: state => state.users,
  vMenu: state => state.vMenu,
  fullscreenBtn: state => state.fullscreen.btn,
  fullscreenShow: state => state.fullscreen,

}
const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  FULLSCREEN_TOGGLE: (state, payload) => {
      state.fullscreen = payload.state;
    },
  FULLSCREEN_BTN: (state, payload) => {
      state.fullscreen.btn = payload.state;
  },
  SET_SETTINGS: (state, payload) => {
    state.fullscreen = payload.fullscreen || state.fullscreen;
  },
  auth_request(state) {
    state.authStatus = "loading";
  },
  auth_success(state, token ) {
    state.authStatus = "success";
    state.token = token;
  },
  refresh_success(state, token ) {
    state.authStatus = "success";
    state.refresh_token = token;
  },
  auth_error(state) {
    state.authStatus = "error";
  },
  logout(state) {
    state.authStatus ="logout"
    state.token = false
  },
  set_users(state, users) {
    state.users =users
  },
  SET_SIDEBAR_DRAWER (state, payload) {
    state.Sidebar_drawer = payload
  },
  SET_CUSTOMIZER_DRAWER (state, payload) {
      state.Customizer_drawer = payload
  },
  SET_SIDEBAR_COLOR (state, payload) {
      state.SidebarColor = payload
  },  
  set_vmenu(state, payload) {
    state.vMenu = payload  
  }, 
}

export default new Vuex.Store({ 
  modules: {
    MenuStore, MenuAdminStore, UadminStore, StoStore , 
    ProdsupStore,
    HrEis , HrWrc, Prst , Monitharian, 
    ServerStore,CabangStore, JabatanStore,DepStore,VqueryStore,
    TicketStore, VarianceStore, MasterdataStore,AbsenwrcStore, AbsenirisStore,
    GlslpvsdtStore, GlslpvsbyrStore,GlslpvsmtranStore,MnppStore,CoStore,CotimStore,CodashboardStore,CodispenStore,
    RekonsalesJadwalStore,RekonwtJadwalStore,UpdateTokoStore,UpdateProgramStore,TokoBaruStore,CekMtcStore,RekonwtStore,
    CodispentiketStore,CodispenmasalStore,DownloadstxStore,RekonstxStore,RekonbklStore,
    SetemailStore,TicketKategoriStore,Hrtampung,ServersdcStore,PbroStore,ceknpStore,PbroreportStore,
    updprogStore
    
  },
  getters,
  mutations,
  state,
  actions  
});
