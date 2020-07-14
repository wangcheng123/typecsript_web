import Vue from 'vue'
import Vuex from 'vuex'
import test from '../modules/test';
import menus from '../modules/menus';
import use from '../modules/use';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    test, menus, use
  }
})
