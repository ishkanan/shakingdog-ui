
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"

import Button from "./Button.jsx"
import CaptionedFolder from "./CaptionedFolder.jsx"


const MultiCaptionedFolder = ({elements, captionPrefix, allowAddRemove, captionClassName, contentClassName, onAddElement, onRemoveElement}) => {
  const captionClass = (_.isNil(captionClassName) ? " is-info is-medium" : " " + captionClassName)
  const contentClass = (_.isNil(captionClassName) ? "" : " " + contentClassName)

  return (
    <React.Fragment>
      {_.map(elements, (e, i) =>
      <CaptionedFolder key={i}
                       caption={captionPrefix + " #" + (i+1).toString()}
                       content={e}
                       postCaptionContent={allowAddRemove ? <Button caption="Remove"
                                                                    className="is-danger is-small is-rounded newlitter-remove-child"
                                                                    disabled={false}
                                                                    onClick={() => onRemoveElement(i)} />
                                                          : null}
                       captionClassName={captionClassName}
                       contentClassName={contentClassName} />
      )}
      <Button caption={"Add " + captionPrefix}
              className="is-success is-rounded"
              disabled={false}
              onClick={() => onAddElement()} />
    </React.Fragment>
  )
}

MultiCaptionedFolder.propTypes = {
  // Elements to display
  elements: PropTypes.array.isRequired,
  // Prefix for folder caption
  captionPrefix: PropTypes.string.isRequired,
  // Allow add/remove of elements
  allowAddRemove: PropTypes.bool.isRequired,
  // Additional caption styling
  captionClassName: PropTypes.string,
  // Additional content styling
  contentClassName: PropTypes.string,
  // Events
  onAddElement: PropTypes.func,
  onRemoveElement: PropTypes.func
}

export default MultiCaptionedFolder
