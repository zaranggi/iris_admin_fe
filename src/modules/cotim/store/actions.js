import axios from "axios"; 

export default {
  
  getCotim: async function({ commit }, payload) {
    commit("set_loading", true);
    try {      
                      
          const eksekusi = async (payload) => {  
            const namacabang = payload.kdcab.replace(/,/g,"','")  
      
            const datanya = {
              kdcab: `${namacabang}`,
              kode_cabang: payload.kode_cabang,
              tanggal: payload.tanggal,
              shift: payload.shift,
            }

              const hasil = await axios.post("/api/cotim", datanya).then( async (res) => {
                if(res.data.msg != "Data not found"){   
                  
                  //Untuk tampilan Chart
                  await commit("set_coperjam", res.data.perjam.map((item)=>{
                    return { 
                        x: item.jam, y: item.total
                    }  
                  })) 
                  await commit("set_totalcobaru", Number(res.data.total[0].t_co_baru)) 
                  await commit("set_totalcoinprogress", Number(res.data.total[0].t_co_inprogress)) 
                  await commit("set_totalco", Number(res.data.total[0].t_co_all)) 
                  return res.data 
                } 
              })
              .catch(error => { 
                console.log("ERROR Data:"+error)
                return true
                
              })
             
            return hasil
          }  
  
          const hasil = await eksekusi(payload)  
          await commit("set_cotim", hasil.listdata)
          await commit("set_cotim2", hasil.listdata2)
         
          await commit("set_footerdata", hasil.footerdata)
          await commit("set_footerdata2", hasil.footerdata2)
          await commit("set_loading", false)
          return hasil

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  }, 
    
  getCabangCo({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getPersonil({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/cotim/personil", payload )
        .then(response => {
          commit("set_personil", response.data.listdata); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  
  getCoPersonil: async function({ commit }, payload) { 
    try {      
                      
          const eksekusi = async (payload) => {  
            
              const hasil = await axios.post("/api/cotim/copersonil", payload).then( async (res) => {
                if(res.data.msg != "Data not found"){    
                   
                  await commit("set_dataPersonil", res.data.listdata) 
                  await commit("set_coPersonilDetail", res.data.detail_peruser.map((item)=>{
                    return {
                      no_komplain: item.no_komplain,
                      cabang_lokasi_asal: item.cabang_lokasi_asal,
                      kode_lokasi_asal: item.kode_lokasi_asal,
                      masalah: item.masalah,
                      tanggal_buat: item.tanggal_buat,
                      tanggal_ambil: item.tanggal_ambil,
                      tanggal_selesai: item.tanggal_selesai,
                      durasi_selesai: item.durasi_selesai,
                      diambil_oleh: item.diambil_oleh,
                      deskripsi: item.deskripsi,
                      solusi: item.solusi
                    }
                  })
                )
                  await commit("set_footerDataPersonil", res.data.footerpersonil) 
                  
                  return res.data 
                } 
              })
              .catch(error => { 
                console.log("ERROR Data:"+error)
                return true
                
              })
             
            return hasil
          }   
          await eksekusi(payload)   

          return "Sukses"

    } catch (error) {  
      return (null);
    }
  }, 
    

  


};
