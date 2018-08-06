const findIndex = require('lodash-es/findIndex')

module.exports = function generateCompilerModule({ attrs, enabled }) {
  return {
    preTransformNode(astEl) {
      if (enabled) {
        const { attrsMap, attrsList } = astEl
        attrs.forEach(attr => {
          const dAttr = `data-${attr}`
          if (attrsMap[dAttr]) {
            delete attrsMap[dAttr]
            const index = findIndex(attrsList, x => x.name == dAttr)
            attrsList.splice(index, 1)
          }
        })
      }
      return astEl
    },
  }
}
