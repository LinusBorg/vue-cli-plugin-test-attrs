module.exports = {
  lintOnSave: false,
  pluginOptions: {
    testAttrs: {
      enabled: process.env.NODE_ENV != 'test',
      attrs: ['test', 'hook'],
    },
  },
}
