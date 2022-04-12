const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['src/assets/styles/*']
    }
  },
  devServer: { // 反向代理实例
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 正式环境接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        },
      },
    }
  }
})
