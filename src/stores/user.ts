import { defineStore } from 'pinia'
import { Session } from '/@/utils/storage';
import { getInfoApi, loginApi } from '../api/user'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('user', {
  // 定义应用程序的状态
  state: () => ({
    token: '', // 登录token
    info: {},  // 用户信息
  }),
  getters: {
    tokens: (state) => {
      return state.token
    }
  },
  // 定义业务逻辑, Actions 相当于组件中的 methods,
  actions: {
    tokenChange(token: string) {
      this.token = token
    },
    infoChange(info: object) {
      this.info = info
    },
    async login(params: any) {
      return new Promise((resolve, reject) => {
        loginApi(params)
          .then(res => {
            this.tokenChange(res.data.token)
            this.getInfo({ token: res.data.token })
              .then(infoRes => {
                resolve(res.data)
              })
          }).catch(err => {
            reject(err)
          })
      })
    },
    // get user info after user logined
    async getInfo(params: any) {
      return new Promise((resolve, reject) => {
        getInfoApi(params)
          .then(res => {
            this.infoChange(res.data.info)
            resolve(res.data.info)
          })
      })
    },

    // login out the system after user click the loginOut button
    async loginOut() {
      // loginOutApi()
      // .then(() => { })
      // .catch(() => { })
      // .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      Session.clear()
      location.reload()
      // })
    }
    //   setThemeConfig(data: ThemeConfigState) {
    //     this.themeConfig = data;
    //   },
    //   async setUserInfos() {
    //     const userName = Cookies.get('userName');
    //     // ...
    //   },
  },
  // other options...
})
