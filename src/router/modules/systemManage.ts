import type { Route } from '../index.type'
import Layout from '/@/layout/index'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/systemManage',
    component: createNameComponent(() => import('/@/layout/index')),
    redirect: '/systemManage/user',
    meta: { title: 'systemManage', icon: 'sfont system-xitongzhuangtai' },
    alwayShow: true,
    children: [
      {
        path: 'dept',
        component: createNameComponent(() => import('/@/views/systemManage/dept/index.vue')),
        meta: { title: 'dept' }
      },
      {
        path: 'dic',
        component: createNameComponent(() => import('/@/views/systemManage/dic/index')),
        meta: { title: 'dic' }
      },
      {
        path: 'menu',
        component: createNameComponent(() => import('/@/views/systemManage/menu/index')),
        meta: { title: 'message.menu.systemManage.menu' }
      },
      {
        path: 'role',
        component: createNameComponent(() => import('/@/views/systemManage/role/index.vue')),
        meta: { title: 'message.menu.systemManage.role' }
      },
      {
        path: 'user',
        component: createNameComponent(() => import('/@/views/systemManage/users/index')),
        meta: { title: 'message.menu.systemManage.user' }
      }
    ]
  }
]

export default route