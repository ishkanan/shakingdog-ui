
import { saveSetGender } from "../api"
import { changeCanSave } from "../ui"
import { canSaveSetGender } from "../../util/ui"


export const CHANGE_SETGENDER_GENDER = "CHANGE_SETGENDER_GENDER"
export const CHANGE_SETGENDER_SELECTED = "CHANGE_SETGENDER_SELECTED"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const changeSetGenderGender = (gender) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_SETGENDER_GENDER,
      gender
    })

    const state = getState()

    dispatch(changeCanSave(
      canSaveSetGender(
        state.getIn(["data", "setgender", "selected"]),
        state.getIn(["data", "setgender", "gender"])
      )
    ))
  }
}

export const changeSetGenderSelected = (dogId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_SETGENDER_SELECTED,
      dogId
    })

    const state = getState()

    dispatch(changeCanSave(
      canSaveSetGender(
        state.getIn(["data", "setgender", "selected"]),
        state.getIn(["data", "setgender", "gender"])
      )
    ))
  }
}

export const doSaveSetGender = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])

    if (canSave) {
      dispatch(saveSetGender(
        state.getIn(["data", "setgender", "selected"]),
        state.getIn(["data", "setgender", "gender"])
      ))
    }
  }
}
