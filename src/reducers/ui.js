
import { Map } from "immutable"
import _ from "lodash"

import {
  SAVE_NEWDOG_BEGIN,
  SAVE_NEWDOG_SUCCESS,
  SAVE_NEWDOG_FAILURE
} from "../actions/api"
import {
  CHANGE_CAN_SEARCH,
  CHANGE_SEARCH_MODE,
  CHANGE_SELECTED_DAM,
  CHANGE_SELECTED_SIRE
} from "../actions/search"
import {
  CHANGE_ADMIN_MODE,
  CHANGE_CAN_SAVE,
  CHANGE_SELECTED_TAB,
  CHANGE_VIEW_PAGENUMBER,
  DISMISS_ADMIN_NOTIFICATION
} from "../actions/ui"


const ui = (state, action) => {
  switch (action.type) {

    case CHANGE_ADMIN_MODE:
      // refuse changing modes and resetting flags if we are saving
      return (state
        .set("adminMode", state.get("isSaving") ? state.get("adminMode") : action.mode)
        .set("canSave", state.get("isSaving"))
        .setIn(["notification", "admin"], state.get("isSaving") ? state.getIn(["notification", "admin"]) : null)
      )

    case CHANGE_CAN_SAVE:
      return state.set("canSave", action.value)

    case CHANGE_CAN_SEARCH:
      return state.setIn(["search", "canSearch"], action.value)

    case CHANGE_SEARCH_MODE:
      return (state
        .setIn(["search", "mode"], action.mode)
        .setIn(["search", "selectedDam"], null)
        .setIn(["search", "selectedSire"], null)
      )

    case CHANGE_SELECTED_DAM:
      return state.setIn(["search", "selectedDam"], action.damId)

    case CHANGE_SELECTED_SIRE:
      return state.setIn(["search", "selectedSire"], action.sireId)

    case CHANGE_SELECTED_TAB:
      return (state
        .setIn(["notification", "admin"], null)
        .set("selectedTab", action.tab)
      )

    case CHANGE_VIEW_PAGENUMBER:
      return state.setIn(["view", "pageNumber"], action.page)
  
    case DISMISS_ADMIN_NOTIFICATION:
      return state.setIn(["notification", "admin"], null)

    case SAVE_NEWDOG_BEGIN:
      return (state
        .set("canSave", false)
        .set("isSaving", true)
        .setIn(["notification", "admin"], null)
      )

    case SAVE_NEWDOG_SUCCESS:
      return (state
        .set("canSave", true)
        .set("isSaving", false)
        .setIn(["notification", "admin"], Map({
          type: "success",
          code: null,
          message: "Successfully saved new dog!"
        }))
      )

    case SAVE_NEWDOG_FAILURE:
      return (state
        .set("canSave", true)
        .set("isSaving", false)
        .setIn(["notification", "admin"], Map({
          type: "failure",
          code: action.error.code,
          message: action.error.message
        }))
      )

    default:
      return state
  }
}

export default ui
