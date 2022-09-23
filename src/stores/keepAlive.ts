import { defineStore } from 'pinia'

interface Option {
  name: string,
  value: any
}

export interface keepAliveState {
  keepAliveComponentsName: string[]
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStoreKeep = defineStore('keepAlive', {
  // 定义应用程序的状态
  state: () => ({
    keepAliveComponentsName: [] // 需要缓存的组件名称
  }),
  getters: {
    keepAliveComponents: (state) => {
      return state.keepAliveComponentsName
    }
  },
  // 定义业务逻辑, Actions 相当于组件中的 methods,
  actions: {
    // 重置，Push, splice keep-alive对象
    setKeepAliveComponentsName(state: keepAliveState, nameArr: []) {
      state.keepAliveComponentsName = nameArr
    },
    addKeepAliveComponentsName(state: keepAliveState, name: string) {
      state.keepAliveComponentsName.push(name)
    },
    delKeepAliveComponentsName(state: keepAliveState, name: string) {
      const key = state.keepAliveComponentsName.indexOf(name)
      if (key !== -1) {
        state.keepAliveComponentsName.splice(key, 1)
        console.log(state.keepAliveComponentsName)
      }
    }
    // stateChange(option: Option<appState>) {
    //     this[option.name] = option.value
    // }
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
