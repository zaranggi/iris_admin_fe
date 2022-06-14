import axios from "axios";

export default {
  getListMenu({ commit }) {
    commit("set_loading_menu", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/menu")
        .then(response => {
          commit("set_data_menu", response.data.listdata.map((item)=>{
                return {
                  name_menu: item.name_menu,
                  link: item.link,
                  jenis_menu: item.jenis_menu,
                  urut: item.urut,
                  id_main: item.id_main,
                  active: item.active,
                  actions: item.id
                }
            })
          );
          commit("set_loading_menu", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false)
          reject(err);
        });
    });
  },

  getCabangMenu({ commit }) {
    commit("set_loading_menu", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => {
          commit("set_cabang_menu", response.data.listcabang.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_cabang: item.nama_cabang
            }
          }))
          commit("set_loading_menu", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false)
          reject(err);
        });
    });
  },
  
  getDepMenu({ commit }) {
    commit("set_loading_menu", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getdep")
        .then(response => {
          commit("set_dep_menu",  response.data.listdep.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_dep: item.nama_dep
            }
          })) 
          commit("set_loading_menu", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false)
          reject(err);
        });
    });
  },

  getJabatanMenu({ commit }) {
    commit("set_loading_menu", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getjabatan")
        .then(response => {
          commit("set_jabatan_menu", response.data.listjabatan.map((item)=>{
            return {
              id: "#"+item.id+"#",
              nama_jabatan: item.nama_jabatan
            }
          }))
          commit("set_loading_menu", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false)
          reject(err);
        });
    });
  }, 

  simpanAddMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu", true);
      axios
        .post("/api/menu/create", payload)
        .then(response => {
          commit("set_loading_menu", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false);
          reject(err);
        });
    });
  },

  
  simpanUpdateMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu", true);
      axios
        .post("/api/menu/update", payload)
        .then(response => {
          commit("set_loading_menu", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false);
          reject(err);
        });
    });
  },

   
  deleteMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu", true);
      axios
        .post("/api/menu/delete", payload)
        .then(response => {
          commit("set_loading_menu", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false);
          reject(err);
        });
    });
  },
 
  getMainMenu({ commit }) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu", true);
      axios
        .get("/api/menu/mainmenu")
        .then(response => { 
            commit("set_loading_menu", false);
            commit("set_main_menu", response.data.listdata);           
            resolve(response);
        })
        .catch(err => {
          commit("set_loading_menu", false);
          reject(err);
        });
    });
  },
    
  getOneMenu({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading_menu", true);
      axios
        .post("/api/menu/edit", payload)
        .then(response => { 
            commit("set_loading_menu", false);
            const val = response.data.listdata.map((item)=>{
              return {
                id:item.id,
                name_menu: item.name_menu,
                link: item.link,
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
          commit("set_loading_menu", false);
          reject(err);
        });
    });
  },


};
