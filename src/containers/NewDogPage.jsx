
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import {
  changeNewDogGender,
  changeNewDogName,
  changeNewDogShakingDogStatus
} from "../actions/admin"
import CaptionedFolder from "../components/CaptionedFolder.jsx"
import NewDogForm from "../components/NewDogForm.jsx"
import { toJS } from "../data/util.jsx"


const NewDogPage = ({newDog, onNameChange, onGenderChange, onShakingDogStatusChange}) => {
  return (
    <CaptionedFolder caption="New Dog Details"
                     content={<NewDogForm name={newDog.name}
                                          gender={newDog.gender}
                                          shakingDogStatus={newDog.shakingdogstatus}
                                          cecsStatus={newDog.cecsstatus}
                                          onNameChange={onNameChange}
                                          onGenderChange={onGenderChange}
                                          onShakingDogStatusChange={onShakingDogStatusChange}
                                          onCecsStatusChange={(status) => { }} />} />
  )
}

const mapStateToProps = (state) => ({
  newDog: state.getIn(["data", "newdog", "dog"])
})

const mapDispatchToProps = ({
  onNameChange: changeNewDogName,
  onGenderChange: changeNewDogGender,
  onShakingDogStatusChange: changeNewDogShakingDogStatus
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NewDogPage))
