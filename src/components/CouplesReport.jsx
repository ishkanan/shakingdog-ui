
import PropTypes from "prop-types"
import React from "react"

import FamilyInfo from "./FamilyInfo.jsx"


const CouplesReport = ({sire, dam, children}) => {
  return (
    <FamilyInfo headerCaption="Immediate Family"
                sire={sire}
                dam={dam}
                children={children} />
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
