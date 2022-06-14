import axios from "axios";

export default {

  getListCekMtc: async function({ commit }, payload) {
    try {      
          await axios.post("/api/cekmtc", payload).then(response => { 
            
            commit("set_data_cekmtc", response.data.listdata)

          })
          .catch(error => {
              console.log(error)
          })   
    } catch (error) {      
      return (null);
    }
  },

  getSimpanAddMtc: async function(context, payload) {
    try {      
          await axios.post("/api/cekmtc/add", payload).then(() => {  
            return true
          })
          .catch(() => {
            return (null)
          })   
    } catch (error) {      
      return (null);
    }
  },

  getSimpanUpdMtc: async function(context, payload) {
    try {      
          await axios.post("/api/cekmtc/upd", payload).then(() => {  
            return true
          })
          .catch(() => {
            return (null)
          })   
    } catch (error) {      
      return (null);
    }
  },

  getListTokoMtc: async function({ commit }, payload) {
    try {      
          await axios.post("/api/cekmtc/listtoko", payload).then(response => { 
            
            commit("set_data_listoko_mtc", response.data.listdata)

          })
          .catch(error => {
              console.log(error)
          })   
    } catch (error) {      
      return (null);
    }
  },

  getCabangMtc({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_cabang_mtc", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },    

  getCheckTokoMtc: async function(context, payload) {
    try {

      await axios
        .post("/api/cekmtc/checktoko", payload )
        .then(response => {    
          if(response.data.message === "Sukses"){
            return response.data.message;
          }else{
            return "Gagal";
          } 
        })
        
    } catch (error) {
        return "Gagal"
    }

  },

  // REKON Nya 
  getDetailCekMtc: async function({commit}, payload) {
    try {      
      const x = await axios
      .post("/api/cekmtc/detail", payload )
      .then(response => { 
        if(response.data.message === "Sukses"){
          commit("set_cekmtc_mtran_iris", response.data.mtran_iris)
          commit("set_cekmtc_mtran_toko", response.data.mtran_toko)
          commit("set_cekmtc_mstran_iris", response.data.mstran_iris)
          commit("set_cekmtc_mstran_toko", response.data.mstran_toko)
          commit("set_cekmtc_docno_mtran", response.data.docno_loncat_mtran)
          commit("set_cekmtc_docno_mstran", response.data.docno_loncat_mstran)
          commit("set_cekmtc_litrik", response.data.listrik)
          commit("set_cekmtc_paymentpoint", response.data.paymentpoint)
          commit("set_cekmtc_spdmast", response.data.spdmast)
          commit("set_cekmtc_const", response.data.const_toko)
          commit("set_cekmtc_const2", response.data.const_toko2)
          commit("set_cekmtc_plastik", response.data.plastik) 
        }  
        return response.data
      })
      return x
       
    } catch (error) {      
      return "Gagal";
    }
  },
 

};
