
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import {
  addNewLitterChild,
  doSaveNewLitter,
  removeNewChildLitter,
  setNewLitterChildMode,
  setNewLitterDamMode,
  setNewLitterNewChildProp,
  setNewLitterNewDamProp,
  setNewLitterNewSireProp,
  setNewLitterSelectedChild,
  setNewLitterSelectedDam,
  setNewLitterSelectedSire,
  setNewLitterSireMode
} from "../actions/admin/newlitter"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import MultiCaptionedFolder from "../components/MultiCaptionedFolder.jsx"
import SearchOrNewDog from "../components/SearchOrNewDog.jsx"
import { toJS } from "../data/util.jsx"


const NewLitterPage = ({dogs,
                        sireMode, sires, selectedSire, newSire,
                        damMode, dams, selectedDam, newDam,
                        children,
                        canSave, isSaving,
                        onSireModeChange, onSireChange, onNewSirePropChange,
                        onDamModeChange, onDamChange, onNewDamPropChange,
                        onChildModeChange, onChildChange, onNewChildPropChange,
                        onChildAdd, onChildRemove,
                        onDoSave}) => {
  return (
    <React.Fragment>
      <CaptionedFolder caption="Sire"
                       content={<SearchOrNewDog mode={sireMode}
                                                dogs={sires}
                                                selectedDog={selectedSire}
                                                newDog={newSire}
                                                allowedNewGenders={["D"]}
                                                onModeChange={onSireModeChange}
                                                onDogChange={onSireChange}
                                                onNewDogPropChange={onNewSirePropChange} />} />
      <CaptionedFolder caption="Dam"
                       content={<SearchOrNewDog mode={damMode}
                                                dogs={dams}
                                                selectedDog={selectedDam}
                                                newDog={newDam}
                                                allowedNewGenders={["B"]}
                                                onModeChange={onDamModeChange}
                                                onDogChange={onDamChange}
                                                onNewDogPropChange={onNewDamPropChange} />} />
      <MultiCaptionedFolder elements={_.map(children, (c, i) =>
                                        <SearchOrNewDog mode={c.mode}
                                                        dogs={dogs}
                                                        selectedDog={c.selected}
                                                        newDog={c.dog}
                                                        allowedNewGenders={["D", "B", "U"]}
                                                        onModeChange={(mode) => onChildModeChange(i, mode)}
                                                        onDogChange={(dog) => onChildChange(i, dog)}
                                                        onNewDogPropChange={(prop, value) => onNewChildPropChange(i, prop, value)} />
                                     )}
                            captionPrefix="Child"
                            allowAddRemove={true}
                            onAddElement={onChildAdd}
                            onRemoveElement={onChildRemove} />
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
  sireMode: state.getIn(["data", "newlitter", "sire", "mode"]),
  sires: state.getIn(["data", "dogs", "list"]).filter(d => d.get("gender") === "D"),
  selectedSire: state.getIn(["data", "newlitter", "sire", "selected"]),
  newSire: state.getIn(["data", "newlitter", "sire", "dog"]),
  damMode: state.getIn(["data", "newlitter", "dam", "mode"]),
  dams: state.getIn(["data", "dogs", "list"]).filter(d => d.get("gender") === "B"),
  selectedDam: state.getIn(["data", "newlitter", "dam", "selected"]),
  newDam: state.getIn(["data", "newlitter", "dam", "dog"]),
  children: state.getIn(["data", "newlitter", "children"]),
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
  onChildModeChange: (index, mode) => dispatch(setNewLitterChildMode(index, mode)),
  onChildChange: (index, dog) => dispatch(setNewLitterSelectedChild(index, dog)),
  onNewChildPropChange: (index, prop, value) => dispatch(setNewLitterNewChildProp(index, prop, value)),
  onChildAdd: () => dispatch(addNewLitterChild()),
  onChildRemove: (index) => dispatch(removeNewChildLitter(index)),
  onDoSave: () => dispatch(doSaveNewLitter()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewLitterPage))
