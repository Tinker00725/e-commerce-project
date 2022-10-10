Day1（9.27）
1.node_modules文件夹：项目依赖文件夹
2.public文件夹：webpack打包的时候会原封不动放入dist文件夹中

3.params传参props接收的方式:(**使用pramas传参只能用name属性进行跳转**)
1)传递参数的组件里:this.$router.push({
    name:'search',
    params:{
        value:this.keyWord
    }
})
2)路由相应接收props组件:
    首先:占位符写好
    然后:props($route){
        return {keyWord:$route.params.keyWord}
    }
3)接收的组件里面
    props:['keyWord']

4.query传递参props接收的方式:(使用query传参可以使用name或者path跳转马,不用占位符)
1)传递参数的组件:this.$router.push({
    path:'/search',
    query:{
        keyWord:this.keyWord
    }
})
2)路由写法:
props($route){
    return {keyWord:$route.query.keyWord}
}
3)接收:
props:['keyWord']

5.