import {reqUserAdress,reqShopInfo} from "@/api"

const actions = {
    // 获取用户地址信息
    async getAddress(context){
        let result = await reqUserAdress();
        if(result.code == 200){
            context.commit('ADDADDRESS',result.data)
        }
    },
    // 获取商品信息
    async getShopInfo(context){
        let result = await reqShopInfo();
        if(result.code == 200){
            context.commit('ADDSHOPINFO',result.data)
        }
    }

}
const mutations = {
    ADDADDRESS(state,value){
        state.address = value;
    },
    ADDSHOPINFO(state,value){
        state.shopInfo = value;
    }
}
const state = {
    address:[],
    shopInfo:{},
}
const getters = {}

export default{
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}