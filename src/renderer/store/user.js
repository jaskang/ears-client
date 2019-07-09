import neapi from '@/renderer/util/neapi';
import { trackTransformer, recTransformer } from '@/renderer/util/model';

const userProfile = JSON.parse(
  window.localStorage.getItem('userProfile') || '{}'
);

export default {
  namespaced: true,
  state: {
    profile: userProfile,
    playList: [],
    recommendList: [],
    likeList: [],
    likeIds: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
      window.localStorage.setItem('userProfile', JSON.stringify(profile));
    },
    setPlayList(state, playList) {
      state.playList = playList;
    },
    setLikeList(state, { likeList, likeIds }) {
      state.likeList = likeList;
      state.likeIds = likeIds;
    },
    setRecommendList(state, { recommendList }) {
      state.recommendList = recommendList;
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
    async getRecommendList({ commit }) {
      const recommendList = await neapi('/recommend/songs', {});
      const list = recommendList.recommend.map(rec => {
        return recTransformer(rec);
      });
      commit('setRecommendList', { recommendList: list });
    },
    async playList({ commit, state }) {
      const playlistRet = await neapi('/user/playlist', {
        uid: state.profile.userId
      });
      commit('setPlayList', playlistRet.playlist);
      const likeListRet = await neapi('/playlist/detail', {
        id: playlistRet.playlist[0].id
      });
      const likeList = likeListRet.playlist.tracks.map(track => {
        return trackTransformer(track);
      });
      const likeIds = likeListRet.playlist.trackIds.map(trackId => {
        return trackId.id;
      });
      commit('setLikeList', {
        likeList,
        likeIds
      });
    }
  },
  getters: {}
};
