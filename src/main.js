import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入icon
import './style/icon.less'
// 加载动态REm基准值
import 'amfe-flexible'

// Vant样式
import Vant from 'vant'

// 加载dayjs初始化配置
import '@/utils/dayjs.js'

// 加载全局样式
import 'vant/lib/index.css'
import './style/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
