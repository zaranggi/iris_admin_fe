import axios from "axios";

export default {

  getGlslpvsmtran: async function({ commit }, payload) {
    try {      
          await axios.post("/api/glslpvsmtran", payload).then(response => { 
            
            commit("set_data_Glslpvsmtran", response.data.listdata)

          })
          .catch(error => {
              console.log(error)
          })   
    } catch (error) {      
      return (null);
    }
  },
   
  getGlslpvsmtranJadwal: async function({ commit }, payload) {
    try {      
          await axios.post("/api/glslpvsmtran/jadwal", payload).then(response => { 
            
            commit("set_data_GlslpvsmtranJadwal", response.data.listdata.map((item)=>{
              
              return {
                tanggal: item.tanggal
              }
            }))
          })
          .catch(error => {
              console.log(error)
          })   
    } catch (error) {      
      return (null);
    }
  },
  
  saveKeterangan(context, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/glslpvsmtran/simpan", payload )
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getCabangGlslpvsmtran({ commit }, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_Glslpvsmtran", response.data.listcabang);
     
          resolve(response);
        })
        .catch(err => {
     
          reject(err);
        });
    });
  },


};
