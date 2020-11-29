<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index">
      <span slot="title" v-html="highlight(text)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSeatchSuggestion } from '@/api/search'
// 按需加载有好处，只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [], // 联想建议数组
      htmlStr: 'Hello <span style="color:red"></span>'
    }
  },
  computed: {},
  filters: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // debounce 函数
      // 参数 1 : 一个函数
      // 参数 2 : 延迟时间，单位是毫秒
      // 返回值 : 防抖之后的函数
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSeatchSuggestion(this.searchText)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    // 高亮函数
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
