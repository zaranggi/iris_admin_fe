import axios from "axios";

export default {
  getListServersdc({ commit }) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/serversdc")
        .then(response => {
          commit("set_serversdc", response.data.listdata.map((item)=>{
                return {
                  KODE_GUDANG : item.KODE_GUDANG,
                  NAMA: item.NAMA,
                  IP_SERVER : item.IP_SERVER,
                  PORT_SERVER: item.PORT_SERVER,
                  USER_SERVER: item.USER_SERVER, 
                  PASS_SERVER : item.PASS_SERVER,
                  PATH_SERVER : item.PATH_SERVER, 
                  PATH_DOWN : item.PATH_DOWN, 
                  JENIS : item.JENIS,
                  actions: item.ID+'-'+item.KDCAB
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
  getCabangServerdc({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => {
          commit("set_cabangdc", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 
  simpanAddServerDc(context, payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/serversdc/create", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },  
  simpanUpdateServersdc(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/serversdc/update", payload)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
 
  deleteServersdc( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/serversdc/delete", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getOneServersdc( context , payload) {
    return new Promise((resolve, reject) => { 
      axios.post("/api/serversdc/edit", payload)
        .then(response => {  
            const val = response.data.listdata
            resolve( { 
              KDCAB : val.KDCAB,
              KODE_GUDANG : val.KODE_GUDANG,
              NAMA: val.NAMA,
              IP_SERVER : val.IP_SERVER,
              PORT_SERVER: val.PORT_SERVER,
              USER_SERVER: val.USER_SERVER, 
              PASS_SERVER : val.PASS_SERVER,
              PATH_SERVER : val.PATH_SERVER, 
              PATH_DOWN : val.PATH_DOWN, 
              JENIS_SERVER: val.JENIS,
              actions: val.ID+'-'+val.KDCAB
            }  );
        })
        .catch(err => { 
          reject(err);
        }); 
  })    
},
  
};
