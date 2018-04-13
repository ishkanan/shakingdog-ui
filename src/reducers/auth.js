
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
        message: "Redirecting to Okta...",
        url: action.url
      }))
    default:
      return state
  }
}

export default auth
