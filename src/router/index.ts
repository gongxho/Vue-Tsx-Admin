/**
 * @description 所有人可使用的参数配置列表
 * @params hideMenu: 是否隐藏当前路由结点不在导航中展示
 * @params alwayShow: 只有一个子路由时是否总是展示菜单，默认false
 */
import { reactive } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Session } from '/@/utils/storage';
import { useStore } from '/@/stores/user'
import { useStoreKeep } from '/@/stores/keepAlive'
import NProgress from '/@/utils/nprogress'
import { changeTitle } from '/@/utils/title'
// import i18n from '/@/locale'

NProgress.configure({ showSpinner: false })

// 引入不需要权限的modules
import System from './modules/system'

/** 
 * @name 初始化必须要的路由
 * @description 使用reactive属性使得modules可以在路由菜单里面实时响应，搞定菜单回显的问题
 * @detail 针对modules的任何修改，均会同步至菜单级别，记住，是针对变量名为：moduels的修改
 **/
let modules = [
  ...System
]

// const { t } = i18n.global

const router = createRouter({
  history: createWebHashHistory(),
  routes: modules
})

// 未授权时可访问的白名单
const whiteList = ['/login']

// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
  const store = useStore()
  NProgress.start();
  if (Session.get(("token"))) {
    to.meta.title ? (changeTitle(to.meta.title)) : "" // 动态title
    if (to.path === '/login') {
      next('/')
      return
    }
    next()
  } else if (whiteList.includes(to.path)) {
    to.meta.title ? (changeTitle(to.meta.title)) : "" // 动态title
    next()
  } else {
    next("/login"); // 全部重定向到登录页
    to.meta.title ? (changeTitle(to.meta.title)) : "" // 动态title
  }
});

// 路由跳转后的监听操作
router.afterEach((to: any, _from) => {
  const storekeep = useStoreKeep()
  const keepAliveComponentsName: string[] = storekeep.keepAliveComponentsNames || [];
  const name: string = to.matched[to.matched.length - 1].components.default.name
  if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
    storekeep.addKeepAliveComponentsName(name);
  }
  NProgress.done()
});

export { modules }

export default router
