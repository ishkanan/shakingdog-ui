
import {
  CHANGE_ADMIN_MODE,
  CHANGE_SEARCH_MODE,
  CHANGE_SELECTED_DAM,
  CHANGE_SELECTED_SIRE,
  CHANGE_SELECTED_TAB
} from "../actions/ui"


const ui = (state, action) => {
  switch (action.type) {
    case CHANGE_ADMIN_MODE:
      return (state
        .setIn(["adminMode"], action.mode)
        .setIn(["error"], null)
      )
    case CHANGE_SEARCH_MODE:
      return (state
        .setIn(["searchMode"], action.mode)
        .setIn(["selectedDam"], null)
        .setIn(["selectedSire"], null)
      )
    case CHANGE_SELECTED_DAM:
      return state.setIn(["selectedDam"], action.damId)
    case CHANGE_SELECTED_SIRE:
      return state.setIn(["selectedSire"], action.sireId)
    case CHANGE_SELECTED_TAB:
      return (state
        .setIn(["error"], null)
        .setIn(["selectedTab"], action.tab)
      )
    default:
      return state
  }
}

export default ui
