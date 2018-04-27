
import { saveNewDog } from "../api"
import { changeCanSave } from "../ui"
import { canSaveNewDog } from "../../util/ui"


export const CHANGE_NEWDOG_PROP = "CHANGE_NEWDOG_PROP"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const changeNewDogProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_PROP,
      prop,
      value
    })

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

export const doSaveNewDog = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])
    const dog = state.getIn(["data", "newdog", "dog"])

    if (canSave) {
      dispatch(saveNewDog(
        dog.get("name"),
        dog.get("gender"),
        dog.get("shakingdogstatus"),
        dog.get("cecsstatus")
      ))
    }
  }
}
