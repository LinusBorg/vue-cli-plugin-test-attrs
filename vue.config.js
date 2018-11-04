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
      enabled: undefined, // false,
      attrs: ['test', 'xxx'],
    },
  },
}
