import axios from "axios";

export default {
  getManDept({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/dep")
        .then(response => {
          commit("set_mandep", response.data.listdata.map((item)=>{
                return {
                  id: item.id, 
                  nama_dep: item.nama_dep, 
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

  simpanAddDep({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/dep/create", payload)
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

  
  simpanUpdateDep({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/dep/update", payload)
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

  deleteDep({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/dep/delete", payload)
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

  getOneDep({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/dep/edit", payload)
        .then(response => { 
            commit("set_loading", false);
            const val = response.data.listdata.map((item)=>{
              return {
                id : item.id, 
                nama_dep: item.nama_dep
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
