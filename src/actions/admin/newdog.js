
import { saveNewDog } from "../api"
import { changeCanSave } from "../ui"
import { whichDog } from "../../util/data"
import { canSaveNewDog } from "../../util/ui"


export const CHANGE_NEWDOG_PROP = "CHANGE_NEWDOG_PROP"
export const CHANGE_NEWDOG_SET_PARENTS = "CHANGE_NEWDOG_SET_PARENTS"
export const CHANGE_NEWDOG_SIRE_MODE = "CHANGE_NEWDOG_SIRE_MODE"
export const CHANGE_NEWDOG_SELECTED_SIRE = "CHANGE_NEWDOG_SELECTED_SIRE"
export const CHANGE_NEWDOG_NEWSIRE_PROP = "CHANGE_NEWDOG_NEWSIRE_PROP"
export const CHANGE_NEWDOG_DAM_MODE = "CHANGE_NEWDOG_DAM_MODE"
export const CHANGE_NEWDOG_SELECTED_DAM = "CHANGE_NEWDOG_SELECTED_DAM"
export const CHANGE_NEWDOG_NEWDAM_PROP = "CHANGE_NEWDOG_NEWDAM_PROP"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

// helper for DRYer code
const updateCanSave = (dispatch, state) => {
  const dogs = state.getIn(["data", "dogs", "list"])
  const newDog = state.getIn(["data", "newdog"])
  const dog = newDog.get("dog")
  const sire = newDog.get("sire")
  const dam = newDog.get("dam")
  
  dispatch(changeCanSave(
    canSaveNewDog(
      dog,
      newDog.get("setParents"),
      (newDog.get("setParents") ? whichDog(dogs, sire) : null),
      (newDog.get("setParents") ? whichDog(dogs, dam) : null)
    )
  ))
}

export const changeNewDogProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogSetParents = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_SET_PARENTS,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogSireMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_SIRE_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogSelectedSire = (sireId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_SELECTED_SIRE,
      sireId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogNewSireProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_NEWSIRE_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogDamMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_DAM_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogSelectedDam = (damId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_SELECTED_DAM,
      damId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewDogNewDamProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWDOG_NEWDAM_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const doSaveNewDog = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])
    const dogs = state.getIn(["data", "dogs", "list"])
    const newDog = state.getIn(["data", "newdog"])
    const sire = newDog.get("sire")
    const dam = newDog.get("dam")

    if (canSave) {
      dispatch(saveNewDog(
        newDog.get("dog"),
        (newDog.get("setParents") ? whichDog(dogs, sire).toJS() : null),
        (newDog.get("setParents") ? whichDog(dogs, dam).toJS() : null)
      ))
    }
  }
}
