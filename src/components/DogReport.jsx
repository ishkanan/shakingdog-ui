
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"

import DogInfo from "./DogInfo.jsx"
import FamilyInfo from "./FamilyInfo.jsx"


const DogReport = ({dog, familyAsChild, familiesAsParent}) => {
  return (
    <React.Fragment>
      <DogInfo name={dog.name}
               gender={dog.gender}
               shakingDogStatus={dog.shakingdogstatus}
               cecsStatus={dog.cecsstatus} />
      {familyAsChild !== null &&
      <FamilyInfo headerCaption="Immediate Family"
                  sire={familyAsChild.sire}
                  dam={familyAsChild.dam}
                  children={familyAsChild.children} />
      }
      {familyAsChild === null &&
      <div className="notification">
        <h6 className="title is-6">No immediate family recorded.</h6>
      </div>
      }
      {_.map(familiesAsParent, (family, index) => (
      <FamilyInfo key={index}
                  headerCaption={"Family #" + (index + 1).toString()}
                  sire={family.sire}
                  dam={family.dam}
                  children={family.children} />
      ))}
      {familiesAsParent.length === 0 &&
      <div className="notification">
        <h6 className="title is-6">No mates or children recorded.</h6>
      </div>
      }
    </React.Fragment>
  )
}

DogReport.propTypes = {
  // Dog stats
  dog: PropTypes.object.isRequired,
  // Immediate family of dog
  familyAsChild: PropTypes.object,
  // Families where dog was parent
  familiesAsParent: PropTypes.array.isRequired
}

export default DogReport
