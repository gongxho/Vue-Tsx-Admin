// /src/stores/userInfos.ts
import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // 定义应用程序的状态
  state: (): any => ({
    title: "tsx+ddd",
  }),
  // 定义业务逻辑, Actions 相当于组件中的 methods,
  actions: {
    // stateChange(option: Option<appState>) {
    //   this[option.name] = option.value
    // }
    // setThemeConfig(data: ThemeConfigState) {
    //   this.themeConfig = data;
    // },
    // async setUserInfos() {
    //   const userName = Cookies.get('userName');
    //   // ...
    // },
  },
  // other options...
})
