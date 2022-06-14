import Vue from "vue";
import Router from "vue-router";
//import Login from "@/pages/Login/Login.vue";
//import Login from "@/views/Login.vue";
//import HomePage from "@/components/Layout/Layout";
import store from "./store"
import UadminRoutes from "./uadmin/routes";
import MenuRoutes from "./menu/routes";
import MenuAdminRoutes from "./menuadmin/routes";
import SetemailRoutes from "./setemail/routes";
import ServersRoutes from "./servers/routes";
import ServersdcRoutes from "./serversdc/routes";
import StoRoutes from "./sto/routes";
import HreisRoutes from "./hreis/routes";
import HrwrcRoutes from "./hrwrc/routes";
import PrstRoutes from "./prst/routes";
import MonitharianRoutes from "./monitharian/routes";
import CabangRoutes from "./cabang/routes";
import JabatanRoutes from "./jabatan/routes";
import DepRoutes from "./dep/routes";
import VqueryRoutes from "./vquery/routes";
import TicketRoutes from "./ticket/routes";
import VarianceRoutes from "./mvariance/routes";
import MasterdataRoutes from "./masterdata/routes";
import AbsenwrcRoutes from "./absenwrc/routes";
import AbsenirisRoutes from "./abseniris/routes";
import GlslpvsdtRoutes from "./glslpvsdt/routes";
import GlslpvsbyrRoutes from "./glslpvsbyr/routes";
import GlslpvsmtranRoutes from "./glslpvsmtran/routes";
import MnppRoutes from "./mnpp/routes";
import CoRoutes from "./co/routes";
import CotimRoutes from "./cotim/routes";
import CodashboardRoutes from "./codashboard/routes";
import CodispenRoutes from "./codispen/routes";
import RekonsalesJadwalRoutes from "./rekonsalesjadwal/routes";
import RekonwtJadwalRoutes from "./rekonwtjadwal/routes";
import ProdsupRoutes from "./prodsup/routes";
import UpdateTokoRoutes from "./updatetoko/routes";
import UpdateProgramRoutes  from "./updateprogram/routes";
import TokoBaruRoutes  from "./tokobaru/routes";
import CekMtcRoutes  from "./cekmtc/routes";
import RekonwtRoutes  from "./rekonwt/routes"; 
import CodispentiketRoutes  from "./codispentiket/routes"; 
import CodispenmasalRoutes  from "./codispenmasal/routes"; 
import DownloadstxRoutes  from "./downloadstx/routes";  
import RekonstxRoutes  from "./rekonstx/routes"; 
import RekonbklRoutes  from "./rekonbkl/routes"; 
import TicketKategoriRoutes from "./ticketkategori/routes";
import HrtampungRoutes from "./hrtampung/routes"; 
import PbroRoutes from "./pbro/routes";
import PbroreportRoutes from "./pbroreport/routes";
//import UserWaRoutes from "./userwa/routes"; 
import ceknpRoutes from "./ceknp/routes"; 
import updprogRoutes from "./updprog/routes"; 

Vue.use(Router);

const router = new Router({
  routes: [ 
    {
      path: '/login',
      component: () => import("@/views/Login.vue"),
      meta: {
        name: 'Login',
        requiredAuth: false
      }
    },
    {
      path: "/",      
      component: () => import("@/components/Layout/Layout"),
      meta: {
        name: 'Home',
        requiredAuth: true
      },
      children: [
        ...UadminRoutes,
        ...MenuRoutes,
        ...MenuAdminRoutes,
        ...ServersRoutes,
        ...StoRoutes,
        ...HreisRoutes,  
        ...HrwrcRoutes,  
        ...PrstRoutes,  
        ...MonitharianRoutes,  
        ...CabangRoutes,  
        ...JabatanRoutes,  
        ...DepRoutes,  
        ...VqueryRoutes,  
        ...TicketRoutes,  
        ...VarianceRoutes,
        ...MasterdataRoutes,
        ...AbsenwrcRoutes,
        ...AbsenirisRoutes,
        ...GlslpvsdtRoutes,
        ...GlslpvsbyrRoutes,
        ...MnppRoutes,
        ...CodashboardRoutes,
        ...CoRoutes,
        ...CotimRoutes,
        ...CodispenRoutes,
        ...RekonsalesJadwalRoutes,
        ...RekonwtJadwalRoutes,
        ...GlslpvsmtranRoutes,
        ...ProdsupRoutes,
        ...UpdateTokoRoutes,
        ...UpdateProgramRoutes,
        ...TokoBaruRoutes,
        ...RekonwtRoutes,
        ...CodispentiketRoutes,
        ...CodispenmasalRoutes,
        ...DownloadstxRoutes,
        ...RekonstxRoutes,
        ...RekonbklRoutes,
        ...SetemailRoutes,
        ...TicketKategoriRoutes,
        ...CekMtcRoutes,
        ...HrtampungRoutes,
        ...ServersdcRoutes,
        ...PbroRoutes,
        ...PbroreportRoutes,
        //...UserWaRoutes,
        ...ceknpRoutes,
        ...updprogRoutes
      ]
    }, 
  ],
 
});
  
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters.authorized) {      
      next()
    } else {
      next('/login')
    }
  } else { 
    next()
  }
})
export default router;

