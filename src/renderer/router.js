import Vue from 'vue';
import Router from 'vue-router';
import store from '@/renderer/store/index';
import Home from './views/Home.vue';
import Login from './views/Login';
import LikeList from './views/LikeList';
import RecommendList from './views/RecommendList';
import PlayList from './views/PlayList';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          redirect: 'likelist'
        },
        {
          name: 'likelist',
          path: 'likelist',
          component: LikeList
        },
        {
          name: 'recommend-list',
          path: 'recommend-list',
          component: RecommendList
        },
        {
          name: 'playlist',
          path: 'playlist',
          component: PlayList
        }
      ]
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.isInit) {
    const islogin = await store.dispatch('user/isLogin');
    setTimeout(() => {
      store.commit('init');
      if (islogin) {
        next();
      } else {
        next({ path: '/login' });
      }
    }, 5000);
  } else {
    next();
  }
});

export default router;
