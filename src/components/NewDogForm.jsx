
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import { dogStatusUIMap, genderUIMap } from "../util/ui"


const NewDogForm = ({name, gender, allowedGenders, shakingDogStatus, cecsStatus, onDogPropChange}) => {
  const genders = _.map(allowedGenders, gender => ({id: gender, value: genderUIMap[gender]}))
  
  const shakingStatuses = [
    {id: "Affected", value: dogStatusUIMap["Affected"].caption},
    {id: "Carrier", value: dogStatusUIMap["Carrier"].caption},
    {id: "Clear", value: dogStatusUIMap["Clear"].caption},
    {id: "Unknown", value: dogStatusUIMap["Unknown"].caption}
  ]

  return (
    <React.Fragment>
      <HorizontalFormField caption="Name:"
                           content={<input className="input" type="text" value={name} onChange={(e) => onDogPropChange("name", e.target.value)} />}
                           isNarrow={false} />
      <HorizontalFormField caption="Gender:"
                           content={<Select value={(gender !== null ? gender : "")}
                                            onChange={(value) => onDogPropChange("gender", value !== null ? value.id : null)}
                                            options={genders}
                                            labelKey="value"
                                            valueKey="id"
                                            clearable={false}
                                            searchable={false}
                                            className="field is-expanded" />}
                           isNarrow={false} />
      <HorizontalFormField caption="SLEM Status:"
                           content={<Select value={(shakingDogStatus !== null ? shakingDogStatus : "")}
                                            onChange={(value) => onDogPropChange("shakingdogstatus", value !== null ? value.id : null)}
                                            options={shakingStatuses}
                                            labelKey="value"
                                            valueKey="id"
                                            clearable={false}
                                            searchable={false}
                                            className="field is-expanded" />}
                           isNarrow={false} />
    </React.Fragment>
  )
}

NewDogForm.propTypes = {
  // Name
  name: PropTypes.string.isRequired,
  // Gender
  gender: PropTypes.string.isRequired,
  // Allowed genders
  allowedGenders: PropTypes.array.isRequired,
  // Shaking dog status
  shakingDogStatus: PropTypes.string.isRequired,
  // CECS status
  cecsStatus: PropTypes.string.isRequired,
  // Events
  onDogPropChange: PropTypes.func.isRequired
}

export default NewDogForm
