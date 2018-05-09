
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import Select from "react-select"

import {
  doSaveSetGender,
  changeSetGenderGender,
  changeSetGenderSelected
} from "../actions/admin/setgender"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import HorizontalFormField from "../components/HorizontalFormField.jsx"
import { toJS } from "../data/util.jsx"


const SetGenderPage = ({dogs, selectedDog, gender, canSave, isSaving, onDogChange, onGenderChange, onDoSave}) => {
  const genders = [
    {id: "D", value: "D"},
    {id: "B", value: "B"}
  ]

  return (
    <React.Fragment>
      <CaptionedFolder caption="Dog"
                       content={<React.Fragment>
                                  <HorizontalFormField caption="Search:"
                                                       content={<Select value={(!_.isNil(selectedDog) ? selectedDog : "")}
                                                                        onChange={(value) => onDogChange(value !== null ? value.id : null)}
                                                                        options={_.map(dogs, d => ({id: d.id, value: d.name}))}
                                                                        labelKey="value"
                                                                        valueKey="id"
                                                                        className="field is-expanded" />}
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                  <HorizontalFormField caption="Gender:"
                                                       content={<Select value={(gender !== null ? gender : "")}
                                                                        onChange={(value) => onGenderChange(value !== null ? value.id : null)}
                                                                        options={genders}
                                                                        labelKey="value"
                                                                        valueKey="id"
                                                                        clearable={false}
                                                                        searchable={false}
                                                                        className="field is-expanded" />}
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                </React.Fragment>} />
      <hr/>
      <Button caption="Save"
              className={"is-primary is-rounded" + (isSaving ? " is-loading" : "")}
              disabled={!canSave}
              onClick={() => onDoSave()} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  dogs: state.getIn(["data", "dogs", "list"]),
  selectedDog: state.getIn(["data", "setgender", "selected"]),
  gender: state.getIn(["data", "setgender", "gender"]),
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onDogChange: (dogId) => dispatch(changeSetGenderSelected(dogId)),
  onGenderChange: (gender) => dispatch(changeSetGenderGender(gender)),
  onDoSave: () => dispatch(doSaveSetGender()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SetGenderPage))
