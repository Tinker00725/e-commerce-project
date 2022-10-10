<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "ZoomComponent",
    props:['skuImageList'],
    data(){
      return {
        currentIndex:0,
      }
    },
    methods:{
      // 放大镜
      handler(e){
        let mask = this.$refs.mask
        // 绿色边框距离父类盒子的距离
        let left = e.offsetX - (mask.offsetWidth/2);
        let top = e.offsetY - (mask.offsetHeight/2);
        // 限制top、left不得超过父类父类边框
        if(left < 0 ) left = 0
        if(left > mask.offsetWidth) left = mask.offsetWidth;
        if(top < 0) top = 0;
        if(top > mask.offsetHeight) top = mask.offsetHeight
        // 更改left、top属性必须加上px
        mask.style.left = left +'px';
        mask.style.top = top +'px';
        // 大图反向两倍做出放大效果
        this.$refs.bigImg.style.left = -2*left + 'px'
        this.$refs.bigImg.style.top = -2*top + 'px'
      }
    },
    computed:{
      // 一开始返回的undefined，防止报错
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    // 接收兄弟组件“五张图”的index数据
    mounted(){
      this.$bus.$on('sendPicture',(index)=>{
        this.currentIndex = index
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>