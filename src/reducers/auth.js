
import { Map } from "immutable"

import {
  FETCH_AUDITLOG_FAILURE,
  SAVE_NEWDOG_FAILURE,
  SAVE_NEWLITTER_FAILURE,
  SAVE_SETGENDER_FAILURE,
  SAVE_TESTRESULT_FAILURE
} from "../actions/api"
import { CHANGE_SELECTED_TAB_FAILURE } from "../actions/ui"


const auth = (state, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_TAB_FAILURE:
    case FETCH_AUDITLOG_FAILURE:
    case SAVE_NEWDOG_FAILURE:
    case SAVE_NEWLITTER_FAILURE:
    case SAVE_SETGENDER_FAILURE:
    case SAVE_TESTRESULT_FAILURE:
      return state.set("redirect", Map({
        initiate: action.auth.redirect.initiate,
        message: (action.auth.redirect.initiate ? "Authenticating user..." : null),
        url: action.auth.redirect.url
      }))
    default:
      return state
  }
}

export default auth
