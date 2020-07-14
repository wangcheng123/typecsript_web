import tableComponent from "./table.vue"

export default {
    install(Vue:any){
        Vue.component('Mytable', tableComponent);
    }
}