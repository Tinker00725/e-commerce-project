import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import Cart from "@/store/Cart"
import Register from "@/store/register"
import Trade from "@/store/Trade"
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        Cart,
        Register,
        Trade
    }
})