<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <!-- route 开启路由模式  -->
    <van-tabbar class="layout-tabbar" v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/shipin">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wode">
        <i slot="icon" class="iconfont iconwode "></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
