
import PropTypes from "prop-types"
import React from "react"


const Button = ({caption, className, disabled, onClick}) => {
  const additionalClassName = (className === undefined ? "" : " " + className)

  return (
    <a className={"button" + additionalClassName}
       disabled={disabled}
       onClick={(e) => {e.preventDefault(); onClick()}}>
      {caption}
    </a>
  )
}

Button.propTypes = {
  // Visible button text
  caption: PropTypes.string.isRequired,
  // Additional classes to apply
  className: PropTypes.string,
  // Disabled flag
  disabled: PropTypes.bool.isRequired,
  // Events
  onClick: PropTypes.func.isRequired
}

export default Button
