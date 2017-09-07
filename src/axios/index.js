import axios from 'axios'
import store from '../store'
import * as types from '../store/types'
import router from '../router'

// axios 配置
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `token ${localStorage.getItem('token')}`
        .replace(/(^")|("$)/g, '')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data)
  })

export default {
  // 用户注册
  UserAdd (data) {
    return instance.post('/api/user/useradd', data)
  },
  // 用户登录
  UserLogin (data) {
    return instance.post('/api/user/login', data)
  }
}
