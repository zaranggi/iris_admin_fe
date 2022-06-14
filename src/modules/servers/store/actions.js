import axios from "axios";

export default {
  getListServer({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/servers")
        .then(response => {
          commit("set_servers", response.data.listdata.map((item)=>{
                return {
                  kdcab : item.kdcab,
                  jenis : item.jenis,
                  namacabang: item.namacabang,
                  ipserver: item.ipserver,
                  database: item.database, 
                  user : item.user, 
                  pass : item.pass, 
                  port : item.port, 
                  actions: item.action
                }
            })
          );
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },
  getCabangServer({ commit }) {
    commit("set_loading", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => {
          commit("set_cabang", response.data.listcabang);
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  }, 
  simpanAddServer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/servers/create", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },  
  simpanUpdateServer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/servers/update", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

   

  deleteServer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/servers/delete", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  getOneServer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/servers/edit", payload)
        .then(response => { 
            commit("set_loading", false);
            const val = response.data.listdata.map((item)=>{
              return {
                kdcab : item.kdcab,
                jenis : item.jenis,
                namacabang: item.namacabang,
                ipserver: item.ipserver,
                database: item.database, 
                user : item.user, 
                pass : item.pass, 
                port : item.port, 
                actions: item.action
              }  
            })
            resolve(val);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },
  
};
