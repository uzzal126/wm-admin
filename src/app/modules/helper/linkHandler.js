import React from 'react'
import {Link as ReactRouterLink} from 'react-router-dom'

let linksEnabled = true // global disable flag

export function setLinksEnabled(enabled) {
  linksEnabled = enabled
}

export function Link(props) {
  const {to, children, ...rest} = props
  if (linksEnabled) {
    return (
      <ReactRouterLink to={to} {...rest}>
        {children}
      </ReactRouterLink>
    )
  } else {
    return (
      <a href={null} {...rest}>
        {children}
      </a>
    )
  }
}
