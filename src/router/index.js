import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
    name: 'login'
  },
  { // 登录页面
    path: '/login',
    component: Login,
    name: 'login'
  }
]

const router = new VueRouter({
  routes
})

export default router
