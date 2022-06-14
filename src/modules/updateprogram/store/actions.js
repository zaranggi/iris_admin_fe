import axios from "axios"; 

export default { 
   
  getJadwalUpdateProgram({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updprogram/jadwal", payload )
        .then(response => {   
          commit("set_jadwalUpdateProgram", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangUpdateProgram({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangUpdateProgram", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 

  simpanAddUpdateProgram( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updprogram/add", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  detailUpdateProgram( {commit} , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updprogram/detail", payload)
        .then(response => {
          commit("set_detailUpdateProgram", response.data.listdata); 
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  


};
