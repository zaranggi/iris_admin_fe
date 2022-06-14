import axios from "axios";

export default {
  getTicketList({ commit }, payload) {
    commit("set_loading_ticket", true);
    return new Promise((resolve, reject) => {
      axios
        .post("/api/ticket", payload)
        .then(response => {
          commit("set_data_ticket", response.data.listdata.map((item)=>{ 
                return {
                  id: item.id,
                  notiket: item.id,
                  tanggal: item.tanggal,
                  jenisba: item.jenisba,
                  nama_kategori: item.nama_kategori,
                  nama_cabang: item.nama_cabang,
                  nama_dep: item.nama_dep,
                  ket_label: item.ket_label,
                  nama_users: item.nama_users,
                  ket_status: item.ket_status,
                  keterangan: item.keterangan,
                  keterangan_app1: item.keterangan_app1,
                  tquery: item.tquery,
                  fileba: item.fileba,
                  cabang: item.cabang,
                  actions: item.id
                }
            })
          );
          commit("set_loading_ticket", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_ticket", false)
          reject(err);
        });
    });
  },
 
  getTicketListTertentu({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/ticket/tertentu", payload)
        .then(response => {
          commit("set_data_ticket", response.data.listdata.map((item)=>{ 
                return {
                  id: item.id,
                  notiket: item.id,
                  tanggal: item.tanggal,
                  jenisba: item.jenisba,
                  nama_kategori: item.nama_kategori,
                  nama_cabang: item.nama_cabang,
                  nama_dep: item.nama_dep,
                  ket_label: item.ket_label,
                  nama_users: item.nama_users,
                  ket_status: item.ket_status,
                  keterangan: item.keterangan,
                  keterangan_app1: item.keterangan_app1,
                  tquery: item.tquery,
                  fileba: item.fileba,
                  cabang: item.cabang,
                  actions: item.id
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


  getOneTicket({ commit }, payload) {
    commit("set_loading_ticket", true);
    return new Promise((resolve, reject) => {
      axios
        .post("/api/ticket/edit", payload)
        .then(response => {
          const val =  response.data.listdata.map((item)=>{
            commit("set_q",  item.vquery)
                return { 
                  id: item.id,
                  jenisba: item.jenisba,
                  nama_kategori: item.nama_kategori,
                  notiket: item.id,
                  tanggal: item.tanggal,
                  nama_users: item.nama_users,
                  nama_cabang: item.nama_cabang,
                  nama_dep: item.nama_dep,
                  ket_label: item.ket_label,
                  ket_status: item.ket_status,
                  keterangan: item.keterangan,
                  tquery: item.tquery,
                  vquery: item.vquery,
                  fileba: item.fileba,
                  cabang: item.cabang,
                  app1: item.app1,
                  tgl_app1: item.tgl_app1
                }
            })
          commit("set_loading_ticket", false)
          resolve(val);
        })
        .catch(err => {
          commit("set_loading_ticket", false)
          reject(err);
        });
    });
  }, 

  appTicket: async function( context , payload) { 
    try {             
          const eksekusi_act = async (looper,payload) => { 
            for (const item of looper) {
               
              const datanya = {
                kdcab: item,
                id_tiket:  payload.id_tiket,
                app1:  payload.app1,
                vquery:  payload.vquery,
                kategori:  payload.kategori,
                keterangan_app1:  payload.keterangan_app1
              }
              await axios.post("/api/ticket/approve", datanya).then(responseEis => { 
                if(responseEis.data.message != "Sukses"){ 
                  return true
                } 
              })
              .catch(error => {
                console.log("ERROR IRIS:"+error)
                return true 
              })   
            } 
            return true
          }   
          const looper = payload.cabang.split(",") 
            await eksekusi_act(looper,payload).then(() => {      
          })  


    } catch (error) {  
      return (null);
    }
  },

  uploadFileBa: async (formData) => { 
    try {   
      await axios.post("/api/ticket/uploadba", formData, {}).then(() => {
        return true
      })
      .catch(() => {
        return true
      });

      return "Sukses"

    } catch (error) { 
      console.log(error);
      return (null);
    }
  },
  
  rejectTicket( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/ticket/reject", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getxKategoriTicket({ commit }) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/ticket/kategori")
        .then(response => {
          commit("set_listDataxTicketKategori", response.data.listdata.map((item)=>{
                return {
                  id: item.id, 
                  nama_kategori: item.nama_kategori
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
  
  getCabangVquery({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload)
        .then(response => {
          commit("set_cabang_ticket_act", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 
  

};
