import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('./views/Posts.vue')
  },
  {
    path: '/post/:hash',
    name: 'post',
    component: () => import('./views/Post.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/Search.vue')
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
