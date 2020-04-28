import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆',
      icon: 'guide',
      affix: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppMain.vue'),
    children: [
      {
        path: '/about',
        meta: {
          title: '关于我们',
          icon: 'guide',
          affix: true
        },
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'guide',
          affix: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: '*', meta: {
          title: '首页',
          icon: 'guide',
          affix: true
        }, name: 'Home', component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
