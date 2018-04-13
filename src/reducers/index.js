
import { combineReducers } from "redux-immutable"

import auth from "./auth"
import data from "./data"
import search from "./search"
import ui from "./ui"


export default combineReducers({
  auth,
  data,
  search,
  ui
})
