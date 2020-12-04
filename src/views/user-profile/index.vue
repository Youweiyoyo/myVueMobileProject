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
    <van-cell
      @click="isUpdateGenderShow = true"
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell title="生日" :value="user.birthday" is-link />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup position="bottom" v-model="isUpdateNameShow" style="height:100%">
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup position="bottom" v-model="isUpdateGenderShow">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './comments/update-name'
import UpdateGender from './comments/update-gender'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender
  },
  props: {},
  data() {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false
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
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
