import axios from "axios";

export default {

  getMonitharian: async function({ commit }, payload) {
    commit("set_loading", true);
    try {     

          await axios.post("/api/auth/mastertoko", payload).then(response => { 
            commit("set_data_master", response.data.listdata.map((item)=>{
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
              a.push(await axios.post("/api/monitharian/iris", datanya).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return {
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      absen_eiscab: item.absen
                    }
                  })
                } 
              })
              .catch(error => {
                a.push([])
                console.log("ERROR EIS:"+error)
                return true
                
              })) 
            } 
            return a 
          }

          const eksekusi_wrc = async (looper,payload) => { 
            const b =[]
            //const b =[]
            
            for (const item of looper) {
              const datanya = {
                kdcab: item,
                tanggal: payload.tanggal,
              }
              b.push(await axios.post("/api/monitharian/wrc", datanya).then(responseWrc => { 
                if(responseWrc.data.msg != "Data not found"){ 

                  return responseWrc.data.listdata.map((item)=>{
                    return {
                      kdcab: item.kdcab,
                      kdtk: item.kdtk,
                      nama: item.nama,
                      absen_wrc: item.absen
                    }
                  })

                } 
              })
              .catch(error => {
                b.push([])
                console.log("ERROR WRC:"+error)
                return true
              })) 
            } 
            return b
          }
          const looper = payload.kdcab.split(",")
          
          
          await eksekusi_eis(looper,payload).then(data => {    
            const tampung = []
            for (const innya of data) {
              innya.length > 0 ? innya.forEach(e => {
                tampung.push(e)
              }) : [];
            } 
            commit("set_data_eis_monit", tampung)
          })  
          

          await eksekusi_wrc(looper,payload).then(data => {  
            const tampung = []
            for (const innya of data) {
              innya.forEach(e => {
                tampung.push(e)
              });
            } 
              commit("set_data_wrc_monit", tampung)
          })        
          
          await commit("set_data_view_eis")
          await commit("set_data_view_wrc") 
          await commit("set_data_view_gab")
          await commit("set_loading", false)

    } catch (error) {
      commit("set_loading", false) 
      console.log(error);
      return (null);
    }
  }, 

  getCabangMonitharian({ commit }, payload) {
    commit("set_loading", true) 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguserex", payload )
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
