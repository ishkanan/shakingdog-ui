
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import { dogStatusUIMap, genderUIMap } from "../util/ui"


const NewDogForm = ({name, gender, shakingDogStatus, cecsStatus, onNameChange, onGenderChange, onShakingDogStatusChange, onCecsStatusChange}) => {
  const sStatus = dogStatusUIMap[shakingDogStatus]
  const cStatus = dogStatusUIMap[cecsStatus]

  const genders = [
    {id: "D", value: genderUIMap["D"]},
    {id: "B", value: genderUIMap["B"]},
    {id: "U", value: genderUIMap["U"]}
  ]

  const shakingStatuses = [
    {id: "Affected", value: dogStatusUIMap["Affected"]},
    {id: "Carrier", value: dogStatusUIMap["Carrier"]},
    {id: "Clear", value: dogStatusUIMap["Clear"]},
    {id: "Unknown", value: dogStatusUIMap["Unknown"]}
  ]

  return (
    <React.Fragment>
      <HorizontalFormField caption="Name:"
                           content={<input className="input" type="text" value={name} onChange={onNameChange} />}
                           isNarrow={false} />
      <HorizontalFormField caption="Gender:"
                           content={<Select value={(gender !== null ? gender : "")}
                                            onChange={(value) => onGenderChange(value !== null ? value.id : null)}
                                            options={genders}
                                            labelKey="value"
                                            valueKey="id"
                                            className="field is-expanded" />}
                           isNarrow={false} />
      <HorizontalFormField caption="Shaking Dog Status:"
                           content={<Select value={(sStatus !== null ? sStatus : "")}
                                            onChange={(value) => onShakingDogStatusChange(value !== null ? value.id : null)}
                                            options={shakingStatuses}
                                            labelKey="value"
                                            valueKey="id"
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
