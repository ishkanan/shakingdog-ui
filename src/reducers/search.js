
import { CHANGE_SEARCH_MODE } from "../actions/search"


const search = (state, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_MODE:
      return state.setIn(["mode"], action.mode)
    default:
      return state
  }
}

export default search
