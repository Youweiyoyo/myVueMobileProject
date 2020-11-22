<template>
  <div id="app">
    <!-- 路由的出口 -->
    <h1>黑马头条</h1>
    <van-button type="primary">主要按钮</van-button>
    <i class="iconfont iconfenxiang"></i>
    <router-view />
  </div>
</template>

<style lang="less"></style>

<script>
export default {
  name: 'App'
}
</script>
