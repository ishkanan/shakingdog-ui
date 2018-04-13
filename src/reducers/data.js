
import { fromJS, Map } from "immutable"

import {
  FETCH_DOGS_BEGIN, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE,
  FETCH_DOG_BEGIN, FETCH_DOG_SUCCESS, FETCH_DOG_FAILURE,
  FETCH_FAMILY_BEGIN, FETCH_FAMILY_SUCCESS, FETCH_FAMILY_FAILURE
} from "../actions/api"


const data = (state, action) => {
  switch (action.type) {
    case FETCH_DOGS_BEGIN:
      return state.setIn(["dogs"], Map({
        isFetching: true,
        list: null
      }))
    case FETCH_DOGS_SUCCESS:
      return state.setIn(["dogs"], Map({
        isFetching: false,
        list: fromJS(action.dogs)
      }))
    case FETCH_DOGS_FAILURE:
      return state.setIn(["dogs", "isFetching"], false)
    case FETCH_DOG_BEGIN:
      return state.setIn(["dogReport"], Map({
        isFetching: true,
        dog: null,
        familyAsChild: null,
        familiesAsParent: null,
      }))
    case FETCH_DOG_SUCCESS:
      return state.setIn(["dogReport"], Map({
        isFetching: false,
        dog: fromJS(action.dog),
        familyAsChild: fromJS(action.familyAsChild),
        familiesAsParent: fromJS(action.familiesAsParent),
      }))
    case FETCH_DOG_FAILURE:
      return state.setIn(["dogReport", "isFetching"], false)
    case FETCH_FAMILY_BEGIN:
      return state.setIn(["couplesReport"], Map({
        isFetching: true,
        sire: null,
        dam: null,
        children: null,
      }))
    case FETCH_FAMILY_SUCCESS:
      return state.setIn(["couplesReport"], Map({
        isFetching: false,
        sire: fromJS(action.sire),
        dam: fromJS(action.dam),
        children: fromJS(action.children),
      }))
    case FETCH_FAMILY_FAILURE:
      return state.setIn(["couplesReport", "isFetching"], false)
    default:
      return state
  }
}

export default data
