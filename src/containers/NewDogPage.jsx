
import { fromJS } from "immutable"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import {
  doSaveNewDog,
  changeNewDogProp
} from "../actions/admin/newdog"
import Button from "../components/Button.jsx"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import NewDogForm from "../components/NewDogForm.jsx"
import { toJS } from "../data/util.jsx"


const NewDogPage = ({dog, allowedGenders, canSave, isSaving, onDogPropChange, onDoSave}) => {
  return (
    <React.Fragment>
      <CaptionedFolder caption="New Dog Details"
                       content={<NewDogForm name={dog.name}
                                            gender={dog.gender}
                                            allowedGenders={allowedGenders}
                                            slemStatus={dog.shakingdogstatus}
                                            allowedSlemStatuses={["Affected", "Carrier", "Clear", "Unknown"]}
                                            cecsStatus={dog.cecsstatus}
                                            onDogPropChange={onDogPropChange} />} />
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
  canSave: state.getIn(["ui", "canSave"]),
  isSaving: state.getIn(["ui", "isSaving"])
})

const mapDispatchToProps = (dispatch) => ({
  onDogPropChange: (prop, value) => dispatch(changeNewDogProp(prop, value)),
  onDoSave: () => dispatch(doSaveNewDog())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewDogPage))
