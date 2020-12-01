<template>
  <van-button
    :loading="loding"
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    :loading="loading"
    @click="onFollow"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logind: false
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {
    async onFollow() {
      this.loading = true // 展示loding的状态
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await delFollow(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 没有关注，取消关注
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '亲，无法关注自己哦'
        }
        this.$toast(message)
      }
      this.followLodings = false // 关闭关注按钮的loading
    }
  }
}
</script>

<style lang="less" scoped></style>
