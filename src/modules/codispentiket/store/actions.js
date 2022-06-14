import axios from "axios"; 

export default { 
  
  getCoDispenTiket({ commit },payload) { 
    return new Promise((resolve, reject) => {  
      axios
        .post("/api/codispentiket/", payload )
        .then(response => {   
          commit("set_detailcoDispenTiket", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 
    
  getCoDispenTiketHist({ commit },payload) { 
    return new Promise((resolve, reject) => {  
      axios
        .post("/api/codispentiket/hist", payload )
        .then(response => {   
          commit("set_detailcoDispenHisTiket", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 
  simpanAddDispenTiket( context , payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codispentiket/add", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  simpanUpdateDispenTiket( context , payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codispentiket/upd", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getCoDispenTiketDetail( context ,payload) { 
    return new Promise((resolve, reject) => {  
      axios
        .post("/api/codispentiket/detail/", payload )
        .then(response => {   
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  


};
