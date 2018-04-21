
import {
  changeCanSave
} from "./ui"
import { canSaveNewDog } from "../util/ui"


export const CHANGE_NEWDOG_GENDER = "CHANGE_NEWDOG_GENDER"
export const CHANGE_NEWDOG_NAME = "CHANGE_NEWDOG_NAME"
export const CHANGE_NEWDOG_SHAKINGDOGSTATUS = "CHANGE_NEWDOG_SHAKINGDOGSTATUS"
export const CHANGE_NEWDOG_CECSSTATUS = "CHANGE_NEWDOG_CECSSTATUS"

export const changeNewDogName = name => ({
  type: CHANGE_NEWDOG_NAME,
  name
})

export const changeNewDogGender = gender => ({
  type: CHANGE_NEWDOG_GENDER,
  gender
})

export const changeNewDogShakingDogStatus = status => ({
  type: CHANGE_NEWDOG_SHAKINGDOGSTATUS,
  status
})

export const changeNewDogCecsStatus = status => ({
  type: CHANGE_NEWDOG_CECSSTATUS,
  status
})

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const setNewDogName = (name) => {
  return (dispatch, getState) => {
    dispatch(changeNewDogName(name))

    const state = getState()
    const dog = state.getIn(["data", "newdog", "dog"])

    dispatch(changeCanSave(
      canSaveNewDog(
        dog.get("name"),
        dog.get("gender"),
        dog.get("shakingdogstatus"),
        dog.get("cecsstatus")
      )
    ))
  }
}
