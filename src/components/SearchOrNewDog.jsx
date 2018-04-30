
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import NewDogForm from "./NewDogForm.jsx"
import { uuidv4 } from "../util/data"


const SearchOrNewDog = ({mode, dogs, selectedDog, newDog, allowedNewGenders, allowedNewSlemStatuses, onModeChange, onDogChange, onNewDogPropChange}) => {
  const groupId = uuidv4()

  return (
    <React.Fragment>
      <HorizontalFormField caption=""
                           content={<React.Fragment>
                                      <label className="radio">
                                        <input type="radio" name={groupId} checked={(mode === "search")} onChange={(e) => onModeChange("search")} />
                                        Search
                                      </label>
                                      <label className="radio">
                                        <input type="radio" name={groupId} checked={(mode === "new")} onChange={(e) => onModeChange("new")} />
                                        Create New
                                      </label>
                                    </React.Fragment>}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
      {mode === "search" &&
      <HorizontalFormField caption="Search"
                           content={<Select value={(!_.isNil(selectedDog) ? selectedDog : "")}
                                            onChange={(value) => onDogChange(value !== null ? value.id : null)}
                                            options={_.map(dogs, d => ({id: d.id, value: d.name}))}
                                            labelKey="value"
                                            valueKey="id"
                                            className="field is-expanded" />}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
      }
      {mode === "new" &&
      <NewDogForm name={newDog.name}
                  gender={newDog.gender}
                  allowedGenders={allowedNewGenders}
                  slemStatus={newDog.shakingdogstatus}
                  allowedSlemStatuses={allowedNewSlemStatuses}
                  cecsStatus={newDog.cecsstatus}
                  onDogPropChange={(prop, value) => onNewDogPropChange(prop, value)} />
      }
    </React.Fragment>
  )
}

SearchOrNewDog.propTypes = {
  // Search or Create New
  mode: PropTypes.string.isRequired,
  // Dogs to search
  dogs: PropTypes.array.isRequired,
  // Selected dog from search
  selectedDog: PropTypes.number,
  // New dog
  newDog: PropTypes.object.isRequired,
  // Allowed genders for new dog form
  allowedNewGenders: PropTypes.array.isRequired,
  // Allowed SLEM statuses for new dog form
  allowedNewSlemStatuses: PropTypes.array.isRequired,
  // Events
  onModeChange: PropTypes.func.isRequired,
  onDogChange: PropTypes.func.isRequired,
  onNewDogPropChange: PropTypes.func.isRequired
}

export default SearchOrNewDog
