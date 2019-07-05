import { Howl, Howler } from 'howler';
import neapi from '@/renderer/util/neapi';

export default {
  namespaced: true,
  state: {
    status: {
      isPlaying: false
    },
    song: null
  },
  mutations: {
    load(state, song) {
      state.song = song;
    }
  },
  actions: {
    async load({ commit }, song) {
      if (song._src) {
        const urlRet = await neapi('/song/url', {
          id: song.id,
          br: 320000
        });
        song._src = urlRet.data;
      }
      commit('load', song);
      return Promise.resolve(song);
    }
  },
  getters: {}
};
