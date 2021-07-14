import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
