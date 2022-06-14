import axios from "axios";

export default { 

    getDataCeknp: async function({ commit }, payload) { 

      try {

        const resx = await axios.post("/api/ceknp/", payload)
        if(resx.data.message != "Error" ){  
            if(resx.data.data.listdata.data_ora.length > 0){
            
              commit("set_data_ceknp", resx.data.data.listdata.data_ora);
              commit("set_data_ceknp2", resx.data.data.listdata.data_rt);

              return "Sukses"
            
            }else{
              return "None"
            } 
        }else{
          return "Error"
        } 

      } catch (error) {
        return "Error"
      }    
            
  },
   
  getCabangCeknp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_ceknp", response.data.listcabang);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  
  getTokoCeknp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/ceknp/listtoko", payload )
        .then(response => {
          commit("set_toko_ceknp", response.data.data.listdata.map((r)=>{
            return {
              toko: r.toko,
              nama: r.nama,
              namatoko: `${r.toko}-${r.nama}`
            }
          }));
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
 

};
