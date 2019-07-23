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
    likeDetail: null,
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
    setLikeList(state, { likeDetail, likeList, likeIds }) {
      state.likeDetail = likeDetail;
      state.likeList = likeList;
      state.likeIds = likeIds;
    },
    setRecommendList(state, { recommendList }) {
      state.recommendList = recommendList;
    }
  },
  actions: {
    async isLogin({ commit }) {
      try {
        const stateRet = await neapi('/login/state');
        commit('setProfile', stateRet.profile);
        await neapi('/login/refresh');
        return Promise.resolve(true);
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
      return loginRet;
    },
    async logout({ commit }) {
      await neapi('/login/logout', {});
      commit('setProfile', {});
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
        likeDetail: likeListRet.playlist,
        likeList,
        likeIds
      });
    }
  },
  getters: {}
};
