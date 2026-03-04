import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//创建app
const app = createApp(App)
//使用路由器
app.use(router)
//挂载app
app.mount('#app')
