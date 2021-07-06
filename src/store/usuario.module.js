export const usuario = {
  namespaced: true,
  state: {
    usuario: null,
    idUsuario: null,
  },
  actions: {
    fill({ commit }, usuario) {
      commit("fillUsuario", usuario);
    },
    getUsuario({ commit }, usuario) {
      commit("getUsuario", usuario);
    },
    setUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
    getIdUsuario({ commit }, idUsuario) {
      commit("getIdUsuario", idUsuario);
    },
    setIdUsuario({ commit }, idUsuario) {
      commit("setIdUsuario", idUsuario);
    },
    clear({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    clear(state) {
      state.usuario = null;
    },
    getUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    getIdUsuario(state, idUsuario) {
      state.idUsuario = idUsuario;
    },
    setIdUsuario(state, idUsuario) {
      state.idUsuario = idUsuario;
    },
  },
  getters: {
    usuario(state) {
      return state.usuario;
    },
    idUsuario(state) {
      return state.idUsuario;
    },
  },
};
