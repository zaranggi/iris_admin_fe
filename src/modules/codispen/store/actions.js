import axios from "axios"; 

export default { 
  
  getCoDispen({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      
      axios
        .post("/api/codispen/", payload )
        .then(response => {   
          commit("set_detailcoDispen", response.data.listdata)          
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCoDispenHist({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      
      axios
        .post("/api/codispen/hist", payload )
        .then(response => {             
          commit("set_detailcoDispenHis", response.data.listdata)          
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangCodispen({ commit }, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_cabang", response.data.listcabang);
          
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  getListUserCo({ commit }, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codispen/getuserco", payload )
        .then(response => { 
          commit("set_listuserco", response.data.listdata);
          
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  simpanAddDispen( context , payload) {
    return new Promise((resolve, reject) => {
      
      axios
        .post("/api/codispen/add", payload)
        .then(response => {
          
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  


};
