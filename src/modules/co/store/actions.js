import axios from "axios"; 

export default {
  
  getCo: async function({ commit }, payload) {
    commit("set_loading", true);
    try {      
                      
          const eksekusi_eis = async (item,payload) => { 
            const a =[] 

              const datanya = {
                kdcab: `${item}`,
                tanggal1: payload.tanggal1,
                tanggal2: payload.tanggal2,
              }
              const start = payload.tanggal1.substr(8,2)
              const end = payload.tanggal2.substr(8,2)

              a.push(await axios.post("/api/co", datanya).then( async (responseEis) => { 
                if(responseEis.data.msg != "Data not found"){ 
                  
                  await commit("set_permasalah", responseEis.data.listdata_permasalah.map((item)=>{
                    return { 
                        x: item.MASALAH, y: item.TOTAL
                    } 

                  })) 

                  return responseEis.data.listdata.map((item)=>{
                    var n = []
                    for(var i = start; i<=end; i++){ 

                      if(i.toString().length === 1){
                        n.push({x:`${payload.tanggal1.substr(0,8)}0${i}`, y:item["total_"+i],})
                      }else{
                        n.push({x:`${payload.tanggal1.substr(0,8)}${i}`, y:item["total_"+i]})
                      }
                    }
                    
                    return {
                      name: item.masalah.substr(0,25),
                      data: n
                    }
                  }) 
                 /*  return responseEis.data.listdata.map((item)=>{
                    var n = []
                    for(var i = start; i<=end; i++){ 

                      if(i.toString().length === 1){
                        n.push({y:`program Sales `, x:item["total_"+i],})
                      }else{
                        n.push({y:`program Sales `, x:item["total_"+i]})
                      }
                    }
                    
                    return {
                      name: '2021-06-01',
                      data: n
                    }
                  }) */
                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR Data:"+error)
                return true
                
              })) 
             
            return a[0] 
          }  
 
          const looper = payload.kdcab.replace(/,/g,"','")  
       
          const hasil = await eksekusi_eis(looper,payload)  
          await commit("set_coseries", hasil)
          await commit("set_loading", false)
          return hasil

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  }, 

  
  getPerCabang({ commit },payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/co/copercabang", payload )
        .then(response => {  
          commit("set_datatable", response.data.listdata)
          commit("set_loading", false)
          resolve(response.data.listdata);
        })
        .catch(err => {
          commit("set_loading", false)  
          reject(err);
        });
    });
  },

  getDetailCo({ commit },payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/co/detailco", payload )
        .then(response => {  
          commit("set_detailco", response.data.listdata)
          commit("set_catatanCo", response.data.catatan)
          
          commit("set_loading", false)
          resolve(response.data.listdata);
        })
        .catch(err => {
          commit("set_loading", false)  
          reject(err);
        });
    });
  },

  simpanKeterangan({ commit }, payload) {
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

  getCabangCo({ commit }, payload) {
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
