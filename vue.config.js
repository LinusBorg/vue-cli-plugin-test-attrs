module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const path = require('path')
    config.resolve.alias
      .delete('@')
      .set('#example', path.resolve(__dirname, './example'))
      .set('#lib', path.resolve(__dirname, './lib'))
  },
  pluginOptions: {
    testAttrs: {
      enabled: !!process.env.VUE_CLI_USE_LOCAL_PLUGIN,
      attrs: ['test', 'xxx'],
    },
  },
}
