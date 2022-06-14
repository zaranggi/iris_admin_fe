import axios from "axios";

export default {

  getHareis: async function({ commit }, payload) {
    commit("set_loading_mdata", true);
    try {     

          await axios.post("/cekmonitmaster", payload).then(response => { 
            commit("set_data_master_iris", response.data.listdata.map((item)=>{
                return {
                  kdcab: item.kdcab,
                  kdtk: item.kdtk,
                  nama: item.nama,
                  tglbuka: item.tglbuka,
                  amgr_name: item.amgr_name,
                  aspv_name: item.aspv_name,
                }
              })
            )
          })
          .catch(error => {
              console.log(error.response)
          }) 
                      
          const eksekusi_eis = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/cekhareis", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
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
                      proses: item.proses
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
          await eksekusi_eis(looper,payload).then(data => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            commit("set_data_iris_monit", tampung)
          })
          
          const eksekusi_file = async (looper,payload) => { 
            const a =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              a.push(await axios.post("/cekhareisfile", datanya).then(responseEis => { 
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
           
          await commit("set_data_view_gab_iris")
          await commit("set_loading_mdata", false)

    } catch (error) {
      commit("set_loading_mdata", false) 
      console.log(error);
      return (null);
    }
  },
   
  getCabangMdata({ commit }, payload) {
    commit("set_loading_mdata", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/getcabanguser", payload )
        .then(response => {
          commit("set_cabang_mdata", response.data.listcabang);
          commit("set_loading_mdata", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_mdata", false)
          reject(err);
        });
    });
  },


};
