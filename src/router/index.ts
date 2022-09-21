import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// import About from '../views/About';
// import Home from '../views/Home';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
