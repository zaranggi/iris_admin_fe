export const mutations = {
  set_loading_iris(state, loading) {
    state.loadinghareis = loading
  },
  set_data_master_iris(state, data) {
    state.listDataMonitMasterIris = data 
    
  }, 
  // EIS Cabang
  set_data_iris_monit(state, data) {    
    state.listDataHareis = data 
  },  
  set_data_iris_file(state, data) {    
    state.listDataPerfileGabIris = data 
  },  

  set_data_view_gab_iris(state) {
    if(state.listDataHareis === undefined){
      state.listDataHareis = []
    }
    state.listDataMonitGabIris = state.listDataHareis
    
    var sudah = state.listDataMonitGabIris.filter(item => item.proses === 'Sudah Proses').length; 
    var belum = state.listDataMonitGabIris.filter(item => item.proses === 'Belum Proses').length; 

    var sudah_dt = state.listDataMonitGabIris.filter(item => item.proses_dt === 'Sudah Proses').length; 
    var belum_dt = state.listDataMonitGabIris.filter(item => item.proses_dt === 'Belum Proses').length; 

   /*  var ket_ts = state.listDataMonitGabIris[0].ket_ts
    var ket_lr = state.listDataMonitGabIris[0].ket_lr */
    
    state.rekapBelumProsesIris = state.listDataMonitGabIris.filter(item => item.proses === 'Belum Proses')
    state.rekapBelumProsesIrisDT = state.listDataMonitGabIris.filter(item => item.proses_dt === 'Belum Proses')

    state.sudahHareis = sudah
    state.belumHareis = belum
    state.sudahHareisDT = sudah_dt
    state.belumHareisDT = belum_dt 
   
    state.tokoAktif = sudah + belum
    
  }, 

  set_cabang(state, data) {
    state.listCabangHareis = data
  }, 
  
  set_data_ts_iris(state, data) {
    state.listTS = data
    state.tokoTS = data.length
    
  }, 
  set_data_lr_iris(state, data) {
    state.listLR = data
    state.tokoLR = data.length
    
  },  
  set_rekap_irisx(state, data) {
    state.listRekapHarIRIS = data.sort((a, b) => a.belum - b.belum).reverse()
  },  
};
