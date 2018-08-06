/**
 * This is the entry for for the plugin
 *
 */

const generateCompilerModule = require('./lib/')

const defaultOptions = {
  enable: process.env.NODE_ENV !== 'test',
  attrs: ['test'],
}

module.exports = (api, projectOptions) => {
  const pluginOptions = projectOptions.testAttrs || {}
  const options = { ...defaultOptions, pluginOptions }

  api.chainWebpack(config => {
    const rule = config.module.rule('vue')

    rule.use('vue-loader').tap(vueLoaderOptions => {
      const compiler = vueLoaderOptions.compiler || {}
      const modules = compiler.modules || []

      modules.push(generateCompilerModule(options))

      compiler.modules = modules
      vueLoaderOptions.compiler = compiler

      return vueLoaderOptions
    })
  })
}
