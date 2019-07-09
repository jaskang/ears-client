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
    load({ commit }, song) {
      if (!song._src) {
        // const urlRet = await neapi('/song/url', {
        //   id: song.id,
        //   br: 320000
        // });
        song._src = `https://music.163.com/song/media/outer/url?id=${
          song.id
        }.mp3`;
        // song._src = urlRet.data.url
      }
      commit('load', song);
      return Promise.resolve(song);
    }
  },
  getters: {}
};
