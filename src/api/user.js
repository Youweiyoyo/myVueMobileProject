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
