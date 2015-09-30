import React from 'react'
import TestUtils from 'react-addons-test-utils'

function mapChildren(children) {
  let mappedChildren = []

  React.Children.forEach(children, (c) => {
    mappedChildren.push(mapComponent(c))
  })

  if (mappedChildren.length === 1) {
    return mappedChildren[0]
  } else {
    return mappedChildren
  }
}

function mapComponent(comp) {

  if (typeof comp.type === 'function') {
    return renderComponent(comp)
  }

  if (!comp.props || !comp.props.children || comp.props.children.length === 0) {
    return comp
  }

  // Writable is set to true.
  // Let's change that...hehe
  const newComp = {
    ...comp,
    props: {
      ...comp.props
    }
  }

  newComp.props.children = mapChildren(comp.props.children)

  return newComp
}

function renderComponentInRenderer(renderer, comp) {
  renderer.render(comp)

  return mapComponent(renderer.getRenderOutput())
}

export default function renderComponent(comp) {
  return renderComponentInRenderer(TestUtils.createRenderer(), comp)
}
