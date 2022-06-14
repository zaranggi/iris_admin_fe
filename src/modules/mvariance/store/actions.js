import axios from "axios";

export default {


  getVariance: async function({ commit }, payload) {
    commit("set_loading_variance", true);
    try {      

          const eksekusi_variance = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/cekvariance", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      tanggal: item.tanggal,
                      penggantian: item.penggantian,
                      avariance: item.avariance,
                      cashaktual: item.cash
                    }
                  })

                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR IRIS:"+error)
                return true
                
              })) 
            } 
            return a 
          } 

          const looper = payload.kdcab.split(",") 
          await eksekusi_variance(looper,payload).then(data => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            commit("set_data_variance", tampung)
          })
            
          await commit("set_loading_variance", false)

    } catch (error) {
      commit("set_loading_variance", false) 
      console.log(error);
      return (null);
    }
  },
   
  getCabangVariance({ commit }, payload) {
    commit("set_loading_variance", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_variance", response.data.listcabang);
          commit("set_loading_variance", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_variance", false)
          reject(err);
        });
    });
  },


};
