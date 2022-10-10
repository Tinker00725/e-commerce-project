import {reqVertifyCode,reqRegisterUser,reqUserLogin,reqUserInfo,reqUserLoginOut} from "@/api/index"
import {setToken,getToken,removeToken} from '@/utils/token'
const actions = {
    // 获取验证码
    async getCode(context,phone){
        let result = await reqVertifyCode(phone);
        if(result.code === 200){
            context.commit('ADDCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 向后端注册用户
    async registerUser(context,user){
        let result = await reqRegisterUser(user);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 用户登录请求，返回结果状态
    async userLogin(context,{phone,password}){
        let result = await reqUserLogin({phone,password});
        // console.log('登录返回：',result)
        if(result.code === 200){
            // 持久存储token
            setToken(result.data.token);
            context.commit('ADDTOKEN',result.data.token)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息,并存储，每次路由加载都会调用
    async getUserInfo(context){
        let result = await reqUserInfo();
        if(result.code===200){
            // 因为后台的数据不稳定，总是返回空数组，所以刷新账户存在显示看脸实现
            context.commit('ADDUSERINFO',result.data[0])
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录→清除数据
    async outUserLogin(context){
    // 清除后台数据
     let result = await reqUserLoginOut();
     if(result.code === 200){
        // 清除前台数据——仓库数据
        context.commit('CLEARDATA');
        // 清除本地数据
        removeToken('TOKEN')
        return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    }
}
const mutations  = {
    ADDCODE(state,value){
        state.code = value;
    },
    ADDUSERINFO(state,value){
        state.userInfo = value
    },
    ADDTOKEN(state,value){
        state.token = value
    },
    CLEARDATA(state){
        state.token = '';
        state.userInfo = {};
        state.code = '';
    }
}
const state = {
    code:'',
    token:getToken('TOKEN'),
    userInfo:{},
}
const getters = {}

export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}