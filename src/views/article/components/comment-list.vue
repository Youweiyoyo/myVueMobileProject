<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败,请点击重试"
    @load="onLoad"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/component'
import CommentItem from './comment-item'
export default {
  name: 'ComentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义Prop数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.loading = true // 初始化时手动开启loding
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别是接口的参数不一样
        // 1.请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset, // 获取下一页数据的标记
          limit: this.limit // 获取的评论数据的个数,不传表示采用后端
        })
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 把文章的评论的总数量传递到外部
        this.$emit('onload-success', data.data)
        // 3.将loading 设置未false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
