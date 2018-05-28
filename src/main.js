// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import message from './common/message'
import globalObj from './common/globalObj'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.globalObj_ = globalObj
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://39.104.80.30:8081'
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.withCredentials = true
var errorMap = {
  401: '上传文件为空',
  402: '上传远程服务器失败',
  403: '下载积分不足',
  404: '下载出错',
  405: '无权修改',
  406: '无权删除',
  407: '删除失败',
  408: '资源不存在',
  409: '用户名已存在',
  410: '请勿重复上传',
  411: '用户名密码错误',
  412: '单个文件最大220MB',
  413: '请先填写联系方式',
  414: '邮件验证码发送失败',
  415: '创建用户你带什么ID啊',
  416: '请先填写验证码',
  417: '验证码不正确',
  418: '未发送验证码或验证码已过期',
  419: '用户未登录',
  420: '资源积分必填',
  421: '资源描述必须10个字符以上',
  422: '无数据',
  423: '用户不存在'
}
axios.interceptors.response.use((success) => {
  if (success.data.code !== 200) {
    console.info(errorMap[success.data.code])
    message.errorMsg('错误代码:' + success.data.code, success.data.message) // elementUI的弹框
    return success
  } else {
    return success
  }
}, (error) => {
  message.errorMsg('服务器错误', JSON.stringify(error))
  return null
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
