import axios from "axios";

export default {

  getDataPbro: async function({ commit }) {
    try {      
          await axios.post("/api/pbro").then(res => { 
          
            commit("set_dataholdpbro", res.data.data.datahold.map(
              (item)=>{
                return { 
                  toko: item.toko, 
                  dc: item.dc,
                  addtime: item.addtime, 
                  jam_sent_wa: item.jam_sent_wa, 
                  st: item.st, 
                  nilaipb: item.nilaipb,  
                  avgsales: item.avgsales,  
                  avg_stock_0_persen: `${item.avg_stock_0_persen}%`,
                  stock_0_persen: `${item.stock_0_persen}% `,
                  abs_stock_0_persen: `${item.abs_stock_0_persen}% `,
                  ket_ro: item.ket_ro,
                  actions: item.toko, 
                }
              })
            )
            commit("set_dataholdpbroinfoam", res.data.data.dataholdinfoam.map(
              (item)=>{
                return { 
                  toko: item.toko, 
                  dc: item.dc, 
                  pbro_status: item.pbro_status,  
                  jam_konfirm_am: item.jam_konfirm_am,  
                  jam_konfirm_oto: item.jam_konfirm_oto,   
                  nilaipb: item.nilaipb,  
                  avgsales: item.avgsales,  
                  avg_stock_0_persen: `${item.avg_stock_0_persen}%`,
                  stock_0_persen: `${item.stock_0_persen}%`,
                  abs_stock_0_persen: `${item.abs_stock_0_persen}% `,
                  ket_ro: item.ket_ro,
                  actions: item.toko, 
                  st: item.st
                }
              })
            )
            
            commit("set_datapb30menit", res.data.data.listpb30menit.map(
              (item)=>{
                return { 
                  toko: item.toko, 
                  dc: item.dc, 
                  status: item.status,
                  keterangan: item.keterangan,  
                  difftime: item.difftime.substr(0,8),  
                  time_req: item.time_req,   
                  actions: item.toko, 
                }
              })
            )
            
            commit("set_listtoko30menit", res.data.data.listpb30menit.map(
              (item)=>{
                return { 
                  toko: item.toko
                }
              })
            )
            commit("set_totalpbrohold", res.data.data.totalhold)
            commit("set_listtokohold", res.data.data.listtokohold)
            commit("set_listtokoholdam", res.data.data.listtokoholdam)
            commit("set_totalpbro30", res.data.data.total30menit)
            commit("set_totalpbrogagal", res.data.data.totalgagal) 
            commit("set_totalreqpbro", res.data.data.totalreq)

          })
          .catch(error => {
              console.log(error)
          })   
        } catch (error) {      
          return (null);
        }
  },
    
  simpanKeteranganPbro: async function(context, payload) {
    try {      
          await axios.post("/api/pbro/simpanketerangan", payload)   
          return "Sukses"
    } catch (error) {      
      return (null);
    }
  },
  simpanKeteranganPbroAll: async function(context, payload) {
    try {      
          await axios.post("/api/pbro/simpanketeranganall", payload)   
          return "Sukses"
    } catch (error) {      
      return (null);
    }
  },

  simpanKeteranganPbro30: async function(context, payload) {
    try {      
          await axios.post("/api/pbro/simpanketerangan30", payload)   
          return "Sukses"
    } catch (error) {      
      return (null);
    }
  },
  simpanKeteranganPbroAll30: async function(context, payload) {
    try {      
          await axios.post("/api/pbro/simpanketeranganall30", payload)   
          return "Sukses"
    } catch (error) {      
      return (null);
    }
  },

  cekdetailpbro: async function({ commit }, payload) {
    try {      
          await axios.post("/api/pbro/detail", payload).then(res => { 
          
            commit("set_datadetailitem", res.data.data.listdata.map(
              (item)=>{
                return { 
                  prdcd : item.prdcd, 
                  cek_lpp1 : item.cek_lpp1, 
                  cek_lpp2 : item.cek_lpp2, 
                  stok_h : item.stok_h, 
                  stok_h_1 : item.stok_h_1, 
                  stok_h_2 : item.stok_h_2, 
                  sales_h : item.sales_h, 
                  sales_h_1 : item.sales_h_1, 
                  sales_h_2 : item.sales_h_2, 
                  qty_b_h : item.qty_b_h, 
                  qty_b_h_1 : item.qty_b_h_1, 
                  qty_b_h_2 : item.qty_b_h_2, 
                  qty_k_h : item.qty_k_h, 
                  qty_k_h_1 : item.qty_k_h_1, 
                  qty_k_h_2 : item.qty_k_h_2, 
                  qty_x_h : item.qty_x_h, 
                  qty_x_h_1 : item.qty_x_h_1, 
                  qty_x_h_2 : item.qty_x_h_2, 
                  max_h : item.max_h, 
                  max_h_1 : item.max_h_1, 
                  max_h_2: item.max_h_2
                }
              })
            )  

          })
          .catch(error => {
              console.log(error)
          })   
          return true;
        } catch (error) {      
          return (null);
        }
  },
    

};
