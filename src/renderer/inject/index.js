import dayjs from 'dayjs';

export default {
  install(Vue, options) {
    Vue.filter('duration', function(value) {
      if (!value) return '00:00';
      const duration = dayjs(value);
      return duration.format('mm:ss');
    });
    // 3. 注入组件选项
    Vue.mixin({
      created: function() {
        // 逻辑...
      }
    });
  }
};
