<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
        class="grid-item"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.channelEdit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #3333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222222;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item__content {
      flex-direction: row;
    }
  }
}
</style>
