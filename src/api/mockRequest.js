// axios的二次封装,为了使用请求、相应拦截器
import axios from 'axios'
// 引入nProgress进度条插件
import nProgress from 'nprogress';
// 引入nProgress进度条样式
import "nprogress/nprogress.css"
// 创建一个axios实例
const mockRequest = axios.create({
    baseURL:"/mock",
    // 超时时间
    timeout:5000,
});
// 添加了请求拦截器
mockRequest.interceptors.request.use((config)=>{
    // 进度条开始
    nProgress.start();
    // config是请求的配置信息
    return config
});
// 添加了响应拦截器
mockRequest.interceptors.response.use((response)=>{
    // 进度条结束
    nProgress.done();
    // 响应之后返回response.data
    return response.data
},(error)=>{
    // 响应失败做出的以下动作
    return Promise.reject(new Error('faile'+error.message))
});

export default mockRequest;