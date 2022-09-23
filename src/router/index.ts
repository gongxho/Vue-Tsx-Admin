import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// import About from '../views/About';
// import Home from '../views/Home';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: () => import('/@/layout/index'),
    redirect: '/home',
    meta: { title: '////' },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: 'home' },
        component: () => import('../views/Home'),
      },
      {
        path: '/about',
        name: 'About',
        meta: { title: 'about' },
        component: () => import('../views/About'),
      },
      {
        path: '/user',
        name: 'USER_MANAGE',
        meta: { title: '用户管理', icon: 'el-icon-s-tools', alwaysShow: true },
        redirect: '/user/info',
        children: [
          {
            path: 'info',
            name: 'USER_INFO',
            component: () => import('/@/views/about'),
            meta: { title: '用户信息', isLogin: false }
          }
        ]
      },
      {
        path: '/menu',
        redirect: '/menu/menu-2',
        meta: { title: '1111111', icon: 'sfont system-menu' },
        children: [
          {
            path: '/menu-2',
            component: () => import('/@/views/menu/menu-2.vue'),
            meta: { title: '222222222' }
          },
          {
            path: '/menu-3',
            component: () => import('/@/views/menu/menu-3.vue'),
            meta: { title: '3333333333' }
          },
        ]
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
