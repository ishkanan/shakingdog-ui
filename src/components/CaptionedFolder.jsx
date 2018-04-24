
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"


const CaptionedFolder = ({caption, content, postCaptionContent, captionClassName, contentClassName}) => {
  const captionClass = (_.isNil(captionClassName) ? " is-info is-medium" : " " + captionClassName)
  const contentClass = (_.isNil(contentClassName) ? "" : " " + contentClassName)

  return (
    <React.Fragment>
      <span className={"tag is-box-header" + captionClass}>
        {caption}
        {!_.isNil(postCaptionContent) && postCaptionContent}
      </span>
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
  // Content to place after caption text
  postCaptionContent: PropTypes.object,
  // Additional caption styling
  captionClassName: PropTypes.string,
  // Additional content styling
  contentClassName: PropTypes.string
}

export default CaptionedFolder
