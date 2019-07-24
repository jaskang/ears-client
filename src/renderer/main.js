import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/renderer/styles/index.less';
import App from './App.vue';
import inject from './inject';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

Vue.use(inject);
Vue.use(ElementUI, { size: 'small' });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
