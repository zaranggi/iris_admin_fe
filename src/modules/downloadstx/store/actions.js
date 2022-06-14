import axios from "axios";

export default {

  getDownloadstx: async function({ commit }, payload) {
    try {      
          const result = await axios.post("/api/downloadstx", payload)
          commit("set_listDataDownloadstx", result.data.listdata)

      }catch (error) {
        return (null);
      }
  },
   
  getCabangDownlaodstx({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_listCabangDownloadstx", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },


};
