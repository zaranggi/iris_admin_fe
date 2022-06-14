import axios from "axios";

export default {

  getGlslpvsbyr: async function({ commit }, payload) {
    commit("set_loading_glslpvsbyr", true);
    try {      
          await axios.post("/api/glslpvsbyr", payload).then(response => { 
            commit("set_data_glslpvsbyr", response.data.listdata.map((item)=>{
                return {
                  id: item.tanggal+"|"+item.kode_toko+"|"+item.kdcab,
                  tanggal: item.tanggal,
                  kode_toko: item.kode_toko,
                  Diskon_G: item.Diskon_G,
                  Diskon_B: item.Diskon_B,
                  Ppn_G: item.Ppn_G,
                  Ppn_B: item.Ppn_B,
                  Titipan_Supplier: item.Titipan_Supplier,
                  Joint_Promo: item.Joint_Promo,
                  Sel_Diskon: item.Sel_Diskon,
                  Sel_Ppn: item.Sel_Ppn
                }
              })
            )
          })
          .catch(error => {
              console.log(error.response)
          })   
          await commit("set_loading_glslpvsbyr", false)

    } catch (error) {
      commit("set_loading_glslpvsbyr", false) 
      console.log(error);
      return (null);
    }
  },
   
  getCabangGlslpvsbyr({ commit }, payload) {
    commit("set_loading_glslpvsbyr", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_glslpvsbyr", response.data.listcabang);
          commit("set_loading_glslpvsbyr", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_glslpvsbyr", false)
          reject(err);
        });
    });
  },
  
  getDetail({ commit }, payload) {
    commit("set_loading_glslpvsbyr", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/glslpvsbyr/detail", payload )
        .then(response => {
          commit("set_glslpvsbyrdetail", response.data.listdata);
          commit("set_loading_glslpvsbyr", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_glslpvsbyr", false)
          reject(err);
        });
    });
  },


};
