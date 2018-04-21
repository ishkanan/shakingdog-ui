
import {
  SAVE_NEWDOG_BEGIN,
  SAVE_NEWDOG_SUCCESS,
  SAVE_NEWDOG_FAILURE
} from "../actions/api"
import {
  CHANGE_ADMIN_MODE,
  CHANGE_CAN_SAVE,
  CHANGE_CAN_SEARCH,
  CHANGE_SEARCH_MODE,
  CHANGE_SELECTED_DAM,
  CHANGE_SELECTED_SIRE,
  CHANGE_SELECTED_TAB
} from "../actions/ui"


const ui = (state, action) => {
  switch (action.type) {

    case CHANGE_ADMIN_MODE:
      // refuse changing modes and resetting flags if we are saving
      return (state
        .set("adminMode", state.get("isSaving") ? state.get("adminMode") : action.mode)
        .set("canSave", state.get("isSaving"))
        .set("error", state.get("isSaving") ? state.get("error") : null)
      )

    case CHANGE_CAN_SAVE:
      return state.set("canSave", action.value)

    case CHANGE_CAN_SEARCH:
      return state.set("canSearch", action.value)

    case CHANGE_SEARCH_MODE:
      return (state
        .set("searchMode", action.mode)
        .set("selectedDam", null)
        .set("selectedSire", null)
      )

    case CHANGE_SELECTED_DAM:
      return state.set("selectedDam", action.damId)

    case CHANGE_SELECTED_SIRE:
      return state.set("selectedSire", action.sireId)

    case CHANGE_SELECTED_TAB:
      return (state
        .set("error", null)
        .set("selectedTab", action.tab)
      )

    case SAVE_NEWDOG_BEGIN:
      return (state
        .set("canSave", false)
        .set("isSaving", true)
      )

    case SAVE_NEWDOG_SUCCESS:
    case SAVE_NEWDOG_FAILURE:
      return (state
        .set("canSave", true)
        .set("isSaving", false)
      )

    default:
      return state
  }
}

export default ui
