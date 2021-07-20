import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [];
routes.push(

  {
    path: '/index',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/NoticePage.vue'),
      },
      {
        path: '/notice',
        component: () => import('src/pages/NoticePage.vue'),
      },
      {
        path: '/admin',
        component: () => import('src/pages/AdminPage.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/LoginLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  }
);

export default routes;
