import axios from "axios"; 

export default { 
  
  getCoDispenMasal({ commit },payload) { 
    return new Promise((resolve, reject) => {  
      axios
        .post("/api/codispenmasal/", payload )
        .then(response => {   
          commit("set_detailcoDispenMasal", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 
    
  getCoDispenMasalHist({ commit },payload) { 
    return new Promise((resolve, reject) => {  
      axios
        .post("/api/codispenmasal/hist", payload )
        .then(response => {   
          commit("set_detailcoDispenHisMasal", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 
  simpanAddDispenMasal( context , payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codispenmasal/add", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  simpanUpdateDispenMasal( context , payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codispenmasal/upd", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getCoDispenMasalDetail( context ,payload) { 
    return new Promise((resolve, reject) => {  
      console.log(payload)
      axios
        .post("/api/codispenmasal/detail/", payload )
        .then(response => {   
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangCoDispenMasal({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangCoDispenMasal", response.data.listcabang);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },


};
