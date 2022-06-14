import axios from "axios";

export default {

  getGlslpvsdt: async function({ commit }, payload) { 
    try {      
          await axios.post("/api/glslpvsdt", payload).then(response => { 
            
            commit("set_data_glslpvsdt", response.data.listdata.map((item)=>{
                return {
                  tanggal: item.tanggal,
                  toko: item.toko,
                  nama: item.nama,
                  nama_mgr: item.nama_mgr,
                  nama_spv: item.nama_spv,
                  SEL_DR_CR: item.SEL_DR_CR,
                  SEL_SALES: item.SEL_SALES,
                  SEL_PPN: item.SEL_PPN,
                  SEL_PPN2: item.SEL_PPN2,
                  SEL_HPP: item.SEL_HPP
                }
              })
            )
          })
          .catch(error => {
              console.log(error.response)
          })    

    } catch (error) { 
      console.log(error);
      return (null);
    }
  },
   
  getCabangGlslpvsdt({ commit }, payload) {
    commit("set_loading_glslpvsdt", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_glslpvsdt", response.data.listcabang);
          commit("set_loading_glslpvsdt", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_glslpvsdt", false)
          reject(err);
        });
    });
  },


};
