<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="PullDownLoading"
      @refresh="onRefresh"
      :success-text="RefreshTheSuccess"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
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
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      PullDownLoading: false, // 控制下拉刷新的loding状态
      RefreshTheSuccess: '刷新成功'
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
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), //  时间戳  简单理解就是请求数据的页码
          with_top: 1 // 是否包含置顶
        })
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('请求获取失败', err)
        this.$toast('请求失败了')
      }
    },
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), //  时间戳  简单理解就是请求数据的页码
          with_top: 1 // 是否包含置顶
        })
        // 请求获取数据，将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的loding状态
        this.PullDownLoading = false
        // 下拉刷新成功后显示的弹框文本
        this.RefreshTheSuccess = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.PullDownLoading = false
        this.RefreshTheSuccess = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
