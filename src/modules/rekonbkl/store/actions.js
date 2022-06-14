import axios from "axios";

export default {

  getRekonbkl: async function({ commit }, payload) {
    try {      
          const result = await axios.post("/api/rekonbkl", payload)
          commit("set_listDataRekonbkl", result.data.listdata)

      }catch (error) {
        return (null);
      }
  },
   
  getCabangRekonbkl({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_listCabangRekonbkl", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },


};
