<template>
  <div class="update-gender">
    <van-picker
      default-index="value"
      title="性别"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickChange"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      lacalGender: this.value
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const lacalGender = this.lacalGender
        if (!lacalGender.length) {
          this.$toast('昵称不能为空')
          return
        }
        await UpdateUserProfile({
          gender: lacalGender
        })
        // 更新视图
        this.$emit('input', lacalGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onPickChange(Picker, value, index) {
      this.lacalGender = index
    }
  }
}
</script>

<style lang="less" scoped></style>
