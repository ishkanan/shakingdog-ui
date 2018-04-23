
import _ from "lodash"

import { saveNewDog, saveNewLitter } from "../api"
import { changeCanSave } from "../ui"
import { whichDog } from "../../util/data"
import { canSaveNewLitter } from "../../util/ui"


export const CHANGE_SIRE_MODE = "CHANGE_SIRE_MODE"
export const CHANGE_SELECTED_SIRE = "CHANGE_SELECTED_SIRE"
export const CHANGE_NEWSIRE_PROP = "CHANGE_NEWSIRE_PROP"
export const CHANGE_DAM_MODE = "CHANGE_DAM_MODE"
export const CHANGE_SELECTED_DAM = "CHANGE_SELECTED_DAM"
export const CHANGE_NEWDAM_PROP = "CHANGE_NEWDAM_PROP"

export const changeSireMode = (mode) => ({
  type: CHANGE_SIRE_MODE,
  mode
})

export const changeSelectedSire = (sireId) => ({
  type: CHANGE_SELECTED_SIRE,
  sireId
})

export const changeNewSireProp = (prop, value) => ({
  type: CHANGE_NEWSIRE_PROP,
  prop,
  value
})

export const changeDamMode = (mode) => ({
  type: CHANGE_DAM_MODE,
  mode
})

export const changeSelectedDam = (damId) => ({
  type: CHANGE_SELECTED_DAM,
  damId
})

export const changeNewDamProp = (prop, value) => ({
  type: CHANGE_NEWDAM_PROP,
  prop,
  value
})

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const doSaveNewLitter = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])
    const dogs = state.getIn(["data", "dogs", "list"])
    const newLitter = state.getIn(["data", "newlitter"])

    if (canSave) {
      dispatch(saveNewLitter(
        whichDog(dogs, newLitter.get("sire")).toJS(),
        whichDog(dogs, newLitter.get("dam")).toJS(),
        _.map(newLitter.get("children"), c => whichDog(dogs, c).toJS())
      ))
    }
  }
}

// helper for DRYer code (hah!)
const updateCanSave = (dispatch, state) => {
  const dogs = state.getIn(["data", "dogs", "list"])
  const newLitter = state.getIn(["data", "newlitter"])

  dispatch(changeCanSave(
    canSaveNewLitter(
      whichDog(dogs, newLitter.get("sire")),
      whichDog(dogs, newLitter.get("dam")),
      _.map(newLitter.get("children"), c => whichDog(dogs, c))
    )
  ))
}

export const setNewLitterSireMode = (mode) => {
  return (dispatch, getState) => {
    dispatch(changeSireMode(mode))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterSelectedSire = (sireId) => {
  return (dispatch, getState) => {
    dispatch(changeSelectedSire(sireId))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterNewSireProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch(changeNewSireProp(prop, value))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterDamMode = (mode) => {
  return (dispatch, getState) => {
    dispatch(changeDamMode(mode))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterSelectedDam = (damId) => {
  return (dispatch, getState) => {
    dispatch(changeSelectedDam(damId))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterNewDamProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch(changeNewDamProp(prop, value))
    updateCanSave(dispatch, getState())
  }
}
