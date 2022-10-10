import requests  from "./request";

// 引入虚假数据的mock封装请求
import mockRequest from "./mockRequest"
// ListNav的导航请求
export const reqCategoryList = () => requests({url:'product/getBaseCategoryList',method:'get'})

export const mockRequestBanner = () => mockRequest({url:'banner',method:'get'})

export const mockRequestFloor = () => mockRequest({url:'floor',method:'get'})

export const reqSearchList = (params) => requests({
    url:'/list',
    method:'post',
    data:params,
})

export const reqDetailInfo = (skuId)=> requests({url:`/item/${skuId}`,method:'get'})

export const reqAddOrUpdateShopCart = (skuID ,skuNum ) => requests({url:`cart/addToCart/${ skuID }/${ skuNum }`,method:'post'})

export const reqShopCartInfo = () => requests({url:'cart/cartList',method:'get'})

export const reqBoxsIsCheckedChange = (skuId,isChecked) => requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'}) 
// 删除购物车物品
export const reqDeleteShop = (skuId) => requests({url:`cart/deleteCart/${skuId}`,method:'delete'})
// 获取验证码
export const reqVertifyCode = (phone) => requests({url:`user/passport/sendCode/${phone}`,method:'get'})
// 注册用户
export const reqRegisterUser = (data) => requests({url:'user/passport/register',data,method:'post'})
// 登录用户
export const reqUserLogin = (data) => requests({url:'user/passport/login',data,method:'post'})
// 获取用户信息
export const reqUserInfo = () => requests({url:'user/userAddress/auth/findUserAddressList',method:'get'})
// 退出登录，清除后台数据
export const reqUserLoginOut = ()=>requests({url:"user/passport/logout",method:'get'})
// 获取用户地址信息
export const reqUserAdress = () => requests({url:'user/userAddress/auth/findUserAddressList',method:'get'})
//获取商品信息
export const reqShopInfo = () => requests({url:`order/auth/trade`,method:'get'})
// 提交订单
export const reqSubmitShopList = (tradeNo,data)=>requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取订单信息
export const reqOrderInfo = (orderId) => requests({url:`payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付状态
export const reqPayCondition = (orderId) => requests({url:`payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取我的订单列表
export const reqOrderList = (page,limit) => requests({url:`order/auth/${page}/${limit}`,method:'get'})