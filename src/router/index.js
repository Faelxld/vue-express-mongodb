import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/user/Login'
import Register from '@/pages/user/Register'
import Home from '@/pages/home/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})
