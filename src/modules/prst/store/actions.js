import axios from "axios";

export default {
  
  getPrst({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/cekprst", payload)
        .then(response => { 
          commit("set_data_prst", response.data.listdata.map((item)=>{
              return {
                kdcab: item.kdcab,
                kdtk: item.kdtk,
                nama: item.nama, 
                pr: item.pr,
                st: item.st
              }
            })
          ); 
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  }, 

  getCabangPrst({ commit }, payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/getcabanguser", payload )
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


};
