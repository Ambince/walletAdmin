import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [];
routes.push(

  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/NoticeLayout.vue'),
      },
      {
        path: '/notice',
        component: () => import('layouts/NoticeLayout.vue'),
      },
      {
        path: '/admin',
        component: () => import('layouts/Admin.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  }
);

export default routes;
