<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" @click="$refs.file.click()" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    />
    <van-cell
      @click="isUpdateGenderShow = true"
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      @click="isUpdateBirthdayShow = true"
      title="生日"
      :value="user.birthday"
      is-link
    />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup position="bottom" v-model="isUpdateNameShow" style="height:100%">
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup position="bottom" v-model="isUpdateGenderShow">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup position="bottom" v-model="isUpdateBirthdayShow">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      style="height:100%"
      position="bottom"
      v-model="isUpdatePhotoShow"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './comments/update-name'
import UpdateGender from './comments/update-gender'
import UpdateBirthday from './comments/update-birthday'
import UpdatePhoto from './comments/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data() {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true
      // file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value值清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .page-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: #fff;
        }
      }
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
