import axios from "axios";

export default {
  getManCabang({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/cabang")
        .then(response => {
          commit("set_mancabang", response.data.listdata.map((item)=>{
                return {
                  kdcab : item.kdcab, 
                  namacabang: item.nama_cabang, 
                  actions: item.id
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
 
  simpanAddCabang({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/cabang/create", payload)
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

  
  simpanUpdateCabang({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/cabang/update", payload)
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

   

  deleteCabang({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/cabang/delete", payload)
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

  getOneCabang({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/cabang/edit", payload)
        .then(response => { 
            commit("set_loading", false);
            const val = response.data.listdata.map((item)=>{
              return {
                kdcab : item.kdcab, 
                id : item.id, 
                namacabang: item.nama_cabang
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
