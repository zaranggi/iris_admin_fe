import axios from "axios";

export default {
  getManTicketKategori({ commit }) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/ticketkategori")
        .then(response => {
          commit("set_manTicketKategori", response.data.listdata.map((item)=>{
                return {
                  id: item.id, 
                  nama_kategori: item.nama_kategori, 
                  actions: item.id
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

  simpanAddTicketKategori( context, payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/ticketkategori/create", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  
  simpanUpdateTicketKategori( context, payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/ticketkategori/update", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  deleteTicketKategori( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/ticketkategori/delete", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getOneTicketKategori( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/ticketkategori/edit", payload)
        .then(response => {  
            const val = response.data.listdata.map((item)=>{
              return {
                id : item.id, 
                nama_kategori: item.nama_kategori
              }  
            })
            resolve(val);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  
};
