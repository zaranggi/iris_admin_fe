import axios from "axios";

export default {
   
  getSto: async function({ commit }, payload) {
    commit("set_loading", true);
    try {      

          const eksekusi_sto = async (looper,payload) => { 
            const a =[] 
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/api/ceksto", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return {
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      nama_spv: item.nama_spv,
                      nama_mgr: item.nama_mgr,
                      sto: item.sto,
                      sto_manual: item.sto_manual,
                      keterangan: item.keterangan
                    }
                  })

                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR Iris:"+error)
                return true
                
              })) 
            } 
            return a 
          }  
          const looper = payload.kdcab.split(",") 
          await eksekusi_sto(looper,payload).then(data => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            commit("set_data_sto", tampung)
          })
           
          await commit("set_loading", false)

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  },

  getCabangUser({ commit }, payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang", response.data.listcabang);
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },


};
