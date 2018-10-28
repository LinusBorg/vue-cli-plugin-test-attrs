# vue-cli-plugin-test-attrs

> A plugin for vue-cli that adds a compiler module to vue-loader
> that can remove predefined data attributes from your SFC templates at build time

## Why

When testing your component, you frequently need to select some dom element to check if it is present, has the right properties and so forth.

Using classes and ids for this is not a good idea, as [explained in this blog](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269) post by the great Kent C. Dodds. While written with React in mind, the same problems apply to Vue components.

The proposed solution: Use data attributes instead, which are not linked to your styles and don't pollute your csss class namespace.

But we don't want these properties to make it into our production code, right? Besides looking amateurish it will increase the size of our render functions.

- In React, this can be solved with a babel plugin.
- In Vue, we can solve it with a compiler module for vue-loader.

This vue-cli-plugin adds such a compiler plugin for you into the webpack config and exposes a few configuration options in vue.config.js for your convenience.

## Usage

by default, this plugin adds the compiler module to vue-loader's config, so the `data-test` attributes will be removed and not end up in the bundle that you serve.

It does _not_ add it (and consequently, keep the `data-` attributes) when:

- `process.env.NODE_ENV === 'test'` or
- `!!process.env.VUE_CLI_KEEP_TEST_ATTRS`

This means it should out of the box for unit tests with `jest` and `mocha`, where `NODE_ENV ==== 'test'` - in yout unit tests, the `data-test` attributes will be present.

For other environments, you can use the `VUE_CLI_STRIP_TEST_ATTRS` environment variable to skipt addind the compiler module so `data-test` attributes are persisted.

the plugin's options can be configured in `vue.config.js`:

```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    testAttrs: {
      // you can enable and disabvle it yourself,
      // i.e. with an environment variable:
      enabled: process.env.MY_COOL_ENV,
      // you can also define which `data-` attributes should
      // should be removed.
      attrs: ['test'], // default: removes `data-test="..."`
    },
  },
}
```

### Jest

As explained above, the plugin should work out of the box

### Mocha

As explained above, the plugin should work out of the box

### Cypress

E2E tests with Cypress usually run in `'production'` mode, so by default this plugin would remove all `data-test` atributes. To keep them in your code for your e2e tests, you can set the `VUE_CLI_KEEP_TEST_ATTRS` environment variable:

```
"test:e2e": "process.env.VUE_CLI_KEEP_TEST_ATTRS=true vue-cli-service test:e2e"
```

However, I would personally suggest to use a custom environment:

```
# .env.e2e
NODE_ENV=production
VUE_CLI_KEEP_TEST_ATTRS=true
```

```
"test:e2e": "vue-cli-service test:e2e --mode e2e"
```

### Nichtwatch

> I haven't tested this plugin with nightwatch yet, so if you can contribute instructions, please go ahead and open a PR.

### Rollup
