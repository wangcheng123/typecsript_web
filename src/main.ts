import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { Component } from 'vue-property-decorator';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])
Vue.use(Element)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.name === 'login') {
    next()
    return
  }
  if (sessionStorage.getItem('usetoken')) {
    next()
  } else {
    next({ name: 'login' })
  }

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//路由守卫
router.beforeEach((to, from, next) => {
  //  console.log('main.ts', to, from)
  // 未登录且要跳转的页面不是登录页
  //    next({
  //     name: LOGIN_PAGE_NAME // 跳转到登录页
  // })
  next()
})