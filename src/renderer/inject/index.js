// import store from './../store/index';
import filters from './filters';

export default {
  install(Vue, options) {
    Vue.filter('duration', filters.duration);
    Vue.filter('islike', filters.islike);
    Vue.prototype.$islike = filters.islike;
    Vue.filter('isPlaying', filters.isPlaying);
    Vue.prototype.$isPlaying = filters.isPlaying;
    Vue.mixin({
      created: function() {}
    });
  }
};
