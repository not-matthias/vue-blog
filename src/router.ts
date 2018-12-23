import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('./views/PostList.vue')
  },
  {
    path: '/post/:hash',
    name: 'post',
    component: () => import('./views/Post.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('./views/PageNotFound.vue')
  }
];

export default new Router({
  mode: 'hash',
  base: '/',
  routes
});
