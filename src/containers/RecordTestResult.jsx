
import { List } from "immutable"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import Select from "react-select"

import {
  doSaveTestResult,
  changeTestResultDogResult,
  changeTestResultDogMode,
  changeTestResultSelectedDog,
  changeTestResultNewDogProp,
  changeTestResultEditSire,
  changeTestResultSireMode,
  changeTestResultSelectedSire,
  changeTestResultNewSireProp,
  changeTestResultEditDam,
  changeTestResultDamMode,
  changeTestResultSelectedDam,
  changeTestResultNewDamProp
} from "../actions/admin/testresult"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import HorizontalFormField from "../components/HorizontalFormField.jsx"
import SearchOrNewDog from "../components/SearchOrNewDog.jsx"
import AdminStatusOverrideNotification from "./AdminStatusOverrideNotification.jsx"
import { toJS } from "../data/util.jsx"
import { coalesce } from "../util/data"
import { dogStatusUIMap } from "../util/ui"


const RecordTestResult = ({dogs, dogSLEMTestResult, originalSLEMStatus,
                           dogMode, selectedDog, newDog,
                           editSire, sireMode, sires, selectedSire, newSire,
                           editDam, damMode, dams, selectedDam, newDam,
                           canSave, isSaving,
                           onDogTestResultChange,
                           onDogModeChange, onDogChange, onNewDogPropChange,
                           onEditSireChange, onSireModeChange, onSireChange, onNewSirePropChange,
                           onEditDamChange, onDamModeChange, onDamChange, onNewDamPropChange,
                           onDoSave}) => {
  
  // do not allow changing from Affected
  var slemStatuses = [
    {id: "Affected", value: dogStatusUIMap["Affected"].caption},
    {id: "Carrier", value: dogStatusUIMap["Carrier"].caption},
    {id: "Clear", value: dogStatusUIMap["Clear"].caption}
  ]

  return (
    <React.Fragment>
      <AdminStatusOverrideNotification />
      <CaptionedFolder caption="Dog"
                       content={<React.Fragment>
                                  <SearchOrNewDog mode={dogMode}
                                                  dogs={dogs}
                                                  selectedDog={selectedDog}
                                                  newDog={newDog}
                                                  allowedNewGenders={["D", "B", "U"]}
                                                  allowedNewSlemStatuses={["Affected", "Carrier", "Clear"]}
                                                  onModeChange={onDogModeChange}
                                                  onDogChange={onDogChange}
                                                  onNewDogPropChange={onNewDogPropChange} />
                                  {dogMode === "search" &&
                                  <HorizontalFormField caption="SLEM Test Result:"
                                                       content={originalSLEMStatus === "Affected" ?
                                                                <p className="control is-expanded">
                                                                  <input className="input is-static" type="email" value="Affected" readOnly />
                                                                </p> :
                                                                <Select value={(dogSLEMTestResult !== null ? dogSLEMTestResult : "")}
                                                                        onChange={(value) => onDogTestResultChange("shakingdogstatus", value !== null ? value.id : null)}
                                                                        options={slemStatuses}
                                                                        labelKey="value"
                                                                        valueKey="id"
                                                                        clearable={false}
                                                                        searchable={false}
                                                                        className="field is-expanded" />
                                                               }
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                  }
                                </React.Fragment>} />
      <CaptionedFolder caption="Sire"
                       content={<React.Fragment>
                                  <HorizontalFormField caption="Update Sire?"
                                                       content={<label className="checkbox">
                                                                  <input type="checkbox" checked={editSire} onChange={(e) => onEditSireChange(e.target.checked)} />
                                                                </label>}
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                  {editSire &&
                                  <SearchOrNewDog mode={sireMode}
                                                  dogs={sires}
                                                  selectedDog={selectedSire}
                                                  newDog={newSire}
                                                  allowedNewGenders={["D"]}
                                                  allowedNewSlemStatuses={["Affected", "Carrier", "Clear"]}
                                                  onModeChange={onSireModeChange}
                                                  onDogChange={onSireChange}
                                                  onNewDogPropChange={onNewSirePropChange} />
                                  }
                                </React.Fragment>} />
      <CaptionedFolder caption="Dam"
                       content={<React.Fragment>
                                  <HorizontalFormField caption="Update Dam?"
                                                       content={<label className="checkbox">
                                                                  <input type="checkbox" checked={editDam} onChange={(e) => onEditDamChange(e.target.checked)} />
                                                                </label>}
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                  {editDam &&
                                  <SearchOrNewDog mode={damMode}
                                                  dogs={dams}
                                                  selectedDog={selectedDam}
                                                  newDog={newDam}
                                                  allowedNewGenders={["B"]}
                                                  allowedNewSlemStatuses={["Affected", "Carrier", "Clear"]}
                                                  onModeChange={onDamModeChange}
                                                  onDogChange={onDamChange}
                                                  onNewDogPropChange={onNewDamPropChange} />
                                  }
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
  dogs: coalesce(state.getIn(["data", "dogs", "list"]), List()),
  dogSLEMTestResult: state.getIn(["data", "testresult", "dog", "selected", "shakingdogstatus"]),
  originalSLEMStatus: state.getIn(["data", "testresult", "dog", "selected", "origshakingdogstatus"]),
  dogMode: state.getIn(["data", "testresult", "dog", "mode"]),
  selectedDog: state.getIn(["data", "testresult", "dog", "selected", "id"]),
  newDog: state.getIn(["data", "testresult", "dog", "dog"]),
  editSire: state.getIn(["data", "testresult", "sire", "edit"]),
  sireMode: state.getIn(["data", "testresult", "sire", "mode"]),
  sires: coalesce(state.getIn(["data", "dogs", "list"]), List()).filter(d => d.get("gender") === "D"),
  selectedSire: state.getIn(["data", "testresult", "sire", "selected"]),
  newSire: state.getIn(["data", "testresult", "sire", "dog"]),
  editDam: state.getIn(["data", "testresult", "dam", "edit"]),
  damMode: state.getIn(["data", "testresult", "dam", "mode"]),
  dams: coalesce(state.getIn(["data", "dogs", "list"]), List()).filter(d => d.get("gender") === "B"),
  selectedDam: state.getIn(["data", "testresult", "dam", "selected"]),
  newDam: state.getIn(["data", "testresult", "dam", "dog"]),
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onDogTestResultChange: (ailment, result) => dispatch(changeTestResultDogResult(ailment, result)),
  onDogModeChange: (mode) => dispatch(changeTestResultDogMode(mode)),
  onDogChange: (dog) => dispatch(changeTestResultSelectedDog(dog)),
  onNewDogPropChange: (prop, value) => dispatch(changeTestResultNewDogProp(prop, value)),
  onEditSireChange: (edit) => dispatch(changeTestResultEditSire(edit)),
  onSireModeChange: (mode) => dispatch(changeTestResultSireMode(mode)),
  onSireChange: (dog) => dispatch(changeTestResultSelectedSire(dog)),
  onNewSirePropChange: (prop, value) => dispatch(changeTestResultNewSireProp(prop, value)),
  onEditDamChange: (edit) => dispatch(changeTestResultEditDam(edit)),
  onDamModeChange: (mode) => dispatch(changeTestResultDamMode(mode)),
  onDamChange: (dog) => dispatch(changeTestResultSelectedDam(dog)),
  onNewDamPropChange: (prop, value) => dispatch(changeTestResultNewDamProp(prop, value)),
  onDoSave: () => dispatch(doSaveTestResult()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(RecordTestResult))
