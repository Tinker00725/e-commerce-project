const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  // 代理服务器
  devServer:{
    proxy:{
      '/api':{
        // 目标地址
        target:"http://gmall-h5-api.atguigu.cn",
        //因为目标服务器的地址接口前都有一个api，所以这里的/api不是多余的，反而是必不可少的。
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
