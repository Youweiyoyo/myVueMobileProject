<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="compileBtn = isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMychannelclick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(channel.id)"
        >
        </van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        icon="plus"
        @click="addMychannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channls'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: '',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 如果我的频道中不包括该频道项，则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 把计算结果返回
      return channels
    }
  },
  filters: {},
  watch: {},
  created() {
    this.loadAllchannels()
  },
  methods: {
    async loadAllchannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 将推荐频道添加到我的频道
    async addMychannel(channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道Id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {}
        this.$toast('保存失败,请稍后重试')
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 编辑或者删除
    onMychannelclick(channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 要删除的元素的开始索引
        // 删除的个数，如果不指定，则从参数1开始一直删除4
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败,请稍后重试')
      }
    }
  }
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
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222222;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .van-grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        color: #cacaca;
        font-size: 30px;
        z-index: 2;
      }
      .van-grid-item__text {
        margin-top: 0;
        font-size: 28px;
        color: #222222;
      }
      .text {
        font-size: 28px;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
