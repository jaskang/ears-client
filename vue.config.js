module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./src/renderer/main.js')
      .end();
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/main.js',
      mainProcessWatch: ['src/main']
    }
  }
};
