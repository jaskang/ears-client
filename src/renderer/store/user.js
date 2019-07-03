import neapi from '@/renderer/util/neapi';
const user = window.localStorage.getItem('user') || {};

export default {
  namespaced: true,
  state: {
    detail: user
  },
  mutations: {
    setDetail(state, detail) {
      state.detail = detail;
    }
  },
  actions: {
    async isLogin({ commit, state }) {
      if (state.detail && state.detail.userId) {
        const detailRet = await neapi('/user/detail', {
          uid: state.detail.userId
        });
        window.localStorage.setItem('user', detailRet.data.profile);
        commit('setDetail', detailRet.data.profile);
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
    async login({ commit, state }, { phone, password }) {
      const loginRet = await neapi('/login/cellphone', {
        phone: phone,
        password: password
      });
      const detailRet = await neapi('/user/detail', {
        uid: loginRet.data.profile.userId
      });
      window.localStorage.setItem('user', detailRet.data.profile);
      commit('setDetail', detailRet.data.profile);
    }
  },
  getters: {}
};
