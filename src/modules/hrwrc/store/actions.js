import axios from "axios";

export default {
  
  getHarwrc: async function({ commit }, payload) {
    commit("set_loading", true);
    try {      
          var listRekapCabangWRC = []         
          const eksekusi_eis = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/api/harwrc", datanya).then(responseEis => { 
                if(responseEis.data.mmessagesg != "Data not found"){ 
                  
                  
                  responseEis.data.rekapdata.map((item)=>{ 
                    listRekapCabangWRC.push({ 
                      kdcab: item.kdcab, 
                      total_toko: item.total_toko,
                      sudah: item.tsudah,
                      sudah_persen :  ( parseInt(item.tsudah) /  (parseInt(item.tsudah) + parseInt(item.tbelum)) * 100).toFixed(2),
                      belum: item.tbelum,
                      belum_persen :  ( parseInt(item.tbelum) /  (parseInt(item.tsudah) + parseInt(item.tbelum)) * 100).toFixed(2)
                    })
  
                  })

                
                  return responseEis.data.listdata.map((item)=>{
                    return {
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      proses_dt: item.proses_dt,
                      proses_wt: item.proses_wt,
                      proses_st: item.proses_st,
                      tsudah : item.tsudah,
                      tbelum : item.tbelum 
                    }
                  })
                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR WRC:"+error)
                return true
                
              })) 
            } 
            return a 
          }
 
          const looper = payload.kdcab.split(",")           
          await eksekusi_eis(looper,payload).then( async(data) => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            await commit("set_data_wrc", tampung) 
            await commit("set_rekap_wrc", listRekapCabangWRC)
            
            commit("set_loading", false) 
          })  
            

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  }, 
 
  getCabangHarwrc({ commit }, payload) {
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
