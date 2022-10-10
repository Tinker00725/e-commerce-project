<template>
    <div>
      <ListNav></ListNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <GoodsRange></GoodsRange>
      <GuessLike></GuessLike>
      <FloorComponent v-for="floor of floorList" :key="floor.id" :floor="floor"></FloorComponent>
      <BrandLogo></BrandLogo>
    </div>
  </template>
  
  <script>
  import ListContainer from '@/pages/Home/ListContainer'
  import Recommend from "./Recommend/index.vue"
  import GoodsRange from "./GoodsRange/index.vue"
  import GuessLike from "./GuessLike/index.vue"
  import FloorComponent from "./FloorComponent"
  import BrandLogo from "./BrandLogo/index.vue"
  import { mapState } from 'vuex'
  export default {
    name:"HomeComponent",
    components:{ ListContainer, Recommend, GoodsRange, GuessLike, FloorComponent, BrandLogo },
    mounted(){
      this.$store.dispatch('home/getFloorToFloor');
      // 获取用户信息
      // this.$store.dispatch('Register/getUserInfo')
      // 不用了，因为获取用户信息都写在前置守卫那了
    },
    computed:{
      ...mapState('home',['floorList'])
    }
  }
  </script>
  
  <style>
  
  </style>