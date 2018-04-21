
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"


const Link = ({caption, className, onClick}) => {
  return (
    <a className={_.isNil(className) ? "" : className} onClick={(e) => {e.preventDefault(); onClick()}}>{caption}</a>
  )
}

Link.propTypes = {
  // Link text
  caption: PropTypes.string.isRequired,
  // Additional CSS classes
  className: PropTypes.string,
  // Events
  onClick: PropTypes.func.isRequired
}

export default Link
