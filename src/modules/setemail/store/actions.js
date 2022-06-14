import axios from "axios";

export default {
  getManSetemail({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/setemail")
        .then(response => {
          commit("set_email", response.data.listdata.map((item)=>{
                return {
                  id: item.kdcab, 
                  nama_cabang: item.nama_cabang, 
                  email1: item.email1, 
                  email2: item.email2, 
                  email3: item.email3, 
                  email4: item.email4, 
                  email5: item.email5, 
                  actions: item.kdcab
                }
            })
          );
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, 

  simpanAddSetemail( contex , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/setemail/create", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  
  simpanUpdateSetemail( context , payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/setemail/update", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  deleteSetemail( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/setemail/delete", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getOneSetemail( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/setemail/edit", payload)
        .then(response => {  
            const val = response.data.listdata.map((item)=>{
              return { 
                kdcab: item.kdcab, 
                email1: item.email1, 
                email2: item.email2, 
                email3: item.email3, 
                email4: item.email4, 
                email5: item.email5
              }  
            })
            resolve(val);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCabangEmail({ commit }) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => {
          commit("set_listcabangEmail", response.data.listcabang.map((item)=>{
            return {
              id: item.id,
              nama_cabang: item.nama_cabang
            }
          })) 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  
};
