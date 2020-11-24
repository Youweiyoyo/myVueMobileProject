import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const toKenKey = 'toutiao_user'
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户的信息 (token等数据)
    user: getItem(toKenKey)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了放置刷新丢失，需要将数据备份到本地存储
      setItem(toKenKey, state.user)
    }
  },
  actions: {},
  modules: {}
})
