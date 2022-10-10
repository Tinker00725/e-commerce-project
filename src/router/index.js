// 引入vue、vue-router
import Vue from 'vue'
import VueRouter from "vue-router"
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

// 重写push、replace方法，解决重复点击相同路由报错
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 引入组件
// 不引入组件了，都是用路由懒加载直接引入↓
// 配置路由
let router = new VueRouter({
    routes:[
        {
            path:'/center',
            component:()=>import("@/pages/Center"),
            meta:{showFoot:true},
            children:[
                {
                    path:'grouporder',
                    component:()=>import("@/pages/Center/GroupOrder"),
                },
                {
                    path:'myorder',
                    component:()=>import("@/pages/Center/MyOrder"),
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },//center
        {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{showFoot:true},
            beforeEnter:(to,from,next)=> (from.path.includes('pay')? next():next(false))
        },//PaySuccess
        {
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{showFoot:true},
            beforeEnter:(to,from,next)=> (from.path.includes('trade')? next():next(false))
        },//Pay
        {
            path:'/trade',
            component:()=>import("@/pages/Trade"),
            meta:{showFoot:true},
            beforeEnter:(to,from,next)=> (from.path.includes('shopcart')? next():next(false))
        },//Trade
        {
            path:'/shopcart',
            component:()=>import("@/pages/ShopCart"),
            meta:{showFoot:true}
        },//'/shopcart'
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:()=>import("@/pages/AddCartSuccess"),
            meta:{showFoot:true}
        },//addcartsuccess
        {
            path:'/detail/:skuid',
            component:()=>import('@/pages/Detail'),
            meta:{showFoot:true}
        },//detail
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{showFoot:true,showNav:true},
        },//home
        {
            path:'/login',
            component:()=>import('@/pages/Login'),
            meta:{showFoot:false},
        },//login
        {
            path:'/register',
            component:()=>import('@/pages/Register'),
            meta:{showFoot:false}

        },//register
        {
            name:'search',
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta:{showFoot:true,showNav:false},
            // params传参props接收
            props($route){
                return {keyword:$route.params.keyword,categoryName:$route.query.categoryName}
            }
        },//search
        {
            // 访问所有路径转变为访问/home路径,进入看首页
            path:"*",
            redirect:'/home'
        }//进入重定向到home
    ],
    // 跳转路由滚动到顶部
    scrollBehavior(to,from,savePosition){
        return {y:0,behavior:'smooth'}
    }
})
// 全局前置守卫
router.beforeEach(async (to,from,next)=>{
    if(store.state.Register.token){
        // 登录了
        if(to.path=='/login'){
            // 登录了去login，重定向home
            next('/home')
        }else{
            //登录了，去的除了login的路由
            if(store.state.Register.phoneNum){
                // 如果有phoneNum（进入后不刷新）
                next()
            }else{
                // 没有phoneNum了（进入后刷新了，用户数据都丢失了）要重新发送请求
                try{
                    await store.dispatch('Register/getUserInfo')
                    next()
                }catch(error){
                    //token失效:清除数据+重新登录
                    store.dispatch('Register/outUserLogin');
                    next('/login')
                }

            }
        }
    }else{
        //没登录
        // pay/paysuccess/center去不了
        let toPath = to.path;
        if(toPath.includes('/pay') || toPath.includes('/success') || toPath.includes('/center')){
            console.log(toPath)
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})

export default router;

