import axios from "axios";

export default { 
  getHrTampung: async function({ commit }, payload) {
   
    try {     
          var listTokobelum = []
          
          const eksekusi_eis = async (looper,payload) => { 
            const a =[]
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/api/hrtampung/", datanya).then(responseEis => { 
                if(responseEis.data.message != "Gagal"){ 
                  
                  responseEis.data.listbelum.map((item)=>{
                    
                    listTokobelum.push({ 
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      keterangan: typeof item.keterangan === "undefined" ? '-' : item.keterangan
                    })
                  })

                  return responseEis.data.listrekap.map((item)=>{
 
                    return { 
                      kdcab: item.kdcab,
                      nama: item.nama,
                      total_toko: item.total_toko,
                      sudah: item.sudah,
                      sudah_persen: (item.sudah / item.total_toko * 100).toFixed(2),
                      belum: item.belum,
                      belum_persen: (item.belum / item.total_toko * 100).toFixed(2)
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
          var sum_total_toko = 0
          var sum_sudah = 0
          var sum_belum = 0
          await eksekusi_eis(looper,payload).then( async(data) => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
                sum_total_toko += parseInt(e.total_toko)
                sum_sudah += parseInt(e.sudah)
                sum_belum += parseInt(e.belum)
              }) : [];
            }   
            
            await commit("set_rekap_tampung", tampung)
            await commit("set_data_tokobelum", listTokobelum)
            await commit("set_total_toko", sum_total_toko)
            await commit("set_sudah", sum_sudah)
            await commit("set_belum", sum_belum)
          })
           

    } catch (error) {  
      return (null);
    }
  },
   
  getCabangHrTampung({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_tampung", response.data.listcabang);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
 

};
