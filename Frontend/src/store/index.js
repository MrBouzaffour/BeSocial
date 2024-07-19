import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'),
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('token', token);
      commit('setAuthentication', true);
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setAuthentication', false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
