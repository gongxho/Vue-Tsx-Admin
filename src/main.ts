import { createApp } from 'vue';
import App from './App';
import router from './router';
import '/@/style/index.scss';
import pinia from './stores/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)

// 将根存储其传递给应用程序
app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn })

app.mount('#app');
