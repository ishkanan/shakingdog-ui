
import { saveUpdateDog } from "../api"
import { changeCanSave } from "../ui"
import { canSaveUpdateDog } from "../../util/ui"


export const CHANGE_UPDATEDOG_GENDER = "CHANGE_UPDATEDOG_GENDER"
export const CHANGE_UPDATEDOG_NAME = "CHANGE_UPDATEDOG_NAME"
export const CHANGE_UPDATEDOG_SELECTED = "CHANGE_UPDATEDOG_SELECTED"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const changeUpdateDogGender = (gender) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_UPDATEDOG_GENDER,
      gender
    })

    const state = getState()

    dispatch(changeCanSave(
      canSaveUpdateDog(
        state.getIn(["data", "updatedog", "selected"]),
        state.getIn(["data", "updatedog", "name"]),
        state.getIn(["data", "updatedog", "gender"])
      )
    ))
  }
}

export const changeUpdateDogName = (name) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_UPDATEDOG_NAME,
      name
    })

    const state = getState()

    dispatch(changeCanSave(
      canSaveUpdateDog(
        state.getIn(["data", "updatedog", "selected"]),
        state.getIn(["data", "updatedog", "name"]),
        state.getIn(["data", "updatedog", "gender"])
      )
    ))
  }
}

export const changeUpdateDogSelected = (dogId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_UPDATEDOG_SELECTED,
      dogId
    })

    const state = getState()

    dispatch(changeCanSave(
      canSaveUpdateDog(
        state.getIn(["data", "updatedog", "selected"]),
        state.getIn(["data", "updatedog", "name"]),
        state.getIn(["data", "updatedog", "gender"])
      )
    ))
  }
}

export const doSaveUpdateDog = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])

    if (canSave) {
      dispatch(saveUpdateDog(
        state.getIn(["data", "updatedog", "selected"]),
        state.getIn(["data", "updatedog", "name"]),
        state.getIn(["data", "updatedog", "gender"])
      ))
    }
  }
}
