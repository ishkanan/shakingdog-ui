
import PropTypes from "prop-types"
import React from "react"

import { coalesce } from "../util"


const DogInfo = ({name, gender, shakingDogStatus, cecsStatus}) => {
  const genders = {
    "D": "Male",
    "B": "Female"
  }

  return (
    <React.Fragment>
      <span className="tag is-box-header is-info is-medium">{name}</span>
      <div className="notification">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Gender</p>
              <p className="title is-5">{coalesce(genders[gender], "Unknown")}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Shaking Dog Status</p>
              <p className="title is-5">{shakingDogStatus}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">CECS Status</p>
              <p className="title is-5">{cecsStatus}</p>
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
