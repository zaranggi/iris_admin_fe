import axios from "axios";

export default { 
  getHariris: async function({ commit }, payload) {
    commit("set_loading_iris", true);
    try {     

          var listRekapCabangIRIS = []  
          var toko_ts = []  
          var toko_lr = []      
          const eksekusi_eis = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/api/hariris/", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 

                  responseEis.data.rekapdata.map((item)=>{ 
                    listRekapCabangIRIS.push({ 
                      kdcab: item.kdcab, 
                      total_toko: item.total_toko,
                      sudah: item.sudah,
                      belum: item.belum,
                      sudah_dt: item.sudah_dt,
                      belum_dt: item.belum_dt      
                    })
  
                  })

                  responseEis.data.ts.map((item)=>{ 
                    toko_ts.push({ 
                      kdcab: item.kdcab, 
                      toko: item.toko,
                      namatoko: item.namatoko      
                    }) 
                  })
                  responseEis.data.lr.map((item)=>{ 
                    toko_lr.push({ 
                      kdcab: item.kdcab, 
                      toko: item.toko,
                      namatoko: item.namatoko      
                    }) 
                  })

                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      nama_spv: item.nama_spv,
                      nama_mgr: item.nama_mgr,
                      tglbuka: item.tglbuka,
                      t_proses: item.t_proses,
                      t_belum: item.t_belum,
                      t_proses_dt: item.t_proses_dt,
                      t_belum_dt: item.t_belum_dt,
                      proses: item.proses,
                      proses_dt: item.proses_dt,
                      ket_ts: item.ket_ts,
                      ket_lr: item.ket_lr
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
          await eksekusi_eis(looper,payload).then( async(data) => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            await commit("set_rekap_irisx", listRekapCabangIRIS)
            await commit("set_data_iris_monit", tampung)
          })
          
          const eksekusi_file = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/api/hariris/absenfile", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      nama_cabang: item.nama_cabang,
                      nama_file: item.nama_file,
                      proses_extract: item.proses_extract,
                      proses_load: item.proses_load,
                      pre_summary: item.pre_summary,
                      summary: item.summary,
                      upload_ho: item.upload_ho
                    }
                  })

                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR IRIS File:"+error)
                return true
                
              })) 
            } 
            return a 
          }
           
          await eksekusi_file(looper,payload).then(data => {    
            const tampung2 = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung2.push(e)
              }) : [];
            } 
            commit("set_data_iris_file", tampung2)
          }) 
           
          await commit("set_data_ts_iris",toko_ts)
          await commit("set_data_lr_iris",toko_lr)
          await commit("set_data_view_gab_iris")
          await commit("set_loading_iris", false)

    } catch (error) {
      commit("set_loading_iris", false) 
      console.log(error);
      return (null);
    }
  },
   
  getCabangHareis({ commit }, payload) {
    commit("set_loading_iris", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => {
          commit("set_cabang", response.data.listcabang);
          commit("set_loading_iris", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_iris", false)
          reject(err);
        });
    });
  },

  flagTokoLibur( context , payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/hariris/flagtoko", payload )
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },



};
