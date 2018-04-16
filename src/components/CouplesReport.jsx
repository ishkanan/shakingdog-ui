
import PropTypes from "prop-types"
import React from "react"


const CouplesReport = ({sire, dam, children}) => {
  return (
    <div className="notification">
      COUPLES REPORT
    </div>
  )
}

CouplesReport.propTypes = {
  // Father
  sire: PropTypes.object.isRequired,
  // Mother
  dam: PropTypes.object.isRequired,
  // List of children
  children: PropTypes.array.isRequired
}

export default CouplesReport
