import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login';
import LikeList from './views/LikeList';
import PlayList from './views/PlayList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: LikeList
        },
        {
          path: 'playlist',
          component: PlayList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
