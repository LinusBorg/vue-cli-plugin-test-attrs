# vue-cli-plugin-test-attrs

> A plugin for vue-cli that adds a compiler module to vue-loader
> that can remove predefined data attributes from your SFC templates at build time

## Why

When testing your component, you frequently need to select some dom element to check if it is present, has the right properties and so forth.

Using classes and ids for this is not a good idea, as [explained in this blog](https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269) post by the grat Kent C. Dodds. While written with React in mind, the same problems apply to Vue components.

The proposed solution: Using data attributes instead, which are not linked to your styles and don't pollute your csss class namespace.

But we don't want these properties to make it into our production code, right? Besides looking amateurish it will increase the size of our render functions.

- In React, this can be solved with a babel plugin.
- In Vue, we can solve it with a compiler module for vue-loader.

This vue-cli-plugin adds such a compiler plugin for you into the webpack config and exposes a few configuration options in vue.config.js for your convenience.

## Usage

### Jest

### Mocha

### Cypress

### Nichtwatch

> I haven't tested this plugin with nightwatch yet, so if you can contribute instructions, please go ahead and open a PR.

### Rollup
