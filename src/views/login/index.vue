<template>
  <div>
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form>
      <van-field label="用户名" placeholder="请输入用户名" />
      <van-field label="密码" placeholder="请输入用密码" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
