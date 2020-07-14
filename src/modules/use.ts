import { Commit } from 'vuex';
import http from "@/utils/request"
import router from '../router'
import store from '../store'
//状态
const state: any = {
    useinfo: {},
    role: {}
}
//方法
const mutations: any = {
    saveuseinfo(states: any, params: object) {

        states.useinfo = params;
    },
    saveRoleinfo(states: any, params: object) {

        states.role = params;
    },
};
//动作
const actions: any = {
    saveuseinfoFN(context: { commit: Commit }, params: object) {
        return new Promise((resolve, reject) => {
            http.post(
                "/com.mmk.admin.api.AdminUserProvider/1.0.0/getOrganizationUserInfo.html",
                { userId: 3 }
            ).then((res: any) => {
                console.log( res.data)
                res.data.username = res.data.username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                resolve(res.data)
                // console.log(res.data)
                context.commit('saveuseinfo', res.data);
            })
        })
        //   console.log(context,params)

    },
    roleFN(context: { commit: Commit }, params: object) {
        return new Promise((resolve, reject) => {
            http.post(
                "/com.mmk.admin.api.AdminUserProvider/1.0.0/listAdminRoleAll.html",
                {}
            ).then((res: any) => {
                // console.log(res)
                resolve(res.data)
                // console.log(res.data)
                context.commit('saveRoleinfo', res.data);
            })
        })

        //   console.log(context,params)

    },
};

router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.name === 'login') {
        next()
        return
    }
    if (sessionStorage.getItem('usetoken')) {

        if (!from.name || from.name === 'login') {

            store.dispatch('saveuseinfoFN').then(res => {
                store.commit('saveuseinfo', res)
                store.dispatch('roleFN').then(res => {
                    store.commit('saveRoleinfo', res)
                    next()
                })
            })

        } else {
            next()
        }

    } else {
        next({ name: 'login' })
    }

})
//导出
export default {
    namespaced: false, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
    state,
    mutations,
    actions
};