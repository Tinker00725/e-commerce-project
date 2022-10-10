import { reqShopCartInfo ,reqBoxsIsCheckedChange,reqDeleteShop} from "@/api";

const actions = {
  // 获取商品信息
  async getShopCartData(context) {
    let result = await reqShopCartInfo();
    if (result.code >= 200 && result.code < 300) {
      context.commit("ADDDATA", result.data);
    }
  },
  // actions不写context就得不到参数
  // 更改单个商品checked
  async changBoxsChecked(context,{skuId,isChecked}){
     let result = await reqBoxsIsCheckedChange(skuId,isChecked);
    if(result.code>=200 && result.code<300){
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除商品信息
  async removeShop(context,skuId){
    let result = await reqDeleteShop(skuId);
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除所有选中的产品
  removeAllSelectedShop(context){
    let promiseAll = [];
    context.getters.cartInfoList.cartInfoList.forEach(element => {
      if(element.isChecked == 1){
        let promise = context.dispatch('removeShop',element.skuId);
        promiseAll.push(promise)
     }
    });
    // 如果都成功就返回true，如果有一个不成功就返回false;
    return Promise.all(promiseAll)
  },
  // 全选，全不选
  seleceAllChecked(context,value){
    let PromiseAll = [];
    context.getters.cartInfoList.cartInfoList.forEach(item=>{
        let promise = context.dispatch('changBoxsChecked',{skuId:item.skuId,isChecked:value});
        PromiseAll.push(promise)
    })
    // 加上Promise.all不然返回的不是一个promise，await不等待
    return Promise.all(PromiseAll);
  }
};

const mutations = {
  ADDDATA(state, value) {
    state.shopData = value
  },
};
const state = {
  shopData: [],
};
const getters = {
  cartInfoList(state){
    // 一次性不能拿这么深，不然会报错,防止出现undefined.xx的报错情况
      return state.shopData[0] || {}
    }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
