
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import {
  changeNewDogGender,
  changeNewDogShakingDogStatus,
  changeNewDogCecsStatus,
  doSaveNewDog,
  setNewDogName
} from "../actions/admin/newdog"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import NewDogForm from "../components/NewDogForm.jsx"
import { toJS } from "../data/util.jsx"


const NewDogPage = ({dog, canSave, isSaving, onNameChange, onGenderChange, onShakingDogStatusChange, onCecsStatusChange, onDoSave}) => {
  return (
    <React.Fragment>
      <CaptionedFolder caption="New Dog Details"
                       content={<NewDogForm name={dog.name}
                                            gender={dog.gender}
                                            shakingDogStatus={dog.shakingdogstatus}
                                            cecsStatus={dog.cecsstatus}
                                            onNameChange={onNameChange}
                                            onGenderChange={onGenderChange}
                                            onShakingDogStatusChange={onShakingDogStatusChange}
                                            onCecsStatusChange={onCecsStatusChange} />} />
      <Button caption="Save"
              className={"is-primary is-rounded" + (isSaving ? " is-loading" : "")}
              disabled={!canSave}
              onClick={() => onDoSave()} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  dog: state.getIn(["data", "newdog", "dog"]),
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onNameChange: (name) => dispatch(setNewDogName(name)),
  onGenderChange: (gender) => dispatch(changeNewDogGender(gender)),
  onShakingDogStatusChange: (status) => dispatch(changeNewDogShakingDogStatus(status)),
  onCecsStatusChange: (status) => dispatch(changeNewDogCecsStatus(status)),
  onDoSave: () => dispatch(doSaveNewDog())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewDogPage))
