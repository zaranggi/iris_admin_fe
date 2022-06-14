import axios from "axios"; 

export default { 
   
  getJadwalUpdateToko({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updatetoko/jadwal", payload )
        .then(response => {   
          commit("set_jadwalUpdateToko", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangUpdateToko({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangUpdateToko", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
 

  simpanAddUpdateToko( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updatetoko/add", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },
  simpanUpdUpdateToko( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updatetoko/update", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },

  detailUpdateToko( {commit} , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updatetoko/detail", payload)
        .then(response => {
          commit("set_detailUpdateToko", response.data.listdata); 
          resolve(response);
        })
        .catch(err => {
          
          reject(err);
        });
    });
  },
  getHisUpdateToko({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updatetoko/history", payload )
        .then(response => {   
          commit("set_hisUpdateToko", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  


};
