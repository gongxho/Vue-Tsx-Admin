import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App';
import pinia from '/@/stores/index';
import router from '/@/router/index';
import { getAuthRoutes } from './router/permission'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'   // 引入基于断点的隐藏类
import 'normalize.css'                          // css初始化
import '/@/assets/style/common.scss'            // 公共css
import '/@/theme/modules/chinese/index.scss'
import '/@/theme/index.scss'

const app = createApp(App)

getAuthRoutes()

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn })

app.mount('#app');
