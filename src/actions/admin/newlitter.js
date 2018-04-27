
import _ from "lodash"

import { saveNewLitter } from "../api"
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

export const changeNewLitterSireMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_SIRE_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterSelectedSire = (sireId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_SELECTED_SIRE,
      sireId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterNewSireProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_NEWSIRE_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterDamMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_DAM_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterSelectedDam = (damId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_SELECTED_DAM,
      damId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterNewDamProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_NEWDAM_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterChildMode = (index, mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_CHILD_MODE,
      index,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterSelectedChild = (index, childId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_SELECTED_CHILD,
      index,
      childId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeNewLitterNewChildProp = (index, prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_NEWLITTER_NEWCHILD_PROP,
      index,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const addChildToNewLitter = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CHILD_TO_NEWLITTER
    })
    updateCanSave(dispatch, getState())
  }
}

export const removeChildFromNewLitter = (index) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_CHILD_FROM_NEWLITTER,
      index
    })
    updateCanSave(dispatch, getState())
  }
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
