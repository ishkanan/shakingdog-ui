
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"
import "react-select/dist/react-select.css"


const RadioMultiSelect = ({radios, selects, selectedRadio, selectedValues, onRadioChange, onSelectChange}) => {
  const visibleSelects = _.filter(selects, s => s.radioId === selectedRadio)

  return (
    <React.Fragment>
      <div className="field is-horizontal">
        <div className="field-label is-narrow">
          <label className="label"></label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              {_.map(radios, r => (
              <label key={r.id} className="radio">
                <input type="radio" name="mode" checked={r.id === selectedRadio} onChange={(e) => onRadioChange(r.id)} />
                {r.value}
              </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {_.map(visibleSelects, (s, i) => (
      <div key={i} className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{s.caption}</label>
        </div>
        <div className="field-body">
          <Select value={(selectedValues[i] === undefined ? "" : selectedValues[i])}
                  onChange={(value) => onSelectChange(s.radioId, i, (value !== null ? value.id : null))}
                  options={s.data}
                  labelKey="value"
                  valueKey="id"
                  className="field is-expanded" />
        </div>
      </div>
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
