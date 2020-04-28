import axios from 'axios'
import { Message, MessageBox } from 'element-ui'


const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 150000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // if (store.getters.token) {
        if (sessionStorage.getItem('token') != null) {
            // console.log(sessionStorage.getItem('token'))
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            // config.headers['Authorization'] = 'Bearer ' + getToken()
            config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
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
                data: datas
            }).then(res => {
                console.log('返回数据', res)
                resolve(res.data)
            })
        })
    },
    get(url: string, datas: {}) {
        return new Promise((resolve, reject) => {
            service({
                url: url,
                method: 'post',
                params: datas
            }).then(res => {
                console.log('返回数据', res)
                resolve(res.data)
            })
        })
    },
}
export default http