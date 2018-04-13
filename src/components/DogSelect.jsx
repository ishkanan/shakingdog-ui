
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"
import "react-select/dist/react-select.css"


const DogSelect = ({dogs, sires, dams, mode, selectedSire, selectedDam, onDogChange, onModeChange}) => {
  var sire = _.find(dogs, dog => dog.id === selectedSire)
  var dam = _.find(dogs, dog => dog.id === selectedDam)

  return (
    <React.Fragment>
      <div className="field is-horizontal">
        <div className="field-label is-narrow">
          <label className="label"></label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="radio">
                <input type="radio" name="mode" checked={mode === "single"} onChange={(e) => onModeChange("single")} />
                Single Dog
              </label>
              <label className="radio">
                <input type="radio" name="mode" checked={mode === "couple"} onChange={(e) => onModeChange("couple")} />
                Couple
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{(mode === "single" ? "Dog" : "Sire")}</label>
        </div>
        <div className="field-body">
          <Select value={(sire === undefined ? "" : sire)}
                  onChange={(value) => onDogChange("sire", (value !== null ? value.id : null))}
                  options={(mode === "single" ? dogs : sires)}
                  labelKey="name"
                  valueKey="id"
                  className="field is-expanded" />
        </div>
      </div>
      {mode === "couple" &&
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Dam</label>
        </div>
        <div className="field-body">
          <Select value={(dam === undefined ? "" : dam)}
                  onChange={(value) => onDogChange("dam", (value !== null ? value.id : null))}
                  options={dams}
                  labelKey="name"
                  valueKey="id"
                  className="field is-expanded" />
        </div>
      </div>
      }
    </React.Fragment>
  )
}

DogSelect.propTypes = {
  // List of all dogs
  dogs: PropTypes.array.isRequired,
  // List of all sires
  sires: PropTypes.array.isRequired,
  // List of all dams
  dams: PropTypes.array.isRequired,
  // Search mode
  mode: PropTypes.string.isRequired,
  // Selected sire ID (dog in single mode)
  selectedSire: PropTypes.number,
  // Selected dam ID (couple mode)
  selectedDam: PropTypes.number,
  // Events
  onDogChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired
}

export default DogSelect
