export const mutations = {
  
  set_dataholdpbro(state, data) {    
    state.DataHoldPbro = data    
  },  
  set_dataholdpbroinfoam(state, data) {    
    state.DataHoldPbroInfoAm = data    
  },  
  set_datapb30menit(state, data) {    
    state.DataPb30Menit = data    
  },  
  set_datadetailitem(state, data) {    
    state.DataDetailItem = data    
  },  
  set_listtoko30menit(state, data) {  
    state.listToko30Menit = data
  }, 
  set_listtokohold(state, data) {  
    state.listTokoHold = data
  },
  set_listtokoholdam(state, data) {  
    state.listTokoHoldAm = data
  },
  set_totalpbrohold(state, data) {
    state.TotalPbroHold = typeof data[0] === "undefined" ? 0 : data[0].total
  }, 
  set_totalpbro30(state, data) {
    state.TotalPbro30 = typeof data[0] === "undefined" ? 0 : data[0].total
  }, 
  set_totalpbrogagal(state, data) {
    state.TotalPbroGagal = typeof data[0] === "undefined" ? 0 : data[0].total
  }, 
  set_totalreqpbro(state, data) {
    state.TotalReqPbro = typeof data[0] === "undefined" ? 0 : data[0].total
  },  
};
