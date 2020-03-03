module.exports = function generateCompilerModule({ attrs }) {
  return {
    preTransformNode(astEl) {
      const { attrsMap, attrsList } = astEl
      attrs.forEach(attr => {
        const dAttr = `data-${attr}`
        const dAttr2 = `:data-${attr}`
        if (attrsMap[dAttr]) {
          delete attrsMap[dAttr]
          const index = attrsList.findIndex(x => x.name == dAttr)
          attrsList.splice(index, 1)
        } else if (attrsMap[dAttr2]) {
          delete attrsMap[dAttr2]
          const index = attrsList.findIndex(x => x.name == dAttr2)
          attrsList.splice(index, 1)
        }
      })
      return astEl
    },
  }
}
