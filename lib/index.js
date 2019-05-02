module.exports = function generateCompilerModule({ attrs }) {
  return {
    preTransformNode(astEl) {
      const { attrsMap, attrsList } = astEl
      attrs.forEach(attr => {
        const dAttr = `data-${attr}`
        if (attrsMap[dAttr]) {
          delete attrsMap[dAttr]
          const index = attrsList.findIndex(x => x.name == dAttr)
          attrsList.splice(index, 1)
        }
      })
      return astEl
    },
  }
}
