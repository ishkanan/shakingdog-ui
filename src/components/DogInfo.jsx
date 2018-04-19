
import PropTypes from "prop-types"
import React from "react"

import DogStatusBadge from "./DogStatusBadge.jsx"
import { coalesce } from "../util/data"
import { genderUIMap } from "../util/ui"


const DogInfo = ({name, gender, shakingDogStatus, cecsStatus}) => {
  const genderText = coalesce(genderUIMap[gender], "Unknown")

  return (
    <React.Fragment>
      <span className="tag is-box-header is-info is-medium">{name}</span>
      <div className="notification">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Gender</p>
              <p className="title is-4">{genderText}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Shaking Dog Status</p>
              <DogStatusBadge status={shakingDogStatus}
                              size="is-5" />
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">CECS Status</p>
              <DogStatusBadge status={cecsStatus}
                              size="is-5" />
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  )
}

DogInfo.propTypes = {
  // Dog name
  name: PropTypes.string.isRequired,
  // Single-letter dog gender
  gender: PropTypes.string.isRequired,
  // Shaking dog status
  shakingDogStatus: PropTypes.string.isRequired,
  // CECS status
  cecsStatus: PropTypes.string.isRequired
}

export default DogInfo
