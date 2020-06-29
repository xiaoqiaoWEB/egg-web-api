const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist/admin',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
  },
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://app.api.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
