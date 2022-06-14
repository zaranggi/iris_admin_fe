import axios from "axios";

export default {

  getRekonstx: async function({ commit }, payload) {
    try {      
          const result = await axios.post("/api/rekonstx", payload)
          commit("set_listDataRekonstx", result.data.listdata)

      }catch (error) {
        return (null);
      }
  },
   
  getCabangRekonstx({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_listCabangRekonstx", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },


};
