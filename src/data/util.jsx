
import { Iterable } from "immutable"
import { reduce } from "lodash"
import React from "react"


// Higher Order component to convert Immutable values to regular
// JS values and hand them to the wrapped component
// Shamelessly plagiarised from:
//   https://redux.js.org/recipes/using-immutable.js-with-redux#use-a-higher-order-component-to-convert-your-smart-component's-immutable.js-props-to-your-dumb-component's-javascript-props
export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0
  const VALUE = 1
 
  const propsJS = _.reduce(
    Object.entries(wrappedComponentProps),
    (newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE]
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE]
      return newProps},
    {}
  )
 
  return <WrappedComponent {...propsJS} />
}
