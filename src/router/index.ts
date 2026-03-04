import {createRouter, createWebHistory} from 'vue-router'

// 导入页面组件
import init from '@/pages/init.vue'
import frontend from '@/pages/frontend.vue'
import engine from '@/pages/engine.vue'
import hardware from '@/pages/hardware.vue'

//创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
        path: '/',
        name: 'init',
        component: init
    },
    {
        path: '/frontend',
        name: 'frontend',
        component: frontend
    },
    {
        path: '/engine',
        name: 'engine',
        component: engine
    },
    {
        path: '/hardware',
        name: 'hardware',
        component: hardware
    }
  ]
})

export default router