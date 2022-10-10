// 设置本地存储
export const setToken = (value)=>{
    localStorage.setItem('TOKEN',value)
}
//获取本地存储的token
export const getToken = (value)=>{
    return localStorage.getItem(value)
}
// 清除本地的token
export const removeToken = (name)=>{
    localStorage.removeItem(name)
}