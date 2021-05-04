import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        // baseURL: '/api',
        timeout: 5000,
        // withCredentials: false, // 表示跨域请求时是否需要使用凭证
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // }
    })
    return instance(config);
}