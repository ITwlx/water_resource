//对axios二次封装
import axios from 'axios'

//1.利用axios对象方法create创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    baseURL:'/app',//发请求的时候，路径中会出现app
    timeout:5000,//请求超时时间
})

export default requests
