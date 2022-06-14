import axios from "axios"; 

export default { 
  
  getCoDashboard: async function({ commit }, payload) {
    commit("set_loading", true);
    try {      
                      
          const eksekusi = async (payload) => {  
            const namacabang = payload.kdcab.replace(/,/g,"','")  
      
            const datanya = {
              kdcab: `${namacabang}`,
              shift: payload.shift,
              tanggal: payload.tanggal,
            }
              const hasil = await axios.post("/api/codashboard/copercabang", datanya).then( async (response) => {
                if(response.data.msg != "Data not found"){                     
                  commit("set_codashboardTable", response.data.listdata)
                  commit("set_t_co_baru", response.data.total[0].t_co_baru)
                  commit("set_t_co_reopen",  response.data.total[0].t_co_reopen)
                  commit("set_t_co_inprogress",  response.data.total[0].t_co_inprogress)
                  commit("set_t_co_btutup",  response.data.total[0].t_co_btutup)
                  commit("set_t_co_stutup",  response.data.total[0].t_co_stutup)
                  commit("set_t_co_all",  response.data.total[0].t_co_all)
                  return response.data 
                } 
              })
              .catch(error => { 
                console.log("ERROR Data:"+error)
                return true
                
              })
             
            return hasil
          }   
  
          const hasil = await eksekusi(payload)   
          await commit("set_footerDataDasboard", hasil.footer)
          await commit("set_wordsCo", hasil.words) 
          return hasil

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  }, 
 
  getDetailCoDashboard( { commit}  ,payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codashboard/detailco", payload )
        .then(response => {  
          commit("set_detailcoDashboard", response.data.listdata)
          commit("set_catatanDashboard", response.data.catatan[0].keterangan)
           
          resolve(response.data.listdata);
        })
        .catch(err => { 
          
          reject(err);
        });
    });
  },
  
  getDetailCoDashboardBulanan( { commit}  ,payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/codashboard/detailcobulanan", payload )
        .then(response => {  
          commit("set_detailcoDashboardBulanan", response.data.listdata)
          commit("set_catatanDashboardBulanan", response.data.catatan[0].keterangan)
           
          resolve(response.data.listdata);
        })
        .catch(err => { 
          
          reject(err);
        });
    });
  },
  
  getDetailCoDashboardStatusCo({ commit },payload) {
    return new Promise((resolve, reject) => {
      const namacabang = payload.kdcab.replace(/,/g,"','")  
      
      const datanya = {
        kdcab: `${namacabang}`,
        tanggal: payload.tanggal,
        status_co: payload.status_co,
      }

      axios
        .post("/api/codashboard/perstatus", datanya )
        .then(response => {  
          commit("set_detailcoDashboard", response.data.listdata)
          resolve(response.data.listdata);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  
  
  getDetailCoDashboardStatusCoBulanan({ commit },payload) {
    return new Promise((resolve, reject) => {
      const namacabang = payload.kdcab.replace(/,/g,"','")  
      
      const datanya = {
        kdcab: `${namacabang}`,
        tanggal: payload.tanggal,
        status_co: payload.status_co,
      }

      axios
        .post("/api/codashboard/perstatusbulanan", datanya )
        .then(response => {  
          commit("set_detailcoDashboardBulanan", response.data.listdata)
          resolve(response.data.listdata);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getCabangCoDashboard({ commit }, payload) {
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

  simpanKeteranganDashboard({ commit }, payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/co/add", payload )
        .then(response => { 
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  }, 

 
/* ANCHOR===================================== Bulanan ====================*/

getCoDashboardBulanan: async function({ commit }, payload) {
  commit("set_loading", true);
  try {      
                    
        const eksekusi = async (payload) => {  
          const namacabang = payload.kdcab.replace(/,/g,"','")  
    
          const datanya = {
            kdcab: `${namacabang}`,
            shift: payload.shift,
            tanggal: payload.tanggal,
          }
            const hasil = await axios.post("/api/codashboard/copercabangbulanan", datanya).then( async (response) => {
              if(response.data.msg != "Data not found"){   
                
                commit("set_codashboardTableBulanan", response.data.listdata)
                commit("set_t_sla", response.data.total[0].t_sla)
                commit("set_t_lsla",  response.data.total[0].t_lsla) 
                commit("set_t_co_bulanan",  response.data.total[0].t_co_bulanan)
                return response.data 
              } 
            })
            .catch(error => { 
              console.log("ERROR Data:"+error)
              return true
              
            })
           
          return hasil
        }  

        const hasil = await eksekusi(payload)   
        await commit("set_footerDataDasboardBulanan", hasil.footer) 
        return hasil

  } catch (error) {
    commit("set_loading", false) 
    console.log(error);
    return (null);
  }
}, 

};
