import neapi from '@/renderer/util/neapi';
const userProfile = JSON.parse(
  window.localStorage.getItem('userProfile') || '{}'
);

export default {
  namespaced: true,
  state: {
    profile: userProfile
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
      window.localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  },
  actions: {
    async isLogin({ commit, state }) {
      try {
        if (state.profile && state.profile.userId) {
          console.log(`has userId`);
          const stateRet = await neapi('/login/state');
          commit('setProfile', stateRet.profile);
          await neapi('/login/refresh');
          return Promise.resolve(true);
        } else {
          console.log(`no userId`);
          return Promise.resolve(false);
        }
      } catch (err) {
        return Promise.resolve(false);
      }
    },
    async login({ commit }, { phone, password }) {
      const loginRet = await neapi('/login/cellphone', {
        phone: phone,
        password: password
      });
      commit('setProfile', loginRet.profile);
    }
  },
  getters: {}
};
