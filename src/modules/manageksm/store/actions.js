import axios from "axios";

export default {
    getListKsm({ commit }) {
        commit("set_loading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("/api/manageksm")
                .then(response => {
                    commit("set_ksm", response.data.listdata.map((item) => {
                        return {
                            toko: item.toko,
                            nama_penyewa: item.nama_penyewa,
                            nama_tenant: item.nama_tenant,
                            alamat: item.alamat,
                            noksm: item.noksm === 'undefined' ? '-' : item.noksm,
                            status_tenant: item.status_tenant,
                            actions: item.id
                        }
                    }));
                    commit("set_loading", false)
                    resolve(response);
                })
                .catch(err => {
                    commit("set_loading", false)
                    reject(err);
                });
        });
    },
    getOneData({ commit }, payload) {
        commit("set_loading", true)
        return new Promise((resolve, reject) => {
            axios
                .post("api/manageksm/edit", payload)
                .then(response => {
                    commit("set_loading", false)
                    const val = response.data.listdata.map((item) => {
                        return {
                            id: item.id,
                            noksm: item.noksm,
                            toko: item.toko,
                            nama_tenant: item.nama_tenant,
                            nama_penyewa: item.nama_penyewa,
                            periode_awal: item.periode_awal,
                            periode_akhir: item.periode_akhir,
                            jml_termin: item.jml_termin,
                            item_jual: item.item_jual,
                            listrik: item.listrik,
                            total_hari: item.total_hari,
                            front_picture: item.front_picture,
                            tenant_picture: item.tenant_picture,
                            status_tenant: item.status_tenant,
                            tgl_pengajuan: item.tgl_pengajuan,
                            ket_pengajuan: item.ket_pengajuan,
                            tgl_proses: item.tgl_proses,
                            ket_proses: item.ket_proses,
                            tgl_existing: item.tgl_existing,
                            ket_existing: item.ket_existing,
                            tgl_batal: item.tgl_batal,
                            ket_batal: item.ket_batal,
                            tgl_ilegal: item.tgl_ilegal,
                            ket_ilegal: item.ket_ilegal
                        }
                    })
                    resolve(val)
                })
                .catch(err => {
                    commit("set_loading", false)
                    reject(err)
                })
        })
    },
    simpanUpdateData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("set_loading", true)
            axios
                .post("/api/manageksm/update", payload)
                .then(response => {
                    commit("set_loading", false);
                    resolve(response);
                })
                .catch(err => {
                    commit("set_loading", false)
                    reject(err)
                })
        })
    }
};