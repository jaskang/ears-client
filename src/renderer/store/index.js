import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import play from './play';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user,
    play
  }
});
