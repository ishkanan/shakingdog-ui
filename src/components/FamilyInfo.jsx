
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"

import HorizontalFormField from "./HorizontalFormField.jsx"
import DogSearchLink from "../containers/DogSearchLink.jsx"


const FamilyInfo = ({headerCaption, sire, dam, children}) => {
  return (
    <React.Fragment>
      <span className="tag is-box-header is-info is-medium">{headerCaption}</span>
      <div className="notification">
        <HorizontalFormField caption="Sire:"
                             content={<p className="control is-expanded">
                                        <DogSearchLink dogId={sire.id}
                                                       dogName={sire.name}
                                                       className="input is-static" />
                                      </p>}
                             isNarrow={false} />
        <HorizontalFormField caption="Dam:"
                             content={<p className="control is-expanded">
                                        <DogSearchLink dogId={dam.id}
                                                       dogName={dam.name}
                                                       className="input is-static" />
                                      </p>}
                             isNarrow={false} />
        {_.map(children, (child, index) => (
        <HorizontalFormField key={index}
                             caption={index === 0 ? "Children:" : ""}
                             content={<p className="control is-expanded">
                                        <DogSearchLink dogId={child.id}
                                                       dogName={child.name}
                                                       className="input is-static" />
                                      </p>}
                             isNarrow={false} />
        ))}
        {children.length === 0 &&
        <HorizontalFormField caption="Children:"
                             content={<p className="control is-expanded">
                                        <input className="input is-static" type="email" value="No children recorded." readOnly />
                                      </p>}
                             isNarrow={false} />
        }
      </div>
    </React.Fragment>
  )
}

FamilyInfo.propTypes = {
  // Text for header badge thingy
  headerCaption: PropTypes.string.isRequired,
  // Sire
  sire: PropTypes.object.isRequired,
  // Dam
  dam: PropTypes.object.isRequired,
  // Children
  children: PropTypes.array.isRequired
}

export default FamilyInfo
