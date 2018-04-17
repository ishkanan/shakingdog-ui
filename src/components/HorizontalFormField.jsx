
import PropTypes from "prop-types"
import React from "react"


const HorizontalFormField = ({caption, content, isNarrow}) => {
  const additionalClass = (isNarrow ? "is-narrow" : "is-normal")

  return (
    <div className="field is-horizontal">
      <div className={"field-label " + additionalClass}>
        <label className="label">{caption}</label>
      </div>
      <div className="field-body">
        <div className={"field " + additionalClass}>
          {content}
        </div>
      </div>
    </div>
  )
}

HorizontalFormField.propTypes = {
  // Label text
  caption: PropTypes.string.isRequired,
  // Control content
  content: PropTypes.object.isRequired,
  // Use is-narrow Bulma class
  isNarrow: PropTypes.bool.isRequired
}

export default HorizontalFormField
