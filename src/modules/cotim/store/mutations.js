export const mutations = {
  set_loading(state, loading) {
    state.loadingcotim = loading
  }, 
  set_cabang(state, data) {
    state.listCabangCotim = data
  },  
  set_cotim(state, data) {
    state.cotim = data  
  }, 
  set_cotim2(state, data) {
    state.cotim2 = data  
  },
  set_personil(state, data) {
    state.listPersonil = data  
  },  
  set_dataPersonil(state, data) {
    state.listdataPersonil = data  
  },  
  set_coPersonilDetail(state, data) {
    console.log(data)
    state.listCoPersonildetail = data  
  },  


  set_footerdata(state, data) {
    state.footerData = data  
    
  },  
  set_footerdata2(state, data) {
    state.footerData2 = data   
  },    
  set_footerDataPersonil(state, data) {
    state.footerDataPersonil = data   
  },    
  
  set_barcotim(state, data) {
    state.barcotim = data  
  },    
  set_coperjam(state, data) {
    state.coperjam = data  
  },       
  set_cosekarang(state, data) {
    state.cosekarang = data  
  }, 
     
  set_totalcobaru(state, data) {
    state.totalcobaru = data  
  },  
  set_totalcoinprogress(state, data) {
    state.totalcoinprogress = data  
  }, 
  set_totalco(state, data) {
    state.totalco = data  
  },  
  set_sesuaisla(state, data) {
    state.sesuaisla = data  
  }, 
  
  set_lewatsla(state, data) {
    state.lewatsla = data  
  }, 
   

};
