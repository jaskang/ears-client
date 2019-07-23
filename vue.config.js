module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/renderer/main.js')
      .end();
  },
  devServer: {
    // proxy: {
    //   '/proxy': {
    //     target: 'https://devapi.wesure.cn',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //     onProxyReq: function(proxyReq, req, res) {
    //       // add custom header to request
    //       console.log(proxyReq.path);
    //       console.log(req.path);
    //       // or log the req
    //     },
    //     pathRewrite: { '^/proxy': '' },
    //     logLevel: 'debug'
    //   }
    // }
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.js',
      mainProcessWatch: ['src/main'],
      builderOptions: {
        appId: 'com.ears.www',
        mac: {
          icon: 'public/logo.ico'
        },
        win: {
          icon: 'public/logo.ico'
        }
      }
    }
  }
};
