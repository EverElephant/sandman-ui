// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
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
  411: '用户名密码错误'
}
axios.interceptors.response.use((success) => {
  if (success.data.code !== 200) {
    alert(success.data.code)
    alert(errorMap[success.data.code])
    return null
  } else {
    return success
  }
}, (error) => {
  alert(JSON.stringify(error))
  alert('服务器错误')
  return null
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
