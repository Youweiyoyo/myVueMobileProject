<template>
  <div class="search-history">
    <van-cell title="搜素历史">
      <div v-if="isDeletShow">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeletShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeletShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistories"
      :key="index"
      @click="onSeaechItem(item, index)"
    >
      <van-icon v-if="isDeletShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeletShow: false // 控制删除显示的状态
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {
    onSeaechItem(item, index) {
      if (this.isDeletShow) {
        //  删除状态，删除历史记录数据
        this.SearchHistories.splice(index)
      } else {
        // 非删除状态，直接进入搜索
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
