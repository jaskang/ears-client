import neapi from '@/renderer/util/neapi';
const userProfile = JSON.parse(
  window.localStorage.getItem('userProfile') || '{}'
);

export default {
  namespaced: true,
  state: {
    profile: userProfile,
    playlist: [],
    likelist: null
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
      window.localStorage.setItem('userProfile', JSON.stringify(profile));
    },
    setPlayList(state, playlist) {
      state.playlist = playlist;
    },
    setLikeList(state, likelist) {
      state.likelist = likelist;
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
    },
    async playlist({ commit, state }) {
      const playlistRet = await neapi('/user/playlist', {
        uid: state.profile.userId
      });
      commit('setPlayList', playlistRet.playlist);
      const likelistRet = await neapi('/playlist/detail', {
        id: playlistRet.playlist[0].id
      });
      likelistRet.playlist.tracks.forEach(track => {
        if (track.ar && track.ar.length > 0) {
          track._singer = track.ar[0];
        } else {
          track._singer = {};
        }
      });
      commit('setLikeList', likelistRet.playlist);
    }
  },
  getters: {}
};
