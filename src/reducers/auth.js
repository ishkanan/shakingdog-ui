
import { Map } from "immutable"

import {
  FETCH_DOGS_FAILURE, FETCH_DOG_FAILURE, FETCH_FAMILY_FAILURE
} from "../actions/api"


const auth = (state, action) => {
  switch (action.type) {
    case FETCH_DOGS_FAILURE:
    case FETCH_DOG_FAILURE:
    case FETCH_FAMILY_FAILURE:
      return state.setIn(["redirect"], Map({
        initiate: action.auth.redirect.initiate,
        message: (action.auth.redirect.initiate ? "Redirecting to Okta..." : null),
        url: action.auth.redirect.url
      }))
    default:
      return state
  }
}

export default auth
