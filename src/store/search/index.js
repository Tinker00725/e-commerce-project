import {reqSearchList} from '@/api'

const actions = {
    async getSearchList(context,params={}){
        let result = await reqSearchList(params);
        console.log(result.code)
        if(result.code >= 200 && result.code < 300){
            context.commit('ADDSEARCHLIST',result.data)
        }
    }
};
const mutations = {
    ADDSEARCHLIST(state,value){
        state.searchList = value;
    }
};
const state = {
    searchList:{}
};

// 为了简化获取到的数据而存在
const getters = {
    goodsList(state){
        // searchList有两个状态，空与有数据，以防万一没有网路所以加上空数组形式
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}