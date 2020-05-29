import { Commit } from 'vuex';
const menus={
    /**参数 */
    state:{
        menusList:[]
    },
    mutations:{
        SET_menusList:(state:any,code:[])=>{
            state.menusList = code
        }
    },
    actions:{
        menusfn(context:{commit:Commit},datas:[]){
            context.commit('SET_menusList',datas)
        }
    }
}
export default menus