
import { fetchDog, fetchFamily } from "./api"
import {
  changeCanSearch,
  changeSearchMode,
  changeSelectedDam,
  changeSelectedSire
} from "./ui"
import { canSearch } from "../util/ui"

// Can create composite action creators that have access to the state tree
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method

export const doSearch = () => {
  return (dispatch, getState) => {
    const state = getState()
    const mode = state.getIn(["ui", "searchMode"])
    const dam = state.getIn(["ui", "selectedDam"])
    const sire = state.getIn(["ui", "selectedSire"])
    const canSearch = state.getIn(["ui", "canSearch"])

    if (canSearch && mode === "single") {
      dispatch(fetchDog(sire))
    } else if (canSearch && mode === "couple") {
      dispatch(fetchFamily(sire, dam))
    }
  }
}

export const setSearchMode = (mode) => {
  return (dispatch, getState) => {
    const state = getState()
    const dam = state.getIn(["ui", "selectedDam"])
    const sire = state.getIn(["ui", "selectedSire"])

    dispatch(changeSearchMode(mode))
    dispatch(changeCanSearch(
      canSearch(
        mode,
        dam,
        sire
      )
    ))
  }
}

export const setSelectedDog = (mode, role, dogId) => {
  return (dispatch, getState) => {
    dispatch(role === "sire" ? changeSelectedSire(dogId) : changeSelectedDam(dogId))

    const state = getState()
    const dam = state.getIn(["ui", "selectedDam"])
    const sire = state.getIn(["ui", "selectedSire"])

    dispatch(changeCanSearch(
      canSearch(
        mode,
        dam,
        sire
      )
    ))
  }
}
