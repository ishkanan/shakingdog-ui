
import { fromJS, Map } from "immutable"

import {
  CHANGE_NEWDOG_GENDER,
  CHANGE_NEWDOG_NAME,
  CHANGE_NEWDOG_SHAKINGDOGSTATUS,
  CHANGE_NEWDOG_CECSSTATUS
} from "../actions/admin/newdog"
import {
  CHANGE_SIRE_MODE,
  CHANGE_SELECTED_SIRE,
  CHANGE_NEWSIRE_PROP,
  CHANGE_DAM_MODE,
  CHANGE_SELECTED_DAM,
  CHANGE_NEWDAM_PROP
} from "../actions/admin/newlitter"
import {
  FETCH_DOGS_BEGIN, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE,
  FETCH_DOG_BEGIN, FETCH_DOG_SUCCESS, FETCH_DOG_FAILURE,
  FETCH_FAMILY_BEGIN, FETCH_FAMILY_SUCCESS, FETCH_FAMILY_FAILURE,
  SAVE_NEWDOG_SUCCESS
} from "../actions/api"
import { CHANGE_ADMIN_MODE } from "../actions/ui"
import initialState from "../init.data"


const data = (state, action) => {
  switch (action.type) {
    
    case CHANGE_ADMIN_MODE:
      return (state
        .set("newdog", fromJS(initialState.data.newdog))
        .set("newlitter", fromJS(initialState.data.newlitter))
        .set("testresult", fromJS(initialState.data.testresult))
      )
    
    case CHANGE_NEWDOG_GENDER:
      return state.setIn(["newdog", "dog", "gender"], action.gender)
    
    case CHANGE_NEWDOG_NAME:
      return state.setIn(["newdog", "dog", "name"], action.name)
    
    case CHANGE_NEWDOG_SHAKINGDOGSTATUS:
      return state.setIn(["newdog", "dog", "shakingdogstatus"], action.status)

    case CHANGE_NEWDOG_CECSSTATUS:
      return state.setIn(["newdog", "dog", "cecsstatus"], action.status)

    case CHANGE_SIRE_MODE:
      return state.setIn(["newlitter", "sire", "mode"], action.mode)

    case CHANGE_SELECTED_SIRE:
      return state.setIn(["newlitter", "sire", "selected"], action.sireId)

    case CHANGE_NEWSIRE_PROP:
      return state.setIn(["newlitter", "sire", "dog", action.prop], action.value)

    case CHANGE_DAM_MODE:
      return state.setIn(["newlitter", "dam", "mode"], action.mode)

    case CHANGE_SELECTED_DAM:
      return state.setIn(["newlitter", "dam", "selected"], action.damId)

    case CHANGE_NEWDAM_PROP:
      return state.setIn(["newlitter", "dam", "dog", action.prop], action.value)

    case FETCH_DOGS_BEGIN:
      return state.set("dogs", Map({
        isFetching: true,
        list: null
      }))
    
    case FETCH_DOGS_SUCCESS:
      return state.set("dogs", Map({
        isFetching: false,
        list: fromJS(action.dogs)
      }))
    
    case FETCH_DOGS_FAILURE:
      return state.setIn(["dogs", "isFetching"], false)
    
    case FETCH_DOG_BEGIN:
      return (state
        .set("dogReport", Map({
          isFetching: true,
          dog: null,
          familyAsChild: null,
          familiesAsParent: null,
        }))
        .set("couplesReport", Map({
          isFetching: false,
          sire: null,
          dam: null,
          children: null,
        }))
      )

    case FETCH_DOG_SUCCESS:
      return state.set("dogReport", Map({
        isFetching: false,
        dog: fromJS(action.dog),
        familyAsChild: fromJS(action.familyAsChild),
        familiesAsParent: fromJS(action.familiesAsParent),
      }))
    
    case FETCH_DOG_FAILURE:
      return state.setIn(["dogReport", "isFetching"], false)
    
    case FETCH_FAMILY_BEGIN:
      return (state
        .set("dogReport", Map({
          isFetching: false,
          dog: null,
          familyAsChild: null,
          familiesAsParent: null,
        }))
        .set("couplesReport", Map({
          isFetching: true,
          sire: null,
          dam: null,
          children: null,
        }))
      )

    case FETCH_FAMILY_SUCCESS:
      return state.set("couplesReport", Map({
        isFetching: false,
        sire: fromJS(action.sire),
        dam: fromJS(action.dam),
        children: fromJS(action.children),
      }))
    
    case FETCH_FAMILY_FAILURE:
      return state.setIn(["couplesReport", "isFetching"], false)

    case SAVE_NEWDOG_SUCCESS:
      return state.setIn(["newdog", "lastCreatedId"], action.dogId)
    
    default:
      return state
  }
}

export default data
