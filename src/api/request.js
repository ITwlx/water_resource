import axios from 'axios'
//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
const request = axios.create({
    baseURL:'/api',
    timeout:5000
})

//请求拦截器:在发送请求之前，请求拦截器可以检测到，做一些事情
request.interceptors.request.use((config) => {
    //config：配置对象 里面包含请求头header
    //进度条开始移动
    nProgress.start()
    return config
})

//响应拦截器
request.interceptors.response.use((res) => {
// 成功的回调：服务器数据回来之后，可以检测到
//进度条结束
nProgress.done()
return res.data
},(err)=>{
    //失败的回调
    return Promise.reject(new Error('faile'))
})

export default request