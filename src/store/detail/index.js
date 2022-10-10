import {reqDetailInfo,reqAddOrUpdateShopCart} from '@/api'
import {getId} from "@/utils/uuid_token"
const actions = {
    async getDataToDetail(context,skuId){
        // 这里需要等待，下面的getters里面可能拿到的是undefined（此时还是空对象），因为数据还没传回来
        let result = await reqDetailInfo(skuId);
        if(result.code >= 200 && result.code<300){
            context.commit('ADDDATA',result.data)
        }
    },
    async postShopCartInfo(context,{skuID,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuID,skuNum);
         if(result.code >= 200 && result.code < 300){
            return 'ok'
         }else{
            return Promise.reject(new Error('falie'))
         }
    }
}
const mutations = {
    ADDDATA(state,value){
        state.detailInfo = value
    }
}
const state = {
    detailInfo:{},
    uuid_token:getId(),
}
const getters = {
    categoryView(state){
        // 上面的异步操作可能会导致一开始这里拿到的是一个undefined所以加上一个空对象
        return state.detailInfo.categoryView || {}
    },
    price(){
        return state.detailInfo.price
    },
    skuInfo(){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(){
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}