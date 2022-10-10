<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFoot"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';
export default {
  name:'App',
  components: { Header, Footer },
  data(){
    return {
    }
  },
  // ListNav组件多次调用，发一次请求后存储到本地,防止多次请求，App只挂载一次
  mounted(){
    this.$store.dispatch('home/getDataToNav')
  }
}
</script>

<style>

</style>