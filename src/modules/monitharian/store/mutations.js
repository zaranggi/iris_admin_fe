export const mutations = {
  set_loading(state, loading) {
    state.loadingMonitharian = loading
  },
  //master data
  set_data_master(state, data) {
    state.listDataMonitMaster = data 
  }, 
  // EIS Cabang
  set_data_eis_monit(state, data) {    
    state.listDataMonitEis = data 
  }, 
  //  WRC
  set_data_wrc_monit(state, data) {
    state.listDataMonitWrc = data
  }, 
  
  set_data_view_eis(state) {
    const mergeById = (a1, a2) =>
    a1.map(itm => ({
        ...a2.find((item) => (item.kdtk === itm.kdtk) && item),
        ...itm
    }))
    if(state.listDataMonitEis === undefined){
      state.listDataMonitEis = []
    }
    // console.log(state.listDataMonitMaster)
    // console.log(state.listDataMonitEis)
    state.rlistDataMonitEis = mergeById(state.listDataMonitMaster, state.listDataMonitEis) 
    // console.log(state.rlistDataMonitEis)
  },
  set_data_view_wrc(state) {
    const mergeById = (a1, a2) =>
      a1.map(itm => ({
          ...a2.find((item) => (item.kdtk === itm.kdtk) && item),
          ...itm
      }))
      
    if(state.listDataMonitWrc === undefined){
      state.listDataMonitWrc = []
    }
      state.rlistDataMonitWrc = mergeById(state.listDataMonitMaster, state.listDataMonitWrc) 
      // console.log(state.listDataMonitWrc)
      // console.log(state.rlistDataMonitWrc)
  },
  
  set_data_view_gab(state) {
    const mergeById = (a1, a2) =>
      a1.map(itm => ({
          ...a2.find((item) => (item.kdtk === itm.kdtk) && item),
          ...itm
      }))

      state.listDataMonitGab = mergeById(state.rlistDataMonitWrc,state.rlistDataMonitEis)

      var sudah_eis = state.rlistDataMonitEis.filter(item => item.absen_eiscab === 'Sudah Proses').length; 
      var belum_eis = state.rlistDataMonitEis.filter(item => item.absen_eiscab === 'Belum Proses').length; 
      state.sudahMonitEis = sudah_eis
      state.belumMonitEis = belum_eis

      var sudah_wrc = state.rlistDataMonitWrc.filter(item => item.absen_wrc === 'Sudah Proses').length; 
      var belum_wrc = state.rlistDataMonitWrc.filter(item => item.absen_wrc === 'Belum Proses').length; 
      state.sudahMonitWrc = sudah_wrc
      state.belumMonitWrc = belum_wrc 
      //console.log(state.listDataMonitGab)
      
  },

  set_cabang(state, data) {
    state.listCabangMonitharian = data
  },  
};
