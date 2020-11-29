<template>
  <div class="search-suggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSeatchSuggestion } from '@/api/search'
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
      suggestions: [] // 联想建议数组
    }
  },
  computed: {},
  filters: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      handler(value) {
        this.loadSearchSuggestions(value)
      },
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
    }
  }
}
</script>

<style lang="less" scoped></style>
