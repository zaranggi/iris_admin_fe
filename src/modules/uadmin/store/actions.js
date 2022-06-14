import axios from "axios";

export default {
  getUadmin({ commit }) {
    commit("set_loading", true);
    return new Promise((resolve, reject) => {
      axios
        .get("/api/users")
        .then(response => {
          commit("set_uadmin", response.data.listuser.map((item)=>{
                return {
                  nik: item.nik,
                  nama: item.nama,
                  kdcab: item.kdcab,
                  nama_cabang: item.nama_cabang,
                  username: item.username,
                  isactive: item.isactive,
                  isadmin: item.isadmin,
                  actions: item.id,
                  ip: item.ip,
                  priority: item.priority,
                  flag_gabung: item.flag_gabung,
                  akses_toko: item.akses_toko,
                  ismobile: item.ismobile
                }
            })
          );
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },

  getCabang({ commit }) {
    commit("set_loading", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getcabang")
        .then(response => {
          commit("set_cabang", response.data.listcabang);
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },
  
  getDep({ commit }) {
    commit("set_loading", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getdep")
        .then(response => {
          commit("set_dep", response.data.listdep);
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },

  getJabatan({ commit }) {
    commit("set_loading", true)
    return new Promise((resolve, reject) => {
      axios
        .get("/api/auth/getjabatan")
        .then(response => {
          commit("set_jabatan", response.data.listjabatan);
          commit("set_loading", false)
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false)
          reject(err);
        });
    });
  },

  simpanAdd({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/add", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  
  simpanUpdate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/update", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  
  blockUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/block", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  deleteUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/delete", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },
  
  resetUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/reset", payload)
        .then(response => {
          commit("set_loading", false);
          resolve(response);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  getOneUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("set_loading", true);
      axios
        .post("/api/users/edit", payload)
        .then(response => { 
            commit("set_loading", false);
            const val = response.data.listusers.map((item)=>{
              return {
                nik: item.nik,
                nama: item.nama,
                username: item.username, 
                kdcab: item.kdcab, 
                id_chat: item.id_chat,
                id_dep: item.id_dep, 
                cover: item.cover, 
                id_jabatan: item.id_jabatan, 
                isactive: item.isactive,
                isadmin: item.isadmin,
                actions: item.id,
                ip: item.ip,
                priority: item.priority,
                flag_gabung: item.flag_gabung,
                akses_toko: item.akses_toko,
                ismobile: item.ismobile
              } 
            //resolve(response.data.listusers);
            })
            
            resolve(val);
        })
        .catch(err => {
          commit("set_loading", false);
          reject(err);
        });
    });
  },

  getListMenuClientEdit: async function({ commit }, payload) { 
    try {     
        const eksekusi_menu = async () => { 
            
            const a = await axios.post("/api/auth/getviewlistmenusettingclient",payload).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 
                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      id: item.id,
                      name_menu: item.name_menu,
                      link: item.link,
                      urut: item.urut,
                      id_main: item.id_main,
                      icon: item.icon,
                      ket: item.ket
                    }
                  })

                } 
            })
            .catch(() => { 
              return true
              
            })
          
          return a 
        }  
        
        await eksekusi_menu().then(data => {  
          /* const mainmenu = data.filter(item => item.link === "#")
          const submenu = data.filter(item => item.link != "#") */
          const listmenuall = []
          for (const e of data) {
              
              listmenuall.push({
                id: e.id,
                name_menu: e.name_menu,
                link: e.link,
                urut: e.urut,
                id_main: e.id_main
              }) 
              
          } 
                   
          commit("set_listmenuclient", listmenuall)  
        }) 

    } catch (error) { 
      return (null);
    }
  }, 

  getListMenuAdminEdit: async function({ commit }, payload) { 
    try {     
        const eksekusi_menu = async () => { 
            
            const a = await axios.post("/api/auth/getviewlistmenusettingadmin",payload).then(responseEis => { 
                if(responseEis.data.msg != "Data not found"){ 

                  return responseEis.data.listdata.map((item)=>{
                    return { 
                      id: item.id,
                      name_menu: item.name_menu,
                      link: item.link,
                      urut: item.urut,
                      id_main: item.id_main,
                      icon: item.icon,
                      ket: item.ket
                    }
                  })

                } 
            })
            .catch(() => { 
              return true
              
            })
          
          return a 
        }  
        
        await eksekusi_menu().then(data => {  
          const mainmenu = data.filter(item => item.id_main === 0)
          const submenu = data.filter(item => item.id_main != 0)
          const listmenuall = []
          for (const e of mainmenu) {
              const ceksub = submenu.filter(item => item.id_main === e.id) 
              listmenuall.push({
                id: e.id,
                name_menu: e.name_menu,
                link: e.link
              })
              for (const ee of ceksub) {
                listmenuall.push({ id: ee.id, name_menu: ee.name_menu, link: ee.link })
              }
              
          } 
                   
          commit("set_listmenuadmin", listmenuall)  
        }) 

    } catch (error) { 
      return (null);
    }
  }, 
  

  getOneMenuAdminEdit({ commit }, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getonemenuadminedit", payload)
        .then(response => {
          commit("set_onelistmenuadmin", response.data.listdata) 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  
  getOneMenuClientEdit({ commit }, payload) {
    
    return new Promise((resolve, reject) => {
      axios
        .post("/api/auth/getonemenuclientedit", payload)
        .then(response => {
          commit("set_onelistmenuclient", response.data.listdata) 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

  simpanUpdateMenuAdmin( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/auth/savemenusettingadmin", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },
  simpanUpdateMenuClient( context , payload) {
    return new Promise((resolve, reject) => { 
      axios
        .post("/api/auth/savemenusettingclient", payload)
        .then(response => { 
          resolve(response);
        })
        .catch(err => { 
          reject(err);
        });
    });
  },

};
