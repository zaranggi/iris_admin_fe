import axios from "axios";

export default {
   
  getProdsup({ commit }) { 
    return new Promise((resolve, reject) => {
      axios
        .get("/api/prodsup")
        .then(response => {
          commit("set_data_prodsup", response.data.listdata.map((item)=>{
                return {
                  toko: item.toko, 
                  jml_pfe_tidak_sesuai: item.jml_pfe_tidak_sesuai, 
                  jml_item_recid: item.jml_item_recid, 
                  jml_item_aktif: item.jml_item_aktif, 
                  addtime: item.addtime
                }
            })
          ); 
          commit("set_data_prodsup2", response.data.listdata2.map((item)=>{
            return {
              TOKO: item.TOKO, 
              JML: item.JML,
              addtime: item.addtime
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
