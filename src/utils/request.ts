import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
const baseURLOnly = {
    java: 'http://mpingweb.ameimeika.com/api',
    php: 'http://test.appadmin3.ameimeika.com/api'
    // java: 'http://adminmping.ameimeika.com/api',
    // php: 'http://appadmin3.ameimeika.com/api'
}

export const service = axios.create({
    // baseURL: process.env.BASE_API,  //以后再配
    baseURL: baseURLOnly.java, //测试环境
    timeout: 150000 // request timeout
})
let role: any;
// request interceptor
service.interceptors.request.use(
    config => {
        // console.log(config)
        let res: any = sessionStorage.getItem('use') ? sessionStorage.getItem('use') : null
        if (res) {
            let use = JSON.parse(res)
            role = { roleId: JSON.parse(use.roleId)[0] }
        }
        config.baseURL = baseURLOnly.java
        if (config.method == 'post') {
            if (config.data.typeurl) {
                config.baseURL = baseURLOnly.php
            }
        }
        if (config.method == 'get') {
            if (config.params.typeurl) {
                config.baseURL = baseURLOnly.php
            }
        }
        // if(config.data || config.params){
        //     console.log(config.params,config.data)
        //     if(config.data.typeurl || config.params.typeurl){

        //         config.baseURL =baseURLOnly.php
        //     }else{
        //         config.baseURL =baseURLOnly.java
        //     }
        // }
        // Do something before request is sent
        // if (store.getters.token) {
        if (sessionStorage.getItem('usetoken')) {
            // console.log(sessionStorage.getItem('token'))
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            // config.headers['Authorization'] = 'Bearer ' + getToken()
            config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('usetoken')
            // console.log(getToken())
            config.headers['Accept'] = 'application/json'
        }
        return config
    },
    error => {
        Message({
            message: '请求错误',
            type: 'error',
            duration: 15 * 1000
        })
        Promise.reject(error)
    }
)
const http = {
    post(url: string, datas: {}) {


        return new Promise((resolve, reject) => {
            service({
                url: url,
                method: 'post',
                data: { ...datas, ...role }
            }).then(res => {
                // console.log('返回数据', res)
                resolve(res.data)
            })
        })
    },
    get(url: string, datas: {}) {
        return new Promise((resolve, reject) => {
            service({
                url: url,
                method: 'get',
                params: { ...datas, ...role }
            }).then(res => {
                // console.log('返回数据', res)
                resolve(res.data)
            })
        })
    },
}
export default http