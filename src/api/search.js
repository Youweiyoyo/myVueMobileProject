// 添加用户频道
import request from '../utils/request'
export const getSeatchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
