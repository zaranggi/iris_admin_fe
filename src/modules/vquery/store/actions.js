import axios from "axios";

export default {

  selectQuery: async function({ commit }, payload) {
    commit("set_loading_vquery", true);
    try {  
      const eksekusi_query = async (looper,payload) => { 
        const a =[]
        //const b =[]
        
        for (const item of looper) {
          const datanya = {
            listCabangVquery: item,
            datavquery: payload.datavquery,
          }
          a.push(await axios.post("/api/vquery/selectquery", datanya).then(responsequery => { 
            if(responsequery.data.listdata != "Gagal" || responsequery.data.listdata != "Error"){ 
              return responsequery.data.listdata 
            }else{
              a.push([])
            }
          })
          .catch(error => {
            a.push([])
            console.log("ERROR IRIS: "+error)
            return true
            
          })) 
        } 
        return a 
      } 

      const looper = payload.listCabangVquery.split(",") 
      await eksekusi_query(looper,payload).then(data => {    
        const tampung = []
        for (const innya of data) {
          innya.length > 0 ? innya.forEach(e => {
            tampung.push(e)
          }) : [];
        } 
        commit("set_tableData", tampung)
        commit("set_loading_vquery", false)   
      })   

    } catch (error) {
      commit("set_loading_vquery", false) 
      console.log(error);
      return (null);
    }
  },

  ticketQuery: async function( context , payload) {
    try {        
      await axios.post("/api/ticket/add", payload).then(() => { 
        return true
      }) 
      
    } catch (error) {
      return (null);
    }
  },
  getLabelQuery({ commit }) {
    commit("set_loading_vquery", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getlabel")
        .then(response => {
          commit("set_label_vquery", response.data.listdata);
          commit("set_loading_vquery", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_vquery", false)
          reject(err);
        });
    });
  },
  getCabangVquery({ commit }, payload) {
    commit("set_loading_vquery", true)
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload)
        .then(response => {
          commit("set_cabang_vquery", response.data.listcabang);
          commit("set_loading_vquery", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_vquery", false)
          reject(err);
        });
    });
  },
  
  getDepVquery({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/vquery/dep", payload)
        .then(response => {
          commit("set_dep_vquery", response.data.listdata.map((item)=>{
            return {
              id: item.id, 
              nama_dep: item.nama_dep,
            }
        })
      ); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  
};
