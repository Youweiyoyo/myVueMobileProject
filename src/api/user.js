// 封装用户登录请求方法的模块
import request from '@/utils/request.js'
// 导出一个方法
// data 接收一个参数，把接收到的参数传递到具体请求的位置
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: data
  })
}
//  发送验证码 每个手机号每分钟只能发送一次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   //  注意：该接口需要授权才能访问
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表的请求
export const getUsersList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取用户关注
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消用户关注d
export const delFollow = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}
