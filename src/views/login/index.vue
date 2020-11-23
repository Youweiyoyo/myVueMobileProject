<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="subForm" ref="loginForm">
      <van-field
        placeholder="请输入用户名"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        name="mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        placeholder="请输入用密码"
        v-model="user.code"
        :rules="userFormRules.code"
        name="code"
        type="number"
        maxlength="6"
      >
        <!-- 图标 -->
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <!-- 发送验证码 -->
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format=" ss s"
            v-if="isTimeshuow"
            @finish="isTimeshuow = false"
          />
          <van-button
            v-else
            class=" van-btn"
            size="small"
            type="default"
            round
            @click="sendyzm"
            native-type="button"
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
import { login, sendSms } from '@/api/user' // 按需导入登录模块
export default {
  name: 'LoginPage',
  data() {
    return {
      // 表单的数据信息
      user: {
        mobile: '', // 用户的手机号
        code: '' //  用户输入的验证码
      },
      // 配置表单的 :rules验证规则
      userFormRules: {
        // 输入手机号的验证规则是一个数组，每一个验证规则都是一个对象。数组绑定到:rules上
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}/, message: '验证码格式错误' }
        ]
      },
      // 控制显示倒计时的数据
      isTimeshuow: false
    }
  },
  methods: {
    //  请求表单的处理函数
    async subForm() {
      // 1. 获取表单数据
      const user = this.user //  获取到data中定义的表单数据赋值给user
      // 2. 表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 3. 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后再试')
        }
      }
      // 4. 根据请求响应结果出来后续操作
    },
    // 发送验证码的点击事件
    async sendyzm() {
      // 1. 校验手机号码
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast.fail('验证码发送失败')
      }
      // 2. 验证通过，显示倒计时
      this.isTimeshuow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isTimeshuow = false
        if (err.response.status === 429) {
          this.$toast('操作过于频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后操作')
        }
      }
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
