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
axios.interceptors.response.use((success) => {
  return success
}, (error) => {
  alert(JSON.stringify(error))
  this.router.push('/login')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
