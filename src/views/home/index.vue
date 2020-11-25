<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: 'homeIndex',
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .van-icon-search::before {
    color: #fff;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }
}
</style>
