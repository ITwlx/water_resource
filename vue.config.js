const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //设置代理服务器
  devServer:{
    proxy:{
      '/api':{
        target:'http://10.11.12.202:8000',
        changeOrigin:true,//允许跨域
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
