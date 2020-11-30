//   文章请求模块
import request from '../utils/request'
// 请求获取文章列表数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 请求获取文章列表数据
export const getArticlesById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
