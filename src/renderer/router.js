import Vue from 'vue';
import Router from 'vue-router';
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

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});

export default router;
