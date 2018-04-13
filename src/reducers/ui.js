
import { CHANGE_SELECTED_TAB } from "../actions/app"
import { CHANGE_SEARCH_MODE } from "../actions/search"
import { CHANGE_SELECTED_SIRE, CHANGE_SELECTED_DAM } from "../actions/ui"


const ui = (state, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_MODE:
      return (state
        .setIn(["selectedDam"], null)
        .setIn(["selectedSire"], null)
      )
    case CHANGE_SELECTED_DAM:
      return state.setIn(["selectedDam"], action.damId)
    case CHANGE_SELECTED_SIRE:
      return state.setIn(["selectedSire"], action.sireId)
    case CHANGE_SELECTED_TAB:
      return state.setIn(["selectedTab"], action.tabId)
    default:
      return state
  }
}

export default ui
