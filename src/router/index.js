import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import login from '@/components/login'
import register from '@/components/register'
import resource from '@/components/resource/resource'
import upload from '@/components/resource/upload'
import download from '@/components/resource/download'

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
      component: main
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
      path: '/resource',
      name: 'resource',
      component: resource,
      children: [
        {
          path: 'upload',
          name: 'upload',
          component: upload
        },
        {
          path: 'download',
          name: 'download',
          component: download
        }
      ]
    }
  ]
})
