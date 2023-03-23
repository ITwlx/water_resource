// const { defineConfig } = require('@vue/cli-service')
// defineConfig
module.exports = {
  // transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/app': {
        target: 'http://10.11.12.202:8000'
      }
    }
  }
}