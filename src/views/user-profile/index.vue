<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup position="bottom" v-model="isUpdateNameShow" style="height:100%">
      <update-name />
    </van-popup>
    <!-- /编辑昵称 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './comments/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  props: {},
  data() {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .page-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: #fff;
        }
      }
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
