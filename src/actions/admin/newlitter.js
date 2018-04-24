
import _ from "lodash"

import { saveNewDog, saveNewLitter } from "../api"
import { changeCanSave } from "../ui"
import { whichDog } from "../../util/data"
import { canSaveNewLitter } from "../../util/ui"


export const CHANGE_NEWLITTER_SIRE_MODE = "CHANGE_NEWLITTER_SIRE_MODE"
export const CHANGE_NEWLITTER_SELECTED_SIRE = "CHANGE_NEWLITTER_SELECTED_SIRE"
export const CHANGE_NEWLITTER_NEWSIRE_PROP = "CHANGE_NEWLITTER_NEWSIRE_PROP"
export const CHANGE_NEWLITTER_DAM_MODE = "CHANGE_NEWLITTER_DAM_MODE"
export const CHANGE_NEWLITTER_SELECTED_DAM = "CHANGE_NEWLITTER_SELECTED_DAM"
export const CHANGE_NEWLITTER_NEWDAM_PROP = "CHANGE_NEWLITTER_NEWDAM_PROP"
export const CHANGE_NEWLITTER_CHILD_MODE = "CHANGE_NEWLITTER_CHILD_MODE"
export const CHANGE_NEWLITTER_SELECTED_CHILD = "CHANGE_NEWLITTER_SELECTED_CHILD"
export const CHANGE_NEWLITTER_NEWCHILD_PROP = "CHANGE_NEWLITTER_NEWCHILD_PROP"
export const ADD_CHILD_TO_NEWLITTER = "ADD_CHILD_TO_NEWLITTER"
export const REMOVE_CHILD_FROM_NEWLITTER = "REMOVE_CHILD_FROM_NEWLITTER"

const changeNewLitterSireMode = (mode) => ({
  type: CHANGE_NEWLITTER_SIRE_MODE,
  mode
})

const changeNewLitterSelectedSire = (sireId) => ({
  type: CHANGE_NEWLITTER_SELECTED_SIRE,
  sireId
})

const changeNewLitterNewSireProp = (prop, value) => ({
  type: CHANGE_NEWLITTER_NEWSIRE_PROP,
  prop,
  value
})

const changeNewLitterDamMode = (mode) => ({
  type: CHANGE_NEWLITTER_DAM_MODE,
  mode
})

const changeNewLitterSelectedDam = (damId) => ({
  type: CHANGE_NEWLITTER_SELECTED_DAM,
  damId
})

const changeNewLitterNewDamProp = (prop, value) => ({
  type: CHANGE_NEWLITTER_NEWDAM_PROP,
  prop,
  value
})

const changeNewLitterChildMode = (index, mode) => ({
  type: CHANGE_NEWLITTER_CHILD_MODE,
  index,
  mode
})

const changeNewLitterSelectedChild = (index, childId) => ({
  type: CHANGE_NEWLITTER_SELECTED_CHILD,
  index,
  childId
})

const changeNewLitterNewChildProp = (index, prop, value) => ({
  type: CHANGE_NEWLITTER_NEWCHILD_PROP,
  index,
  prop,
  value
})

const addChildToNewLitter = () => ({
  type: ADD_CHILD_TO_NEWLITTER
})

const removeChildFromNewLitter = (index) => ({
  type: REMOVE_CHILD_FROM_NEWLITTER,
  index
})

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

// helper for DRYer code
const updateCanSave = (dispatch, state) => {
  const dogs = state.getIn(["data", "dogs", "list"])
  const newLitter = state.getIn(["data", "newlitter"])

  dispatch(changeCanSave(
    canSaveNewLitter(
      whichDog(dogs, newLitter.get("sire")),
      whichDog(dogs, newLitter.get("dam")),
      newLitter.get("children").map(c => whichDog(dogs, c))
    )
  ))
}

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
        newLitter.get("children").map(c => whichDog(dogs, c).toJS())
      ))
    }
  }
}

export const setNewLitterSireMode = (mode) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterSireMode(mode))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterSelectedSire = (sireId) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterSelectedSire(sireId))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterNewSireProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterNewSireProp(prop, value))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterDamMode = (mode) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterDamMode(mode))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterSelectedDam = (damId) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterSelectedDam(damId))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterNewDamProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterNewDamProp(prop, value))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterChildMode = (index, mode) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterChildMode(index, mode))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterSelectedChild = (index, childId) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterSelectedChild(index, childId))
    updateCanSave(dispatch, getState())
  }
}

export const setNewLitterNewChildProp = (index, prop, value) => {
  return (dispatch, getState) => {
    dispatch(changeNewLitterNewChildProp(index, prop, value))
    updateCanSave(dispatch, getState())
  }
}

export const addNewLitterChild = () => {
  return (dispatch, getState) => {
    dispatch(addChildToNewLitter())
    updateCanSave(dispatch, getState())
  }
}

export const removeNewChildLitter = (index) => {
  return (dispatch, getState) => {
    dispatch(removeChildFromNewLitter(index))
    updateCanSave(dispatch, getState())
  }
}
