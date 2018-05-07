
import _ from "lodash"

import { saveTestResult } from "../api"
import { changeCanSave } from "../ui"
import { whichDog, whichTestResultDog } from "../../util/data"
import { canSaveTestResult } from "../../util/ui"


export const CHANGE_TESTRESULT_DOG_RESULT = "CHANGE_TESTRESULT_DOG_RESULT"
export const CHANGE_TESTRESULT_DOG_MODE = "CHANGE_TESTRESULT_DOG_MODE"
export const CHANGE_TESTRESULT_SELECTED_DOG = "CHANGE_TESTRESULT_SELECTED_DOG"
export const CHANGE_TESTRESULT_NEWDOG_PROP = "CHANGE_TESTRESULT_NEWDOG_PROP"
export const CHANGE_TESTRESULT_EDIT_SIRE = "CHANGE_TESTRESULT_EDIT_SIRE"
export const CHANGE_TESTRESULT_SIRE_MODE = "CHANGE_TESTRESULT_SIRE_MODE"
export const CHANGE_TESTRESULT_SELECTED_SIRE = "CHANGE_TESTRESULT_SELECTED_SIRE"
export const CHANGE_TESTRESULT_NEWSIRE_PROP = "CHANGE_TESTRESULT_NEWSIRE_PROP"
export const CHANGE_TESTRESULT_EDIT_DAM = "CHANGE_TESTRESULT_EDIT_DAM"
export const CHANGE_TESTRESULT_DAM_MODE = "CHANGE_TESTRESULT_DAM_MODE"
export const CHANGE_TESTRESULT_SELECTED_DAM = "CHANGE_TESTRESULT_SELECTED_DAM"
export const CHANGE_TESTRESULT_NEWDAM_PROP = "CHANGE_TESTRESULT_NEWDAM_PROP"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

// helper for DRYer code
const updateCanSave = (dispatch, state) => {
  const dogs = state.getIn(["data", "dogs", "list"])
  const testResult = state.getIn(["data", "testresult"])
  const dog = testResult.get("dog")
  const sire = testResult.get("sire")
  const dam = testResult.get("dam")
  
  dispatch(changeCanSave(
    canSaveTestResult(
      dog.get("mode") === "search" ? dog.getIn(["selected", "shakingdogstatus"]) : dog.getIn(["dog", "shakingdogstatus"]),
      whichTestResultDog(dog),
      sire.get("edit"),
      (sire.get("edit") ? whichDog(dogs, sire) : null),
      dam.get("edit"),
      (dam.get("edit") ? whichDog(dogs, dam) : null)
    )
  ))
}

export const changeTestResultDogResult = (ailment, result) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_DOG_RESULT,
      ailment,
      result
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultDogMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_DOG_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultSelectedDog = (dogId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_SELECTED_DOG,
      dogId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultNewDogProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_NEWDOG_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultEditSire = (edit) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_EDIT_SIRE,
      edit
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultSireMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_SIRE_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultSelectedSire = (sireId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_SELECTED_SIRE,
      sireId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultNewSireProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_NEWSIRE_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultEditDam = (edit) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_EDIT_DAM,
      edit
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultDamMode = (mode) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_DAM_MODE,
      mode
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultSelectedDam = (damId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_SELECTED_DAM,
      damId
    })
    updateCanSave(dispatch, getState())
  }
}

export const changeTestResultNewDamProp = (prop, value) => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_TESTRESULT_NEWDAM_PROP,
      prop,
      value
    })
    updateCanSave(dispatch, getState())
  }
}

export const doSaveTestResult = () => {
  return (dispatch, getState) => {
    const state = getState()
    const canSave = state.getIn(["ui", "canSave"])
    const dogs = state.getIn(["data", "dogs", "list"])
    const testResult = state.getIn(["data", "testresult"])
    const sire = testResult.get("sire")
    const dam = testResult.get("dam")

    if (canSave) {
      dispatch(saveTestResult(
        whichTestResultDog(testResult.get("dog")).toJS(),
        (sire.get("edit") ? whichDog(dogs, sire).toJS() : null),
        (dam.get("edit") ? whichDog(dogs, dam).toJS() : null)
      ))
    }
  }
}
