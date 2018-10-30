// const testAttrsPlugin = require('../../index.js')

jest.mock('fs')
jest.mock('/vue.config.js', () => ({ lintOnSave: false }), { virtual: true })
jest.mock('vue-cli-plugin-test-attrs', () => require('../../index.js'), {
  virtual: true,
})

const fs = require('fs')
const Service = require('@vue/cli-service/lib/Service')

const mockPkg = json => {
  fs.writeFileSync('/package.json', JSON.stringify(json, null, 2))
}

const createPkg = (options = {}) => {
  mockPkg({
    devDependencies: {
      'vue-cli-plugin-test-attrs': '^1.0.0',
    },
    vue: {
      pluginOptions: {
        testAttrs: {
          enabled: undefined,
          attrs: ['test'],
          ...options,
        },
      },
    },
  })
}

const moduleMatcher = expect.arrayContaining([
  expect.objectContaining({
    preTransformNode: expect.any(Function),
  }),
])

describe('When in development mode', () => {
  beforeEach(() => {
    mockPkg({})
    process.env.VUE_CLI_MODE = 'development'
    process.env.NODE_ENV = 'development'
  })

  it('adds the module to the vue-loader config by default', () => {
    createPkg({ enabled: undefined })

    const service = new Service('/')
    service.init()

    const config = service.resolveChainableWebpackConfig()

    const options = config.module
      .rule('vue')
      .use('vue-loader')
      .get('options')

    expect(options.compilerOptions.modules).toEqual(moduleMatcher)
  })

  it("doesn't add the module to vue-loader when manually disabled", () => {
    createPkg({ enabled: false })

    const service = new Service('/')
    service.init()
    const config = service.resolveChainableWebpackConfig()

    const options = config.module
      .rule('vue')
      .use('vue-loader')
      .get('options')

    expect(options.compilerOptions.modules).toBeUndefined()
  })
})

describe('When in test mode', () => {
  beforeEach(() => {
    process.env.VUE_CLI_MODE = 'test'
    process.env.NODE_ENV = 'test'
  })

  it('adds the module tovue-loader options by default', () => {
    createPkg({ enabled: undefined })

    const service = new Service('/')
    service.init()

    const config = service.resolveChainableWebpackConfig()
    const options = config.module
      .rule('vue')
      .use('vue-loader')
      .get('options')

    expect(options.compilerOptions.modules).toEqual(moduleMatcher)
  })
})
