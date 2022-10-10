<template>
    <div class="type-nav">
            <div class="container">
                <div @mouseleave="initHovering" @mouseover="showNav">
                <h2 class="all" >全部商品分类</h2>
                <transition name="nav">
                <div class="sort" @click="jumpToSearch" v-show="show">
                    <div class="all-sort-list2" >
                        <div class="item bo" v-for="(item,index) of goods" 
                        :key="item.categoryId" 
                        :class="hovering===index?'active':''"
                        @mouseover="changeHovering(index)"
                        >
                            <h3>
                                <a :categoryName="item.categoryName" :category1Id="item.categoryId">{{item.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl class="fore" v-for="item2 of item.categoryChild" :key="item2.categoryId">
                                        <dt>
                                            <a :categoryName="item2.categoryName" :category2Id="item2.categoryId">{{item2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="item3 of item2.categoryChild" :key="item3.categoryId">
                                                <a :categoryName="item3.categoryName" :category3Id="item3.categoryId">{{item3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from "lodash/throttle"

export default {
    name:'ListNav',
    data(){
        return {
            hovering:17,
            show:false,
        }
    },
    methods:{
        // 判断在search组件里面hover的时候展示
        showNav(){
            // if(this.$route.path ==='/search' || this.$route.path === `/search/${encodeURI(this.$route.params.keyword)}`){
                if(this.$route.path !== '/home')
                this.show = true;
            },
        // },
        // 防抖
        changeHovering:throttle(function(index){
            this.hovering = index
        },50),
        // 初始化Hovering
        initHovering(){
            let timer = setTimeout(() => {
            this.hovering = -1;
            clearTimeout(timer)
            }, 51);
            if(this.$route.path !== '/home'){
                this.show = false;
            }
        },
        // 直接router-link造成卡顿，直接编程式导航页不够好（调用多次函数），我们采用编程式导航+任务委派的方式
        // 只写一次方法调用在父类的盒子上，点击父类下面的a触发该事件（事件委派）
        jumpToSearch(e){
            let sendObj = {name:'search'};
            // e.target.Attribute获取当前目标的Name，只有跳转属性有
            if(e.target.getAttribute('categoryName')){
            let query = {categoryName:e.target.getAttribute('categoryName')};
            // 确认为a跳转属性后，获取当前属性的id，作为参数传递
                if(e.target.getAttribute('category1Id')){
                    query.category1Id = e.target.getAttribute('category1Id')
                }else if(e.target.getAttribute('category2Id')){
                    query.category2Id = e.target.getAttribute('category2Id')
                }else{
                    query.category3Id = e.target.getAttribute('category3Id')
                }
                // 参数合并
                if(this.$route.params){
                    sendObj.params = this.$route.params
                }
            sendObj.query = query;
            }
            this.$router.push(sendObj)
        }
    },
    mounted(){    
        // 判断到达search路由的时候自动隐藏sort列表
        if(this.$route.path === '/home'){
            this.show = true;
        }
    },
    computed:{
        ...mapState('home',['goods'])
    }
}
</script>

<style scoped lang="less">
    // sort标签进入退出动画
    .nav-enter-active{
        animation: action 0.3s;
    }
    .nav-leave-active{
        animation: action 0.3s reverse
    }
    @keyframes action {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    a{
        cursor: pointer;
    }
    .active{
        background-color: lightblue;
    }
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }

</style>