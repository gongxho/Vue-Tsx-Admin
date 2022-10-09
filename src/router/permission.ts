import type { Route } from './index.type'
import router, { modules } from './index'
import { Session } from '/@/utils/storage';
// import { useStore } from '/@/stores/user'

/** 引入需要权限的Modules */
import SystemManage from './modules/systemManage'
// import Dashboard from './modules/dashboard'
// import Document from './modules/document'
// import Pages from './modules/pages'
// import Menu from './modules/menu'
// import Component from './modules/component'
// import Directive from './modules/directive'
// import Chart from './modules/chart'
// import Print from './modules/print'
// import Community from './modules/community'

/** 登录后需要动态加入的本地路由 */
const asyncRoutes: Route[] = [
  ...SystemManage,
  // ...Dashboard,
  // ...Document,
  // ...Component,
  // ...Pages,
  // ...Menu,
  // ...Directive,
  // ...Chart,
  // ...Print,
  // ...Community,
]

/** 
 * @name 动态路由的权限新增，供登录后调用
 * @other 如果需要进行后端接口控制菜单的话，请在此拿到后端的菜单树与asyncRoutes对比，生成一个新的值
 */
const addRoutes = () => {
  // 已验证完成，下面代码添加的可以实时同步至菜单中去，可以添加setTimeout(() => {}) 模拟异步代码的操作
  // 利用前端路由表模拟后端数据问题
  asyncRoutes.forEach(item => {
    modules.push(item)
    router.addRoute(item)
  })
}

/**
 * @des 登录了之后会执行这个方法，实现动态路由的功能
*/
const getAuthRoutes = () => {
  // const store = useStore()
  // 判断token是否存在，存在则调用添加路由的方法
  if (Session.get('token')) {
    addRoutes()
  }
}

export default getAuthRoutes