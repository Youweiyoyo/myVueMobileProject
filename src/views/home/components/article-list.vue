<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      Required: true
    }
  },
  data() {
    return {
      list: [], // 存储数据列表的数据的数组
      loading: false, // 控制loding...效果
      finished: false // 控制数据加载结束的状态
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1. 发起 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel_id, // 频道id
          timestamp: Date.now(), //  时间戳  简单理解就是请求数据的页码
          with_top: 1 // 是否包含置顶
        })
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
      } catch (err) {
        console.log('请求获取失败', err)
      }
      // 3. 本次数据加载结束之后要把加载状态设置为结束
      // setTimeout 仅做示例，真实场景中一般为 ajax 请
    }
  }
}
</script>

<style lang="less" scoped></style>
