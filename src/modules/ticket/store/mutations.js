export const mutations = {
  
  set_data_ticket(state, data) {
    state.listDataTicket = data
  },  
  set_listDataxTicketKategori(state, data) {
    state.listDataxTicketKategori = data
  },  
  set_cabang_ticket_act(state, data) {
    state.listCabangVqueryTicket = data
  },  
  
  set_q(state, data) {
    state.queryOne = data
  },  
  set_loading_ticket(state, loading) {
    state.loadingTicket = loading
  },
};
