import axios from "axios"; 

export default { 
       
  getDataUpdProgAll({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updprog/getall", payload )
        .then(response => {   
          commit("set_updprogall", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

       
  getDataNamaProg({ commit }) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/updprog/namaprog" )
        .then(response => {   
          commit("set_namaprog", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 
  


};
