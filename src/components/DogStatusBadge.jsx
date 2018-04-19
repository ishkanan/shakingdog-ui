
import PropTypes from "prop-types"
import React from "react"

import { dogStatusUIMap } from "../util/ui"


const DogStatusBadge = ({status, size}) => {
  const uiStatus = dogStatusUIMap[status]
  
  return (
    <span className={"title " + size + " " + uiStatus.badgeClass}>{uiStatus.caption}</span>
  )
}

DogStatusBadge.propTypes = {
  // Ailment status
  status: PropTypes.string.isRequired,
  // CSS size
  size: PropTypes.string.isRequired
}

export default DogStatusBadge
