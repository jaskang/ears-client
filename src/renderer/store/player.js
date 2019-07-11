import { Loading } from 'element-ui';
import neapi from '@/renderer/util/neapi';
import { trackTransformer } from '@/renderer/util/model';
import userStore from './../store/user';

const modes = ['recommend', 'list', 'random', 'single'];
export default {
  namespaced: true,
  state: {
    list: [],
    listIds: [],
    index: 0,
    song: null,
    mode: modes[2]
  },
  mutations: {
    prev(state) {
      let index = 0;
      if (state.index <= 0) {
        console.log(`第一首了`);
      } else {
        index = state.index - 1;
        state.index = index;
        state.song = state.list[index];
      }
    },
    next(state) {
      let index = 0;
      if (state.index + 1 >= state.list.length) {
        console.log(`最后一首了`);
      } else {
        index = state.index + 1;
        state.index = index;
        state.song = state.list[index];
      }
    },
    load(state, { list, id }) {
      const listIds = list.reduce((prev, current) => {
        prev.push(current.id);
        return prev;
      }, []);
      const index = listIds.indexOf(id);
      const song = list[index];

      state.list = list;
      state.listIds = listIds;
      state.index = index;
      state.song = song;
    },
    mode(state, { mode }) {
      state.mode = mode;
    }
  },
  actions: {
    load({ commit }, { list, id = null }) {
      if (list && list.length > 0) {
        if (id) {
          commit('load', { list, id });
        } else {
          commit('load', { list, id: list[0].id });
        }
      }
    },
    async mode({ commit, dispatch, state }) {
      const modeIndex = modes.indexOf(state.mode);
      const modeNext = modeIndex === 3 ? modes[0] : modes[modeIndex + 1];
      console.log(`next mode:${modeNext}`);

      if (modeNext === 'recommend') {
        if (userStore.state.likeIds.indexOf(state.song.id) !== -1) {
          const loading = Loading.service({
            lock: true,
            text: '正在打开心动模式...'
          });
          const intelligenceRet = await neapi('/playlist/intelligence', {
            id: state.song.id,
            pid: userStore.state.likeDetail.id
          });
          const heartList = intelligenceRet.data.map(item => {
            return trackTransformer(item.songInfo);
          });
          heartList.unshift(state.song);
          await dispatch('load', { list: heartList, id: state.song.id });
          loading.close();
          commit('mode', { mode: modeNext });
        } else {
          commit('mode', { mode: 'list' });
        }
      } else {
        commit('mode', { mode: modeNext });
      }
    }
  },
  getters: {}
};
