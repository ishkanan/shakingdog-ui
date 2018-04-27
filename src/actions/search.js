
import { fetchDog, fetchFamily } from "./api"
import { canSearch } from "../util/ui"


export const CHANGE_CAN_SEARCH = "CHANGE_CAN_SEARCH"
export const CHANGE_SEARCH_MODE = "CHANGE_SEARCH_MODE"
export const CHANGE_SELECTED_DAM = "CHANGE_SELECTED_DAM"
export const CHANGE_SELECTED_SIRE = "CHANGE_SELECTED_SIRE"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const changeCanSearch = (value) => ({
  type: CHANGE_CAN_SEARCH,
  value
})

export const changeSearchMode = (mode) => {
  return (dispatch, getState) => {
    const state = getState()
    const dam = state.getIn(["ui", "search", "selectedDam"])
    const sire = state.getIn(["ui", "search", "selectedSire"])

    dispatch({
      type: CHANGE_SEARCH_MODE,
      mode
    })
    dispatch(changeCanSearch(
      canSearch(
        mode,
        dam,
        sire
      )
    ))
  }
}

export const changeSelectedDam = (damId) => ({
  type: CHANGE_SELECTED_DAM,
  damId
})

export const changeSelectedSire = (sireId) => ({
  type: CHANGE_SELECTED_SIRE,
  sireId
})

export const changeSelectedDog = (mode, role, dogId) => {
  return (dispatch, getState) => {
    dispatch(role === "sire" ? changeSelectedSire(dogId) : changeSelectedDam(dogId))

    const state = getState()
    const dam = state.getIn(["ui", "search", "selectedDam"])
    const sire = state.getIn(["ui", "search", "selectedSire"])

    dispatch(changeCanSearch(
      canSearch(
        mode,
        dam,
        sire
      )
    ))
  }
}

export const doSearch = () => {
  return (dispatch, getState) => {
    const state = getState()
    const mode = state.getIn(["ui", "search", "mode"])
    const dam = state.getIn(["ui", "search","selectedDam"])
    const sire = state.getIn(["ui", "search","selectedSire"])
    const canSearch = state.getIn(["ui", "search","canSearch"])
 
    if (canSearch && mode === "single") {
      dispatch(fetchDog(sire))
    } else if (canSearch && mode === "couple") {
      dispatch(fetchFamily(sire, dam))
    }
  }
}
