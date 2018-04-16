
import PropTypes from "prop-types"
import React from "react"


const DogReport = ({dog, familyAsChild, familiesAsParent}) => {
  return (
    <div className="notification">
      DOG REPORT
    </div>
  )
}

DogReport.propTypes = {
  // Dog stats
  dog: PropTypes.object.isRequired,
  // Immediate family of dog
  familyAsChild: PropTypes.object.isRequired,
  // Families where dog was parent
  familiesAsParent: PropTypes.array.isRequired
}

export default DogReport
