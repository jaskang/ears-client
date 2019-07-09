import store from './../store/index';
import dayjs from 'dayjs';

export default {
  install(Vue, options) {
    Vue.filter('duration', function(value) {
      if (!value) return '00:00';
      const duration = dayjs(value);
      return duration.format('mm:ss');
    });
    Vue.filter('islike', function(songId) {
      const index = store.user.state.likeIds.indexOf(songId);
      return index !== -1;
    });
    Vue.prototype.$islike = function(songId) {
      const index = store.state.user.likeIds.indexOf(songId);
      return index !== -1;
    };
    // 3. 注入组件选项
    Vue.mixin({
      created: function() {
        // 逻辑...
      }
    });
  }
};
