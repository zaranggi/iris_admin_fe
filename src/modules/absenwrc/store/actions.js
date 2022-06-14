import axios from "axios";

export default {

  getAbswrc: async function({ commit }, payload) {
    commit("set_loading_wrc", true);
    try {     

          await axios.post("/api/abswrc", payload).then(response => { 
            commit("set_data_wrc", response.data.listdata.map((item)=>{
                return {
                  cabang: item.cabang,
                  tgldata: item.tgldata,
                  mastertoko: item.mastertoko,
                  jml: item.jml,
                  nilai: item.nilai,
                  persen: item.persen,
                }
              })
            )
          })
          .catch(error => {
              console.log(error.response)
          })   
          await commit("set_loading_wrc", false)

    } catch (error) {
      commit("set_loading_wrc", false) 
      console.log(error);
      return (null);
    }
  },
   
  getCabangWrc({ commit }, payload) {
    commit("set_loading_wrc", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_wrc", response.data.listcabang);
          commit("set_loading_wrc", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_wrc", false)
          reject(err);
        });
    });
  },


};
