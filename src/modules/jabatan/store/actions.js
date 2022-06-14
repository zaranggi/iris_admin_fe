import axios from "axios";

export default {
  getManJabatan({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/jabatan")
        .then(response => {
          commit("set_manjabatan", response.data.listdata.map((item)=>{
                return { 
                  nama_jabatan: item.nama_jabatan, 
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

  simpanAddJabatan({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/jabatan/create", payload)
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

  
  simpanUpdateJabatan({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/jabatan/update", payload)
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

  deleteJabatan({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/jabatan/delete", payload)
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

  getOneJabatan({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/jabatan/edit", payload)
        .then(response => { 
            commit("set_loading", false);
            const val = response.data.listdata.map((item)=>{
              return { 
                id : item.id, 
                nama_jabatan: item.nama_jabatan
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
