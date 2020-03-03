module.exports = function generateCompilerModule({ attrs }) {
  return {
    preTransformNode(astEl) {
      const { attrsMap, attrsList } = astEl
      attrs.forEach(attr => {
        const dAttr = `data-${attr}`
        const dAttrBound = `v-bind:data-${attr}`
        const dAttrBoundShortHand = `:data-${attr}`
        if (attrsMap[dAttr]) {
          delete attrsMap[dAttr]
          const index = attrsList.findIndex(x => x.name == dAttr)
          attrsList.splice(index, 1)
        } else if (attrsMap[dAttrBound]) {
          delete attrsMap[dAttrBound]
          const index = attrsList.findIndex(x => x.name == dAttrBound)
          attrsList.splice(index, 1)
        } else if (attrsMap[dAttrBoundShortHand]) {
          delete attrsMap[dAttrBoundShortHand]
          const index = attrsList.findIndex(x => x.name == dAttrBoundShortHand)
          attrsList.splice(index, 1)
        }
      })
      return astEl
    },
  }
}
