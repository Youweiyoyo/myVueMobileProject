import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(
  // 请求发起会经过这里
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 这里务必要返回config配置对象
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
export default request
