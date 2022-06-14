import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib'; 

Vue.use(Vuetify); 

const theme = {
    primary: '#1e88e5',
    info: '#1e88e5',
    success: '#21c1d6',
    accent: '#fc4b6c',
    default: '#563dea', 
    anchor: '#8c9eff',
    warning: '#f58f14',
    nama:'#dae3e3'
}

export default new Vuetify({ 
    icons: {
        iconfont: "mdi" || "mdiSvg",
    },
    theme: { 
        themes: {
            dark: theme,
            light: theme   
        }
    },
});
