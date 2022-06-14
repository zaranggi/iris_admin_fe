import axios from "axios"; 

export default { 
   
  getRekonWtJadwal({ commit },payload) { 
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/rekonwt/jadwal", payload )
        .then(response => {   
          commit("set_jadwalRekonWt", response.data.listdata)  
          resolve(response.data.listdata);
        })
        .catch(err => { 
          reject(err);
        });
    });
  }, 

  getCabangRekonWt({ commit }, payload) { 
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getcabanguser", payload )
        .then(response => { 
          commit("set_listCabangRekonWt", response.data.listcabang); 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },  

  saveKeterangan(context, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/rekonwt/simpan", payload )
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  getRekonWt: async function({ commit }, payload) { 
    try {      
          await axios.post("/api/rekonwt/history", payload).then(response => { 
            
            commit("set_listDataRekonwt", response.data.listdata.map((item)=>{
                return {
                  id: item.id, 
                  kdcab: item.kdcab, 
                  kdtk: item.kdtk, 
                  nama_toko: item.nama_toko,
                  bukti_tgl: item.bukti_tgl,
                  bukti_no: item.bukti_no,
                  rtype: item.rtype,
                  istype: item.istype ,
                  sel_total_item: item.sel_total_item,
                  sel_qty: item.sel_qty, 
                  sel_gross: item.sel_gross, 
                  sel_ppn: item.sel_ppn, 
                  sel_gross_jual: item.sel_gross_jual, 
                  sel_ppnrp_idm: item.sel_ppnrp_idm, 
                  sel_disc05: item.sel_disc05,
                  toko: item.toko, 
                  total_item: item.total_item, 
                  qty: item.qty, 
                  gross: item.gross, 
                  ppn: item.ppn, 
                  gross_jual: item.gross_jual, 
                  ppnrp_idm: item.ppnrp_idm, 
                  disc05: item.disc05, 
                  total_item_wt: item.total_item_wt, 
                  qty_wt: item.qty_wt, 
                  gross_wt: item.gross_wt, 
                  ppn_wt: item.ppn_wt, 
                  gross_jual_wt: item.gross_jual_wt, 
                  ppnrp_idm_wt: item.ppnrp_idm_wt, 
                  disc05_wt: item.disc05_wt,
                  nama_user: item.nama_user,
                  keterangan: item.keterangan
                }
              })
            )
          })
          .catch(error => {
              console.log(error.response)
          })   
          

    } catch (error) { 
      console.log(error);
      return (null);
    }
  },
};
