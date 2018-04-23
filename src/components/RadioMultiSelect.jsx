
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import { uuidv4 } from "../util/data"


const RadioMultiSelect = ({radios, selects, selectedRadio, selectedValues, onRadioChange, onSelectChange}) => {
  const groupId = uuidv4()
  const visibleSelects = _.filter(selects, s => s.radioId === selectedRadio)

  const renderedOptions = _.map(radios, (r, i) => (
    <label key={i} className="radio">
      <input type="radio" name={groupId} checked={(r.id === selectedRadio)} onChange={(e) => onRadioChange(r.id)} />
      {r.value}
    </label>
  ))

  return (
    <React.Fragment>
      <HorizontalFormField caption=""
                           content={renderedOptions}
                           isNarrow={true} />
      {_.map(visibleSelects, (s, i) => (
      <HorizontalFormField key={i}
                           caption={s.caption}
                           content={<Select value={(selectedValues[i] !== null ? selectedValues[i] : "")}
                                            onChange={(value) => onSelectChange(s.radioId, s.id, (value !== null ? value.id : null))}
                                            options={s.data}
                                            labelKey="value"
                                            valueKey="id"
                                            className="field is-expanded" />}
                           isNarrow={false} />
      ))}
    </React.Fragment>
  )
}

RadioMultiSelect.propTypes = {
  // List of radio options
  radios: PropTypes.array.isRequired,
  // List of select options
  selects: PropTypes.array.isRequired,
  // Currently selected radio option
  selectedRadio: PropTypes.string,
  // Currently selected values for the selected radio option
  selectedValues: PropTypes.array,
  // Events
  onRadioChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired
}

export default RadioMultiSelect
