import axios from "axios";

export default {
  getListMenuAdmin({ commit }) {
    commit("set_loading_menu_admin", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/menuadmin")
        .then(response => {
          commit("set_data_menu_admin", response.data.listdata.map((item)=>{
                return {
                  name_menu: item.name_menu,
                  link: item.link,
                  bp: item.bp,
                  jenis_menu: item.jenis_menu,
                  urut: item.urut,
                  id_main: item.id_main,
                  active: item.active,
                  actions: item.id
                }
            })
          );
          commit("set_loading_menu_admin", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false)
          reject(err);
        });
    });
  },

  getCabangMenuAdmin({ commit }) {
    commit("set_loading_menu_admin", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => { 
          commit("set_cabang_menu_admin", response.data.listcabang.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_cabang: item.nama_cabang
            }
          }))
          commit("set_loading_menu_admin", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false)
          reject(err);
        });
    });
  },
  
  getDepMenuAdmin({ commit }) {
    commit("set_loading_menu_admin", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getdep")
        .then(response => {
          commit("set_dep_menu_admin", response.data.listdep.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_dep: item.nama_dep
            }
          })) 
          commit("set_loading_menu_admin", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false)
          reject(err);
        });
    });
  },

  getJabatanMenuAdmin({ commit }) {
    commit("set_loading_menu_admin", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getjabatan")
        .then(response => {
          commit("set_jabatan_menu_admin", response.data.listjabatan.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_jabatan: item.nama_jabatan
            }
          }))
          commit("set_loading_menu_admin", false)
          resolve(response)
        })
        .catch(err => {
          commit("set_loading_menu_admin", false)
          reject(err);
        });
    });
  }, 

  simpanAddMenuAdmin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu_admin", true);
      axios
        .post("/api/menuadmin/create", payload)
        .then(response => {
          commit("set_loading_menu_admin", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false);
          reject(err);
        });
    });
  },

  
  simpanUpdateMenuAdmin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu_admin", true);
      axios
        .post("/api/menuadmin/update", payload)
        .then(response => {
          commit("set_loading_menu_admin", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false);
          reject(err);
        });
    });
  },

   
  deleteMenuAdmin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu_admin", true);
      axios
        .post("/api/menuadmin/delete", payload)
        .then(response => {
          commit("set_loading_menu_admin", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false);
          reject(err);
        });
    });
  },
 
  getMainMenuAdmin({ commit }) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu_admin", true);
      axios
        .get("/api/menuadmin/mainmenu")
        .then(response => { 
            commit("set_loading_menu_admin", false);
            commit("set_main_menu_admin", response.data.listdata);           
            resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false);
          reject(err);
        });
    });
  },
    
  getOneMenuAdmin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu_admin", true);
      axios
        .post("/api/menuadmin/edit", payload)
        .then(response => { 
            commit("set_loading_menu_admin", false);
            const val = response.data.listdata.map((item)=>{
              return {
                id:item.id,
                name_menu: item.name_menu,
                link: item.link,
                bp: item.bp,
                id_main: item.id_main,
                urut: item.urut,
                kdcab: item.kdcab,
                id_dep: item.id_dep,
                id_jabatan: item.id_jabatan,
                active:item.active
              } 
            //resolve(response.data.listdata);
            })
            
            resolve(val);
        })
        .catch(err => {
          commit("set_loading_menu_admin", false);
          reject(err);
        });
    });
  },


};
