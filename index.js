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

  const vueLoaderCacheConfig = api.genCacheConfig('vue-loader', {
    'vue-loader': require('vue-loader/package.json').version,
    /* eslint-disable-next-line node/no-extraneous-require */
    '@vue/component-compiler-utils': require('@vue/component-compiler-utils/package.json')
      .version,
    'vue-template-compiler': require('vue-template-compiler/package.json')
      .version,
    testAttrs: 'true',
  })

  const options = { ...defaultOptions, ...pluginOptions }
  api.chainWebpack(config => {
    const rule = config.module.rule('vue')

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
}
