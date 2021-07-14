import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [];
routes.push(
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  }
);

export default routes;
