const modes = ['recommend', 'random', 'list', 'single'];
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
    }
  },
  actions: {
    load({ commit }, { list, id = null }) {
      console.log(list);
      console.log(id);
      if (list && list.length > 0) {
        if (id) {
          commit('load', { list, id });
        } else {
          commit('load', { list, id: list[0].id });
        }
      }
    }
  },
  getters: {}
};
