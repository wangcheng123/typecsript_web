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
        path: '/changePassword',
        meta: {
          title: '修改密码',
          icon: 'guide',
        },
        name: 'changePassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/changePassword.vue')
      },
      {
        path: '/about',
        meta: {
          title: '关于我们',
          icon: 'guide',
          affix: true
        },
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/mangeList',
        meta: {
          title: '管理列表',
          icon: 'guide',
          affix: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/mangeList/index.vue'),
        children: [{
          path: '/mangeListHome',
          meta: {
            title: '管理列表主页',
            icon: 'guide',
            affix: true
          },
          name: 'mangeListHome',
          component: () => import(/* webpackChunkName: "about" */ '../views/mangeList/mangeListHome.vue')
        }, {
          path: '/mangeListTwo',
          meta: {
            title: '管理列表二',
            icon: 'guide',
            affix: true
          },
          name: 'mangeListTwo',
          component: () => import(/* webpackChunkName: "about" */ '../views/mangeList/mangeListTwo.vue')
        }]
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
