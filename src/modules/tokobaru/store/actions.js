import axios from "axios";

export default {

  getListTokoBaru: async function({ commit }, payload) {
    try {      
          await axios.post("/api/tokobaru", payload).then(response => { 
            
            commit("set_data_toko_baru",  response.data.listdata.map((item)=>{ 
              return {
                kdtk_baru: item.kdcab +"-"+item.kdtk,
                tglbuka: item.tglbuka,
                kdcab: item.kdcab,
                nama: item.nama,
                ip_remote: item.ip_remote,
                nama_user: item.nama_user,
                updtime: item.updtime                 
              }
          }))

          })
          .catch(error => {
              console.log(error)
          })   
    } catch (error) {      
      return (null);
    }
  },
    
  saveKeteranganTokoBaru(context, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/tokobaru/simpan", payload )
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getCheckToko( context , payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/tokobaru/checktoko", payload )
        .then(response => {    
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  getDetailTokoBaru(context, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/tokobaru/detail", payload )
        .then(response => { 
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  getNewTokoBaru( context , payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/tokobaru/getnew", payload )
        .then(response => {    
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },


};
