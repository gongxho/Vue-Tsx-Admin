import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

// import About from '../views/About';
// import Home from '../views/Home';

const routes = [
    {
        path: '/',
        name: '/',
        component: () => import('/@/layout/index'),
        redirect: '/home',
        meta: { title: 'vue-tsx-admin' },
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
                meta: { title: 'menu', icon: 'sfont system-menu' },
                children: [
                    {
                        path: '/menu-1',
                        meta: { title: 'menu-1' },
                        children: [
                            {
                                path: '/menu-1-1',
                                name: 'menu-1-1',
                                meta: { title: 'menu-1-1' },
                                children: [
                                    {
                                        path: '/menu-1-1-1',
                                        name: 'menu-1-1-1',
                                        meta: { title: 'menu-1-1-1' },
                                        component: () => import('/@/views/menu/menu-1/menu-1-1/menu-1-1-1'),
                                    },
                                    {
                                        path: '/menu-1-1-2',
                                        name: 'menu-1-1-2',
                                        meta: { title: 'menu-1-1-2' },
                                        component: () => import('/@/views/menu/menu-1/menu-1-1/menu-1-1-2'),
                                    },
                                ],
                            },
                            {
                                path: '/menu-1-2',
                                name: 'menu-1-2',
                                meta: { title: 'menu-1-2' },
                                component: () => import('/@/views/menu/menu-1/menu-1-2'),
                            },
                        ],
                    },
                    {
                        path: '/menu-2',
                        component: () => import('/@/views/menu/menu-2'),
                        meta: { title: 'menu-2' }
                    },
                    {
                        path: '/menu-3',
                        component: () => import('/@/views/menu/menu-3'),
                        meta: { title: 'menu-3' }
                    },
                ]
            }
        ]
    },
    {
        path: '/system',
        redirect: '/404',
        component: () => import('/@/layout/index'),
        meta: { title: 'message.menu.system.name' },
        children: [
            {
                path: '/404',
                component: (() => import('/@/views/system/404.vue')),
                meta: { title: 'message.menu.system.404', hideTabs: true }
            },
            {
                path: '/401',
                component: (() => import('/@/views/system/401.vue')),
                meta: { title: 'message.menu.system.401', hideTabs: true }
            },
            {
                path: '/redirect/:path(.*)',
                component: (() => import('/@/views/system/redirect.vue')),
                meta: { title: 'message.menu.system.redirect', hideTabs: true }
            }
        ]
    },
    {
        path: '/login',
        component: (() => import('/@/views/system/login.vue')),
        meta: { title: 'message.system.login', hideTabs: true }
    },
    {
        // 找不到路由重定向到404页面
        path: "/:pathMatch(.*)",
        component: () => import('/@/layout/index'),
        redirect: "/404",
        meta: { title: '' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
