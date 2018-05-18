
import { List } from "immutable"
import { fromJS } from "immutable"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import {
  doSaveNewDog,
  changeNewDogProp,
  changeNewDogSetParents,
  changeNewDogSireMode,
  changeNewDogSelectedSire,
  changeNewDogNewSireProp,
  changeNewDogDamMode,
  changeNewDogSelectedDam,
  changeNewDogNewDamProp
} from "../actions/admin/newdog"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import HorizontalFormField from "../components/HorizontalFormField.jsx"
import NewDogForm from "../components/NewDogForm.jsx"
import SearchOrNewDog from "../components/SearchOrNewDog.jsx"
import AdminStatusOverrideNotification from "./AdminStatusOverrideNotification.jsx"
import AdminAffectedLockedNotification from "./AdminAffectedLockedNotification.jsx"
import { toJS } from "../data/util.jsx"
import { coalesce } from "../util/data"
import { dogStatusUIMap } from "../util/ui"


const NewDogPage = ({dog, allowedGenders, setParents,
                     sireMode, sires, selectedSire, newSire,
                     damMode, dams, selectedDam, newDam,
                     canSave, isSaving,
                     onDogPropChange, onSetParentsChange,
                     onSireModeChange, onSireChange, onNewSirePropChange,
                     onDamModeChange, onDamChange, onNewDamPropChange,
                     onDoSave}) => {
  
  return (
    <React.Fragment>
      <AdminStatusOverrideNotification />
      <AdminAffectedLockedNotification />
      <CaptionedFolder caption="Dog"
                       content={<NewDogForm name={dog.name}
                                            gender={dog.gender}
                                            allowedGenders={allowedGenders}
                                            slemStatus={dog.shakingdogstatus}
                                            allowedSlemStatuses={["Affected", "Carrier", "Clear", "Unknown"]}
                                            cecsStatus={dog.cecsstatus}
                                            onDogPropChange={onDogPropChange} />} />
      <CaptionedFolder caption="Parents"
                       content={<React.Fragment>
                                  <HorizontalFormField caption="Set Parents?"
                                                       content={<label className="checkbox">
                                                                  <input type="checkbox" checked={setParents} onChange={(e) => onSetParentsChange(e.target.checked)} />
                                                                </label>}
                                                       labelClass="is-normal"
                                                       bodyClass="is-normal" />
                                  {setParents &&
                                  <React.Fragment>
                                    <hr/>
                                    <HorizontalFormField caption=""
                                                         content={<h6 className="title is-6 has-text-weight-bold">Sire Details</h6>}
                                                         labelClass="is-normal"
                                                         bodyClass="is-normal" />
                                    <SearchOrNewDog mode={sireMode}
                                                    dogs={sires}
                                                    selectedDog={selectedSire}
                                                    newDog={newSire}
                                                    allowedNewGenders={["D"]}
                                                    allowedNewSlemStatuses={["Affected", "Carrier", "Clear", "Unknown"]}
                                                    onModeChange={onSireModeChange}
                                                    onDogChange={onSireChange}
                                                    onNewDogPropChange={onNewSirePropChange} />
                                    <hr/>
                                    <HorizontalFormField caption=""
                                                         content={<h6 className="title is-6 has-text-weight-bold">Dam Details</h6>}
                                                         labelClass="is-normal"
                                                         bodyClass="is-normal" />
                                    <SearchOrNewDog mode={damMode}
                                                    dogs={dams}
                                                    selectedDog={selectedDam}
                                                    newDog={newDam}
                                                    allowedNewGenders={["B"]}
                                                    allowedNewSlemStatuses={["Affected", "Carrier", "Clear", "Unknown"]}
                                                    onModeChange={onDamModeChange}
                                                    onDogChange={onDamChange}
                                                    onNewDogPropChange={onNewDamPropChange} />
                                  </React.Fragment>
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
  dog: state.getIn(["data", "newdog", "dog"]),
  allowedGenders: fromJS(["D", "B", "U"]),
  setParents: state.getIn(["data", "newdog", "setParents"]),
  sireMode: state.getIn(["data", "newdog", "sire", "mode"]),
  sires: coalesce(state.getIn(["data", "dogs", "list"]), List()).filter(d => d.get("gender") === "D"),
  selectedSire: state.getIn(["data", "newdog", "sire", "selected"]),
  newSire: state.getIn(["data", "newdog", "sire", "dog"]),
  damMode: state.getIn(["data", "newdog", "dam", "mode"]),
  dams: coalesce(state.getIn(["data", "dogs", "list"]), List()).filter(d => d.get("gender") === "B"),
  selectedDam: state.getIn(["data", "newdog", "dam", "selected"]),
  newDam: state.getIn(["data", "newdog", "dam", "dog"]),
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onDogPropChange: (prop, value) => dispatch(changeNewDogProp(prop, value)),
  onSetParentsChange: (flag) => dispatch(changeNewDogSetParents(flag)),
  onSireModeChange: (mode) => dispatch(changeNewDogSireMode(mode)),
  onSireChange: (dog) => dispatch(changeNewDogSelectedSire(dog)),
  onNewSirePropChange: (prop, value) => dispatch(changeNewDogNewSireProp(prop, value)),
  onDamModeChange: (mode) => dispatch(changeNewDogDamMode(mode)),
  onDamChange: (dog) => dispatch(changeNewDogSelectedDam(dog)),
  onNewDamPropChange: (prop, value) => dispatch(changeNewDogNewDamProp(prop, value)),
  onDoSave: () => dispatch(doSaveNewDog())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewDogPage))
