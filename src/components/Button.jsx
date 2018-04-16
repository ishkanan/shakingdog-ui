
import PropTypes from "prop-types"
import React from "react"


const Button = ({caption, className, disabled, onClick}) => {
  const additionalClassName = (className === undefined ? "" : " " + className)
  const disabledClassName = (disabled ? " is-disabled" : "")

  return (
    <a className={"button" + additionalClassName + disabledClassName}
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
