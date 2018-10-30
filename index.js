/**
 * This is the entry for for the plugin
 *
 */

const generateCompilerModule = require('./lib/')

const defaultOptions = {
  enabled:
    process.env.NODE_ENV !== 'test' || !!process.env.VUE_CLI_KEEP_TEST_ATTRS,
  attrs: ['test'],
}

module.exports = (api, projectOptions) => {
  const pluginOptions = projectOptions.pluginOptions.testAttrs || {}

  if (pluginOptions.enabled === false) return

  const options = { ...defaultOptions, ...pluginOptions }
  api.chainWebpack(config => {
    const rule = config.module.rule('vue')

    rule.use('vue-loader').tap(vueLoaderOptions => {
      const compiler = vueLoaderOptions.compilerOptions || {}
      const modules = compiler.modules || []
      modules.push(generateCompilerModule(options))

      compiler.modules = modules
      vueLoaderOptions.compilerOptions = compiler

      return vueLoaderOptions
    })
  })
}
