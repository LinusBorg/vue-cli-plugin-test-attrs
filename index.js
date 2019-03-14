/**
 * This is the entry for for the plugin
 *
 */

const generateCompilerModule = require('./lib/')

module.exports = (api, projectOptions) => {
  const defaultOptions = genDefOpts()

  const pluginOptions = projectOptions.pluginOptions.testAttrs || {}
  const options = { ...defaultOptions, ...pluginOptions }

  if (options.enabled === false) return

  api.chainWebpack(config => {
    const rule = config.module.rule('vue')

    const vueLoaderCacheConfig = genVueLoaderCacheConfig()
    rule.use('cache-loader').tap(() => vueLoaderCacheConfig)

    rule.use('vue-loader').tap(vueLoaderOptions => {
      const compilerOptions = vueLoaderOptions.compilerOptions
      const modules = compilerOptions.modules || []

      modules.push(generateCompilerModule(options))

      compilerOptions.modules = modules
      vueLoaderOptions.compilerOptions = compilerOptions

      return {
        ...vueLoaderOptions,
        ...vueLoaderCacheConfig,
      }
    })
  })

  function genDefOpts() {
    let enabled
    if (process.env.VUE_CLI_KEEP_TEST_ATTRS) {
      enabled = false
    }

    if (enabled === undefined && process.env.NODE_ENV === 'test') {
      enabled = false
    }
    return {
      enabled,
      attrs: ['test'],
    }
  }

  function genVueLoaderCacheConfig() {
    return api.genCacheConfig('vue-loader', {
      'vue-loader': require('vue-loader/package.json').version,
      /* eslint-disable-next-line node/no-extraneous-require */
      '@vue/component-compiler-utils': require('@vue/component-compiler-utils/package.json')
        .version,
      'vue-template-compiler': require('vue-template-compiler/package.json')
        .version,
      testAttrsOptions: JSON.stringify(options),
    })
  }
}
