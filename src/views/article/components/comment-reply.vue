<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条评论` : '咱无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- 评论的回复列表 -->
    <van-cell title="全部回复" />
    <comment-list :source="comment.com_id" type="c" />
  </div>
</template>

<script>
import CommentItem from './comment-item'
import commentList from './comment-list'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    commentList
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.comment-reply {
  /deep/ .van-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: #1989fa;
        }
      }
    }
  }
}
</style>
