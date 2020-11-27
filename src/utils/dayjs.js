import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)
// 定义一个全局的过滤器，然后就可以在模板中使用了
// 参数1：过滤器名称
// 参数2：过滤器函数
// 管道符前面表达式返回的结果回传给过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
