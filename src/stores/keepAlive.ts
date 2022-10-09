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
  state: (): keepAliveState => ({
    keepAliveComponentsName: [] // 需要缓存的组件名称
  }),
  getters: {
    keepAliveComponentsNames: (state) => {
      return state.keepAliveComponentsName
    }
  },
  // 定义业务逻辑, Actions 相当于组件中的 methods,
  actions: {
    // 重置，Push, splice keep-alive对象
    setKeepAliveComponentsName(nameArr: []) {
      this.keepAliveComponentsName = nameArr
    },
    addKeepAliveComponentsName(name: string) {
      this.keepAliveComponentsName.push(name)
    },
    delKeepAliveComponentsName(name: string) {
      const key = this.keepAliveComponentsName.indexOf(name)
      if (key !== -1) {
        this.keepAliveComponentsName.splice(key, 1)
        console.log(this.keepAliveComponentsName)
      }
    }
  },
})
