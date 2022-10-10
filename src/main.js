import Vue from 'vue'
import App from './App.vue'
import ListNav from '@/pages/Home/ListNav'
import Carousel from "@/components/Carousel"
import router from "@/router"
import Pagenation from "@/components/Pagenation"
Vue.config.productionTip = false

// 注册了一个全局组件
Vue.component("ListNav",ListNav)
Vue.component('CarouselComponent',Carousel)
Vue.component('PagenationComponent',Pagenation)
import store from "@/store"

// 引入swiper的样式
import "swiper/css/swiper.css"
// 引入mock数据
import "@/mock/mockServe"
// 引入所有的api,从这里开始不再碰vuex获取数据
import * as API from '@/api'
//引入element-ui
import { MessageBox} from 'element-ui';
  // 现在可以全局使用按需引入的MessageBox
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  // 引入图片懒加载
  import VueLazyload from 'vue-lazyload'
  // 引入懒加载的图片 （图片与JSON文件都是默认暴露的）
  import picture from '@/assets/logo.png'
  Vue.use(VueLazyload,{
    loading:picture
  })

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
  Vue.prototype.$bus = this;
  // 将所有的api都挂载到原型上
  Vue.prototype.$API = API;

  }
}).$mount('#app')
