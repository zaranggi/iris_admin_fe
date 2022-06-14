export const mutations = {
  
  set_data_menu_admin(state, data) {
    state.listDataMenuAdmin = data
  }, 
  
 /*  set_users_menu(state, data) {
    state.listUsersMenu = data
  },  */
  
  set_cabang_menu_admin(state, data) {
    state.listCabangMenuAdmin = data
  },  
  set_main_menu_admin(state, data) {
    state.listMainMenuAdmin = data
  },
  set_dep_menu_admin(state, data) {
    state.listDepMenuAdmin = data
  },
  set_jabatan_menu_admin(state, data) {
    state.listJabatanMenuAdmin = data
  }, 
  set_loading_menu_admin(state, loading) {
    state.loadingmenuAdmin = loading
  },
};
