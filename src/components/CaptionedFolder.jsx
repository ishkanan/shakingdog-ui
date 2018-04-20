
import PropTypes from "prop-types"
import React from "react"


const CaptionedFolder = ({caption, content, captionClassName, contentClassName}) => {
  const captionClass = (captionClassName === undefined ? " is-info is-medium" : " " + captionClassName)
  const contentClass = (contentClassName === undefined ? "" : " " + contentClassName)

  return (
    <React.Fragment>
      <span className={"tag is-box-header" + captionClass}>{caption}</span>
      <div className={"notification" + contentClass}>
        {content}
      </div>
    </React.Fragment>
  )
}

CaptionedFolder.propTypes = {
  // Caption at the top-left
  caption: PropTypes.string.isRequired,
  // Folder content
  content: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  // Additional caption styling
  captionClassName: PropTypes.string,
  // Additional content styling
  contentClassName: PropTypes.string
}

export default CaptionedFolder
