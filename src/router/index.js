import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import login from '@/components/login'
import register from '@/components/register'
import upload from '@/components/upload'
import download from '@/components/download'
import myResources from '@/components/myResources'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: main
    }, {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/download',
          name: 'download',
          component: download
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/myResources',
      name: 'myResources',
      component: myResources
    }
  ]
})
