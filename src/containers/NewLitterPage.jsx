
import React from "react"
import { connect } from "react-redux"

import {
  setNewLitterSireMode,
  setNewLitterSelectedSire,
  setNewLitterNewSireProp,
  setNewLitterDamMode,
  setNewLitterSelectedDam,
  setNewLitterNewDamProp,
  doSaveNewLitter
} from "../actions/admin/newlitter"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import SearchOrNewDog from "../components/SearchOrNewDog.jsx"
import { toJS } from "../data/util.jsx"


const NewLitterPage = ({sireMode, sires, selectedSire, newSire,
                       damMode, dams, selectedDam, newDam,
                       canSave, isSaving,
                       onSireModeChange, onSireChange, onNewSirePropChange,
                       onDamModeChange, onDamChange, onNewDamPropChange,
                       onDoSave}) => {
  return (
    <React.Fragment>
      <CaptionedFolder caption="Sire"
                       content={<SearchOrNewDog mode={sireMode}
                                                dogs={sires}
                                                selectedDog={selectedSire}
                                                newDog={newSire}
                                                onModeChange={onSireModeChange}
                                                onDogChange={onSireChange}
                                                onNewDogPropChange={onNewSirePropChange} />} />
      <CaptionedFolder caption="Dam"
                       content={<SearchOrNewDog mode={damMode}
                                                dogs={dams}
                                                selectedDog={selectedDam}
                                                newDog={newDam}
                                                onModeChange={onDamModeChange}
                                                onDogChange={onDamChange}
                                                onNewDogPropChange={onNewDamPropChange} />} />
      <CaptionedFolder caption="Children"
                       content={<p>CHILDREN CONTROLS</p>} />
      <Button caption="Save"
              className={"is-primary is-rounded" + (isSaving ? " is-loading" : "")}
              disabled={!canSave}
              onClick={() => onDoSave()} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  sireMode: state.getIn(["data", "newlitter", "sire", "mode"]),
  sires: state.getIn(["data", "dogs", "list"]).filter(d => d.get("gender") === "D"),
  selectedSire: state.getIn(["data", "newlitter", "sire", "selected"]),
  newSire: state.getIn(["data", "newlitter", "sire", "dog"]),
  damMode: state.getIn(["data", "newlitter", "dam", "mode"]),
  dams: state.getIn(["data", "dogs", "list"]).filter(d => d.get("gender") === "B"),
  selectedDam: state.getIn(["data", "newlitter", "dam", "selected"]),
  newDam: state.getIn(["data", "newlitter", "dam", "dog"]),
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onSireModeChange: (mode) => dispatch(setNewLitterSireMode(mode)),
  onSireChange: (dog) => dispatch(setNewLitterSelectedSire(dog)),
  onNewSirePropChange: (prop, value) => dispatch(setNewLitterNewSireProp(prop, value)),
  onDamModeChange: (mode) => dispatch(setNewLitterDamMode(mode)),
  onDamChange: (dog) => dispatch(setNewLitterSelectedDam(dog)),
  onNewDamPropChange: (prop, value) => dispatch(setNewLitterNewDamProp(prop, value)),
  onDoSave: () => dispatch(doSaveNewLitter()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewLitterPage))
