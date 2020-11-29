<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(active, index) in list"
        :key="index"
        :title="active.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSeatchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSeatchResult({
          page: this.page, // 页码
          per_page: this.perpage, // 每页大小
          q: this.searchText // 查询关键词
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        // 加载失败 liading 也要关闭
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
