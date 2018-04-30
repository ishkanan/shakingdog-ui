
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"


const HorizontalFormField = ({caption, content, labelClass, bodyClass}) => {
  return (
    <div className="field is-horizontal">
      <div className={"field-label " + (_.isNil(labelClass) ? "" : labelClass)}>
        <label className="label">{caption}</label>
      </div>
      <div className="field-body">
        <div className={"field " + (_.isNil(bodyClass) ? "" : bodyClass)}>
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
  content: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  // Additional classes for label
  labelClass: PropTypes.string,
  // Additional classes for body
  bodyClass: PropTypes.string
}

export default HorizontalFormField
