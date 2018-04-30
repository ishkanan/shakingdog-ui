
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import { dogStatusUIMap, genderUIMap } from "../util/ui"


const NewDogForm = ({name, gender, allowedGenders, slemStatus, allowedSlemStatuses, cecsStatus, onDogPropChange}) => {
  const genders = _.map(allowedGenders, gender => ({id: gender, value: genderUIMap[gender]}))
  const slemStatuses = _.map(allowedSlemStatuses, status => ({id: status, value: dogStatusUIMap[status].caption}))

  return (
    <React.Fragment>
      <HorizontalFormField caption="Name:"
                           content={<input className="input" type="text" value={name} onChange={(e) => onDogPropChange("name", e.target.value)} />}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
      <HorizontalFormField caption="Gender:"
                           content={<Select value={(gender !== null ? gender : "")}
                                            onChange={(value) => onDogPropChange("gender", value !== null ? value.id : null)}
                                            options={genders}
                                            labelKey="value"
                                            valueKey="id"
                                            clearable={false}
                                            searchable={false}
                                            className="field is-expanded" />}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
      <HorizontalFormField caption="SLEM Status:"
                           content={<Select value={(slemStatus !== null ? slemStatus : "")}
                                            onChange={(value) => onDogPropChange("shakingdogstatus", value !== null ? value.id : null)}
                                            options={slemStatuses}
                                            labelKey="value"
                                            valueKey="id"
                                            clearable={false}
                                            searchable={false}
                                            className="field is-expanded" />}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
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
  slemStatus: PropTypes.string.isRequired,
  // Allowed SLEM statuses
  allowedSlemStatuses: PropTypes.array.isRequired,
  // CECS status
  cecsStatus: PropTypes.string.isRequired,
  // Events
  onDogPropChange: PropTypes.func.isRequired
}

export default NewDogForm
