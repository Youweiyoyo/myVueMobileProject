import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const toKenKey = 'toutiao_user'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户的信息 (token等数据)
    user: JSON.parse(window.localStorage.getItem(toKenKey))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了放置刷新丢失，需要将数据备份到本地存储
      window.localStorage.setItem(toKenKey, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
