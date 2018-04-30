
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"

import CaptionedFolder from "./CaptionedFolder.jsx"
import DogStatusBadge from "./DogStatusBadge.jsx"
import HorizontalFormField from "./HorizontalFormField.jsx"
import DogSearchLink from "../containers/DogSearchLink.jsx"


const FamilyInfo = ({headerCaption, sire, dam, children}) => {
  return (
    <CaptionedFolder caption={headerCaption}
                     content={<div className="notification">
                                <HorizontalFormField caption="Sire:"
                                                     content={<p className="control is-expanded dogsearchlink">
                                                                <DogSearchLink dogId={sire.id}
                                                                               dogName={sire.name} />
                                                                <DogStatusBadge status={sire.shakingdogstatus}
                                                                                size="is-6" />
                                                              </p>}
                                                     labelClass="is-normal"
                                                     bodyClass="is-normal" />
                                <HorizontalFormField caption="Dam:"
                                                     content={<p className="control is-expanded dogsearchlink">
                                                                <DogSearchLink dogId={dam.id}
                                                                               dogName={dam.name} />
                                                                <DogStatusBadge status={dam.shakingdogstatus}
                                                                                size="is-6" />
                                                              </p>}
                                                     labelClass="is-normal"
                                                     bodyClass="is-normal" />
                                {_.map(children, (child, index) => (
                                <HorizontalFormField key={index}
                                                     caption={index === 0 ? "Children:" : ""}
                                                     content={<p className="control is-expanded dogsearchlink">
                                                                <DogSearchLink dogId={child.id}
                                                                               dogName={child.name} />
                                                                <DogStatusBadge status={child.shakingdogstatus}
                                                                                size="is-6" />
                                                              </p>}
                                                     labelClass="is-normal"
                                                     bodyClass="is-normal" />
                                ))}
                                {children.length === 0 &&
                                <HorizontalFormField caption="Children:"
                                                     content={<p className="control is-expanded">
                                                                <input className="input is-static" type="email" value="No children recorded." readOnly />
                                                              </p>}
                                                     labelClass="is-normal"
                                                     bodyClass="is-normal" />
                                }
                              </div>} />
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
