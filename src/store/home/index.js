import {reqCategoryList} from "@/api"
import {mockRequestBanner} from "@/api"
import { mockRequestFloor } from "@/api";
const actions = {
     async getDataToNav(context){
        // 等待请求返回后执行赋值
        const result = await reqCategoryList();
        if(result.code>=200 && result.code < 300){
            result.data.pop();
            context.commit('ADDDATA',result.data)
        }
    },
    // 请求mock中img
    async getBannerToListContainer(context){
        const result = await mockRequestBanner();
        if(result.code === 200){
            context.commit('ADDIMG',result.data)
        }
    },
    // 在mock中请求flour
    async getFloorToFloor(context){
        let result = await mockRequestFloor();
        if(result.code >= 200 && result.code < 300){
            context.commit('ADDFLOORLIST',result.data)
        }
    }
};
const mutations = {
    ADDDATA(state,value){
        state.goods = value;
    },
    // 添加图片到轮播图
    ADDIMG(state,value){
        state.bannerList = value
    },
    ADDFLOORLIST(state,value){
        state. floorList = value;
    }
};
const state = {
    goods:[],
    bannerList:[],
    floorList:[]
};
const getters = {}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}