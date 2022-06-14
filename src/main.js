import Vue from 'vue';
import App from './App.vue';
import instance from  "./plugins/axios";
import vuetify from "./plugins/vuetify";
import router from "./modules/routes";
import store from "./modules/store";
//import './plugins/_base';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import VueApexCharts from 'vue-apexcharts';
import "vue-easytable/libs/theme-default/index.css";
import { VeTable, VePagination, VeIcon, VeLoading, VeLocale } from "vue-easytable"; // import library
import VTooltip from 'v-tooltip'
import JsonCSV from 'vue-json-csv' 
import DatetimePicker from 'vuetify-datetime-picker'
import JsonExcel from "vue-json-excel";

// Loading animation
//import {LoadingPlugin} from "vuetify-loading-overlay" 
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueWordCloud from 'vuewordcloud';

import dateformat from 'dateformat';

Vue.config.productionTip = false;

Vue.filter('formatTgl', function(value) {
  if (value) {
    return dateformat(value, 'yyyy-mm-dd')
  }
})
Vue.filter('formatTglIndo', function(value) {
  if (value) {
    
    return dateformat(value, 'dd-mm-yyyy')
  }
})
Vue.filter('formatSekarang', function(value) {
  if (value) {
    
    return dateformat(value, 'dd-mm-yyyy HH:MM:ss')
  }
})

Vue.component('downloadCsv', JsonCSV)
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueLoading);
Vue.use(DatetimePicker)
Vue.use(VeTable);
Vue.use(VePagination);
Vue.use(VeIcon);
Vue.use(VeLoading);

Vue.use(VTooltip)

Vue.prototype.$veLoading = VeLoading;
Vue.prototype.$veLocale = VeLocale;

Vue.component(VueWordCloud.name, VueWordCloud);

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
instance()

new Vue({
  router,
  store, 
  vuetify,
  render: h => h(App)
}).$mount("#app");
 