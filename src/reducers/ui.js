
import { fromJS, Map } from "immutable"
import _ from "lodash"

import {
  FETCH_DOG_BEGIN,
  FETCH_DOG_FAILURE,
  FETCH_DOGS_BEGIN,
  FETCH_DOGS_FAILURE,
  FETCH_FAMILY_BEGIN,
  FETCH_FAMILY_FAILURE,
  FETCH_RELATIONSHIPS_BEGIN,
  FETCH_RELATIONSHIPS_FAILURE,
  SAVE_NEWDOG_BEGIN,
  SAVE_NEWDOG_SUCCESS,
  SAVE_NEWDOG_FAILURE,
  SAVE_NEWLITTER_BEGIN,
  SAVE_NEWLITTER_SUCCESS,
  SAVE_NEWLITTER_FAILURE,
  SAVE_SETGENDER_BEGIN,
  SAVE_SETGENDER_SUCCESS,
  SAVE_SETGENDER_FAILURE,
  SAVE_TESTRESULT_BEGIN,
  SAVE_TESTRESULT_SUCCESS,
  SAVE_TESTRESULT_FAILURE
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
  CHANGE_SELECTED_TAB_SUCCESS,
  CHANGE_VIEW_PAGENUMBER,
  DISMISS_ADMIN_NOTIFICATION,
  DISMISS_FETCH_NOTIFICATION
} from "../actions/ui"
import initialState from "../init.data"


const ui = (state, action) => {
  switch (action.type) {

    case CHANGE_ADMIN_MODE:
      // deny changing modes and resetting flags if we are saving
      return (state
        .set("adminMode", state.get("isSaving") ? state.get("adminMode") : action.mode)
        .set("canSave", state.get("isSaving"))
        .setIn(
          ["notification", "admin"],
          state.get("isSaving") ?
            state.getIn(["notification", "admin"]) :
            fromJS(initialState.ui.notification.admin)
      ))

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

    case CHANGE_SELECTED_TAB_SUCCESS:
      return (state
        .setIn(["notification", "admin"], fromJS(initialState.ui.notification.admin))
        .set("selectedTab", action.tab)
      )

    case CHANGE_VIEW_PAGENUMBER:
      return state.setIn(["view", "pageNumber"], action.page)
  
    case DISMISS_ADMIN_NOTIFICATION:
      return state.setIn(
        ["notification", "admin", action.section],
        fromJS(initialState.ui.notification.admin[action.section])
      )

    case DISMISS_FETCH_NOTIFICATION:
      return state.setIn(["notification", "fetch"], null)

    case FETCH_DOG_BEGIN:
    case FETCH_DOGS_BEGIN:
    case FETCH_FAMILY_BEGIN:
    case FETCH_RELATIONSHIPS_BEGIN:
      return state.setIn(["notification", "fetch"], null)

    case FETCH_DOG_FAILURE:
    case FETCH_DOGS_FAILURE:
    case FETCH_FAMILY_FAILURE:
    case FETCH_RELATIONSHIPS_FAILURE:
      return state.setIn(["notification", "fetch"], Map({
        type: "failure",
        code: action.error.code,
        message: action.error.message
      }))

    case SAVE_NEWDOG_BEGIN:
    case SAVE_NEWLITTER_BEGIN:
    case SAVE_SETGENDER_BEGIN:
    case SAVE_TESTRESULT_BEGIN:
      return (state
        .set("canSave", false)
        .set("isSaving", true)
        .setIn(
          ["notification", "admin", "save"],
          fromJS(initialState.ui.notification.admin.save)
      ))

    case SAVE_NEWDOG_FAILURE:
    case SAVE_NEWLITTER_FAILURE:
    case SAVE_SETGENDER_FAILURE:
    case SAVE_TESTRESULT_FAILURE:
      return (state
        .set("canSave", true)
        .set("isSaving", false)
        .setIn(["notification", "admin", "save"], Map({
          type: "failure",
          code: action.error.code,
          message: action.error.message
        }))
      )

    case SAVE_NEWDOG_SUCCESS:
      return (state
        .set("canSave", false)
        .set("isSaving", false)
        .setIn(["notification", "admin", "save"], Map({
          type: "success",
          code: null,
          message: "Successfully saved new dog!"
        }))
      )

    case SAVE_NEWLITTER_SUCCESS:
      return (state
        .set("canSave", false)
        .set("isSaving", false)
        .setIn(["notification", "admin", "save"], Map({
          type: "success",
          code: null,
          message: "Successfully saved new litter!"
        }))
      )

    case SAVE_SETGENDER_SUCCESS:
      return (state
        .set("canSave", false)
        .set("isSaving", false)
        .setIn(["notification", "admin", "save"], Map({
          type: "success",
          code: null,
          message: "Successfully updated gender!"
        }))
      )

    case SAVE_TESTRESULT_SUCCESS:
      return (state
        .set("canSave", false)
        .set("isSaving", false)
        .setIn(["notification", "admin", "save"], Map({
          type: "success",
          code: null,
          message: "Successfully saved test result!"
        }))
      )

    default:
      return state
  }
}

export default ui
