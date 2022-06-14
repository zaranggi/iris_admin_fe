import axios from "axios";

export default {
  getNpp({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/mnpp")
        .then(response => {
          commit("set_npp", response.data.listdata.map((item)=>{
                return {
                  kdcab: item.kdcab, 
                  kdtk: item.kdtk, 
                  nama_file: item.nama_file, 
                  addtime: item.addtime, 
                  kirim: item.kirim, 
                  jam_kirim: item.jam_kirim, 
                  actions: item.kdtk
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
 
  resetNpp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/mnpp/update", payload)
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
 
};
