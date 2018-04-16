
import PropTypes from "prop-types"
import React from "react"


const TabPage = ({contents, isVisible}) => {
  if (!isVisible) {
    return (null)
  }

  return (
    <div className="container">
      {contents}
    </div>
  )
}

TabPage.propTypes = {
  // Contents of the page
  contents: PropTypes.object.isRequired,
  // Are contents visible?
  isVisible: PropTypes.bool.isRequired
}

export default TabPage
