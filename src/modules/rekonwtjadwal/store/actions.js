import axios from "axios"; 

export default { 
  
  getRekonwtJadwal({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/rekonwtjadwal/", payload )
        .then(response => {   
          commit("set_detailRekonwtJadwal", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangRekonwtJadwal({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangRekonwtJadwal", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 

  simpanAddRekonwtJadwal( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/rekonwtjadwal/add", payload)
        .then(response => {
         
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  


};
