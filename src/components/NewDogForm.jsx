
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import { dogStatusUIMap, genderUIMap } from "../util/ui"


const NewDogForm = ({name, gender, allowedGenders, shakingDogStatus, cecsStatus, onNameChange, onGenderChange, onShakingDogStatusChange, onCecsStatusChange}) => {
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
                           content={<input className="input" type="text" value={name} onChange={(e) => onNameChange(e.target.value)} />}
                           isNarrow={false} />
      <HorizontalFormField caption="Gender:"
                           content={<Select value={(gender !== null ? gender : "")}
                                            onChange={(value) => onGenderChange(value !== null ? value.id : null)}
                                            options={genders}
                                            labelKey="value"
                                            valueKey="id"
                                            clearable={false}
                                            searchable={false}
                                            className="field is-expanded" />}
                           isNarrow={false} />
      <HorizontalFormField caption="SLEM Status:"
                           content={<Select value={(shakingDogStatus !== null ? shakingDogStatus : "")}
                                            onChange={(value) => onShakingDogStatusChange(value !== null ? value.id : null)}
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
  onNameChange: PropTypes.func.isRequired,
  onGenderChange: PropTypes.func.isRequired,
  onShakingDogStatusChange: PropTypes.func.isRequired,
  onCecsStatusChange: PropTypes.func.isRequired
}

export default NewDogForm
