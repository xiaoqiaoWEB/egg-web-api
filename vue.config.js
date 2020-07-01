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
      .set('views', resolve('src/views'))
  },
  devServer: {
    port: 8888,
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    }
  }
}
