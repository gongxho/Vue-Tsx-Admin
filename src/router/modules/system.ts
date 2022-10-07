import type { Route } from '../index.type'
// import Layout from '/@/layout/index'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/',
    component: createNameComponent(() => import('/@/layout/index')),
    hideMenu: true,
    meta: { title: 'index', hideTabs: true }
  },
  {
    path: '/system',
    component: createNameComponent(() => import('/@/layout/index')),
    hideMenu: true,
    redirect: '/404',
    meta: { title: 'system', icon: 'system'},
    children: [
      {
        path: '/404',
        component: createNameComponent(() => import('/@/views/system/404/404')),
        meta: { title: '404', hideTabs: true }
      },
      {
        path: '/401',
        component: createNameComponent(() => import('/@/views/system/401/401')),
        meta: { title: '401', hideTabs: true }
      },
      {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('/@/views/system/redirect')),
        meta: { title: 'redirect', hideTabs: true }
      }
    ]
  },
  {
    path: '/login',
    component: createNameComponent(() => import('/@/views/system/login/index')),
    hideMenu: true,
    meta: { title: 'login', hideTabs: true }
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: createNameComponent(() => import('/@/views/system/404/404')),
    // redirect: "/404",
    hideMenu: true,
    meta: { title: 'unknown' },
  },
]

export default route