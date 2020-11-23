<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="subForm">
      <van-field placeholder="请输入用户名" v-model="user.mobile">
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field placeholder="请输入用密码" v-model="user.code">
        <!-- 图标 -->
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <!-- 发送验证码 -->
        <template #button>
          <van-button class=" van-btn" size="small" type="default" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="btn-Tj">
        <van-button block type="info" native-type="submit" class="btn-Tj-sbm">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user' // 按需导入登录模块
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        mobile: '', // 用户的手机号
        code: '' //  用户输入的验证码
      }
    }
  },
  methods: {
    async subForm() {
      // 1. 获取表单数据
      const user = this.user //  获取到data中定义的表单数据赋值给user
      // 2. 表单验证
      // 3. 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败', err)
        }
      }
      // 4. 根据请求响应结果出来后续操作
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .van-btn {
    height: 47px;
    line-height: 47px;
    font-size: 22px;
    background-color: #ededed;
    color: #666666;
  }
  .btn-Tj {
    padding: 53px 33px;
    .btn-Tj-sbm {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
