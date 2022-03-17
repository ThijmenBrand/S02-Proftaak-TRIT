import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import tribes from '@/views/tribes/Tribes.vue';
import tribe from '@/views/tribes/Tribe-Information-Page/InformationPage.vue';
import article from '@/views/tribes/article/Article.vue';
import rockstar from '@/views/rockstars/Rockstar-Information-Page/InformationPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tribes',
    name: 'tribes',
    component: tribes,
  },
  {
    path: '/tribe/:tribe',
    name: 'tribe',
    component: tribe,
    props: true,
  },
  {
    path: '/tribe/:tribe/article/:articleId',
    name: 'article',
    component: article,
  },
  {
    path: '/rockstar/:rockstarId',
    name: 'rockstar',
    component: rockstar,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
