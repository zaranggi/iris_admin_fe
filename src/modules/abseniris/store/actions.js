import axios from "axios";

export default {

  getAbsirisx: async function({ commit }, payload) {
    commit("set_loading_absiris", true);
    try {      
          await axios.post("/api/absiris", payload).then(response => { 
            
            commit("set_data_absiris", response.data.listdata.map((item)=>{
                return {
                  kdcab: item.kdcab,
                  tanggal: item.tanggal,
                  total_toko: item.total_toko,
                  sebelum: item.sebelum,
                  sesudah: item.sesudah,
                  nilai: item.nilai
                }
              })
            )
          })
          .catch(() => { 
          })   
          await commit("set_loading_absiris", false)

    } catch (error) {
      commit("set_loading_absiris", false)  
      return (null);
    }
  },
   
  getCabangAbsiris({ commit }, payload) {
    commit("set_loading_absiris", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_absiris", response.data.listcabang);
          commit("set_loading_absiris", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_absiris", false)
          reject(err);
        });
    });
  },


};
