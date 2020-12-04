<template>
  <div class="wode-container">
    <!-- 登录状态 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 登录和注册 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('./login')">
        <img src="~@/assets/mobile.png" class="mobile-img" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录状态 -->
    <van-grid column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icongengduo"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知 -->
    <div class="message">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        title="退出登录"
        class="outBtn"
        clickable
        v-if="user"
        @click="secede"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'wodeIndex',
  data() {
    return {
      //  初始化用户信息对象
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 如果用户登录了，则请求加载用户信息的数据
    if (this.user) {
      this.loaduserInfo()
    }
  },
  methods: {
    secede() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容'
        })
        .then(() => {
          // 确认按钮：清除登录状态(容器中的 user + 本地存储中的user)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消')
        })
    },
    // 加载用户信息
    async loaduserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wode-container {
  .header {
    height: 362px;
    background: url('../../assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 26px;
        color: #fff;
        margin-top: 16px;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
        .text {
          font-size: 23px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 140px;
      i.iconfont {
        font-size: 45px;
      }
      .iconshoucang {
        color: #ee6c6d;
      }
      .icongengduo {
        color: #ff9d1d;
      }
      .text {
        margin-top: 16px;
        font-size: 27px;
      }
    }
  }
  .message {
    margin-top: 10px;
  }
  .outBtn {
    margin-top: 10px;
    text-align: center;
    color: #d86262;
    font-size: 28px;
  }
}
</style>
