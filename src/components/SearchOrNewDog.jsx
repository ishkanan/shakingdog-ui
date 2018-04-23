
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import HorizontalFormField from "./HorizontalFormField.jsx"
import NewDogForm from "./NewDogForm.jsx"
import { uuidv4 } from "../util/data"


const SearchOrNewDog = ({mode, dogs, selectedDog, newDog, onModeChange, onDogChange, onNewDogPropChange}) => {
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
                           isNarrow={false} />
      <HorizontalFormField caption="Search"
                           content={<Select value={(!_.isNil(selectedDog) ? selectedDog.name : "")}
                                            onChange={(value) => onDogChange(value !== null ? value.id : null)}
                                            options={_.map(dogs, d => ({id: d.id, value: d.name}))}
                                            labelKey="value"
                                            valueKey="id"
                                            className="field is-expanded" />}
                           isNarrow={false} />
      <hr/>
      <NewDogForm name={newDog.name}
                  gender={newDog.gender}
                  shakingDogStatus={newDog.shakingdogstatus}
                  cecsStatus={newDog.cecsstatus}
                  onNameChange={(value) => onNewDogPropChange("name", name)}
                  onGenderChange={(value) => onNewDogPropChange("gender", name)}
                  onShakingDogStatusChange={(value) => onNewDogPropChange("shakingdogstatus", name)}
                  onCecsStatusChange={(value) => onNewDogPropChange("cecsstatus", name)} />
    </React.Fragment>
  )
}

SearchOrNewDog.propTypes = {
  // Search or Create New
  mode: PropTypes.string.isRequired,
  // Dogs to search
  dogs: PropTypes.array.isRequired,
  // Selected dog from search
  selectedDog: PropTypes.object,
  // New dog
  newDog: PropTypes.object.isRequired,
  // Events
  onModeChange: PropTypes.func.isRequired,
  onDogChange: PropTypes.func.isRequired,
  onNewDogPropChange: PropTypes.func.isRequired
}

export default SearchOrNewDog
