import axios from "axios"; 

export default { 
  
  getRekonsalesJadwal({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/rekonsalesjadwal/", payload )
        .then(response => {   
          commit("set_detailRekonsalesJadwal", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangRekonsalesJadwal({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangRekonsalesJadwal", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 

  simpanAddRekonsalesJadwal( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/rekonsalesjadwal/add", payload)
        .then(response => {
         
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  


};
