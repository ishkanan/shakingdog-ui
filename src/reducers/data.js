
import { fromJS, Map } from "immutable"
import _ from "lodash"

import { CHANGE_NEWDOG_PROP } from "../actions/admin/newdog"
import {
  CHANGE_NEWLITTER_SIRE_MODE,
  CHANGE_NEWLITTER_SELECTED_SIRE,
  CHANGE_NEWLITTER_NEWSIRE_PROP,
  CHANGE_NEWLITTER_DAM_MODE,
  CHANGE_NEWLITTER_SELECTED_DAM,
  CHANGE_NEWLITTER_NEWDAM_PROP,
  CHANGE_NEWLITTER_CHILD_MODE,
  CHANGE_NEWLITTER_SELECTED_CHILD,
  CHANGE_NEWLITTER_NEWCHILD_PROP,
  ADD_CHILD_TO_NEWLITTER,
  REMOVE_CHILD_FROM_NEWLITTER
} from "../actions/admin/newlitter"
import {
  CHANGE_SETGENDER_GENDER,
  CHANGE_SETGENDER_SELECTED
} from "../actions/admin/setgender"
import {
  CHANGE_TESTRESULT_DOG_RESULT,
  CHANGE_TESTRESULT_DOG_MODE,
  CHANGE_TESTRESULT_SELECTED_DOG,
  CHANGE_TESTRESULT_NEWDOG_PROP,
  CHANGE_TESTRESULT_EDIT_SIRE,
  CHANGE_TESTRESULT_SIRE_MODE,
  CHANGE_TESTRESULT_SELECTED_SIRE,
  CHANGE_TESTRESULT_NEWSIRE_PROP,
  CHANGE_TESTRESULT_EDIT_DAM,
  CHANGE_TESTRESULT_DAM_MODE,
  CHANGE_TESTRESULT_SELECTED_DAM,
  CHANGE_TESTRESULT_NEWDAM_PROP
} from "../actions/admin/testresult"
import {
  FETCH_DOGS_BEGIN, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE,
  FETCH_DOG_BEGIN, FETCH_DOG_SUCCESS, FETCH_DOG_FAILURE,
  FETCH_FAMILY_BEGIN, FETCH_FAMILY_SUCCESS, FETCH_FAMILY_FAILURE,
  FETCH_RELATIONSHIPS_BEGIN, FETCH_RELATIONSHIPS_SUCCESS, FETCH_RELATIONSHIPS_FAILURE,
  SAVE_NEWDOG_SUCCESS, SAVE_NEWLITTER_SUCCESS, SAVE_SETGENDER_SUCCESS, SAVE_TESTRESULT_SUCCESS
} from "../actions/api"
import { CHANGE_ADMIN_MODE } from "../actions/ui"
import initialState from "../init.data"


const data = (state, action) => {
  switch (action.type) {
    
    case CHANGE_ADMIN_MODE:
    case SAVE_NEWDOG_SUCCESS:
    case SAVE_NEWLITTER_SUCCESS:
    case SAVE_SETGENDER_SUCCESS:
    case SAVE_TESTRESULT_SUCCESS:
      return (state
        .set("newdog", fromJS(initialState.data.newdog))
        .set("newlitter", fromJS(initialState.data.newlitter))
        .set("setgender", fromJS(initialState.data.setgender))
        .set("testresult", fromJS(initialState.data.testresult))
      )
    
    case CHANGE_NEWDOG_PROP:
      return state.setIn(["newdog", "dog", action.prop], action.value)
    
    case CHANGE_NEWLITTER_SIRE_MODE:
      return state.setIn(["newlitter", "sire", "mode"], action.mode)

    case CHANGE_NEWLITTER_SELECTED_SIRE:
      return state.setIn(["newlitter", "sire", "selected"], action.sireId)

    case CHANGE_NEWLITTER_NEWSIRE_PROP:
      return state.setIn(["newlitter", "sire", "dog", action.prop], action.value)

    case CHANGE_NEWLITTER_DAM_MODE:
      return state.setIn(["newlitter", "dam", "mode"], action.mode)

    case CHANGE_NEWLITTER_SELECTED_DAM:
      return state.setIn(["newlitter", "dam", "selected"], action.damId)

    case CHANGE_NEWLITTER_NEWDAM_PROP:
      return state.setIn(["newlitter", "dam", "dog", action.prop], action.value)

    case CHANGE_NEWLITTER_CHILD_MODE:
      return state.setIn(["newlitter", "children", action.index, "mode"], action.mode)

    case CHANGE_NEWLITTER_SELECTED_CHILD:
      return state.setIn(["newlitter", "children", action.index, "selected"], action.childId)

    case CHANGE_NEWLITTER_NEWCHILD_PROP:
      return state.setIn(["newlitter", "children", action.index, "dog", action.prop], action.value)

    case ADD_CHILD_TO_NEWLITTER:
      return state.setIn(
        ["newlitter", "children"],
        state.getIn(["newlitter", "children"]).push(fromJS({
          mode: "search",
          selected: null,
          dog: {
            id: null,
            gender: "U",
            name: "",
            shakingdogstatus: "Unknown",
            cecsstatus: "Unknown"
          }
        }))
      )

    case REMOVE_CHILD_FROM_NEWLITTER:
      return state.setIn(
        ["newlitter", "children"],
        state.getIn(["newlitter", "children"]).delete(action.index)
      )

    case CHANGE_SETGENDER_GENDER:
      return state.setIn(["setgender", "gender"], action.gender)

    case CHANGE_SETGENDER_SELECTED:
      return state.setIn(["setgender", "selected"], action.dogId)

    case CHANGE_TESTRESULT_DOG_RESULT:
      return state.setIn(["testresult", "dog", "selected", action.ailment], action.result)

    case CHANGE_TESTRESULT_DOG_MODE:
      return state.setIn(["testresult", "dog", "mode"], action.mode)

    case CHANGE_TESTRESULT_SELECTED_DOG:
      // state tree differs slightly to other admin sections to make for more
      // reuseable code, so populate more details of selected dog
      var trDog = state.getIn(["dogs", "list"]).find(d => d.get("id") === action.dogId)
      return state.mergeIn(["testresult", "dog", "selected"], fromJS({
        id: _.isNil(trDog) ? null : trDog.get("id"),
        name: _.isNil(trDog) ? null : trDog.get("name"),
        gender: _.isNil(trDog) ? null : trDog.get("gender"),
        origshakingdogstatus: _.isNil(trDog) ? null : trDog.get("shakingdogstatus"),
        origcecsstatus: _.isNil(trDog) ? null : trDog.get("cecsstatus")
      }))

    case CHANGE_TESTRESULT_NEWDOG_PROP:
      return state.setIn(["testresult", "dog", "dog", action.prop], action.value)

    case CHANGE_TESTRESULT_EDIT_SIRE:
      return state.setIn(["testresult", "sire", "edit"], action.edit)

    case CHANGE_TESTRESULT_SIRE_MODE:
      return state.setIn(["testresult", "sire", "mode"], action.mode)

    case CHANGE_TESTRESULT_SELECTED_SIRE:
      return state.setIn(["testresult", "sire", "selected"], action.sireId)

    case CHANGE_TESTRESULT_NEWSIRE_PROP:
      return state.setIn(["testresult", "sire", "dog", action.prop], action.value)

    case CHANGE_TESTRESULT_EDIT_DAM:
      return state.setIn(["testresult", "dam", "edit"], action.edit)

    case CHANGE_TESTRESULT_DAM_MODE:
      return state.setIn(["testresult", "dam", "mode"], action.mode)

    case CHANGE_TESTRESULT_SELECTED_DAM:
      return state.setIn(["testresult", "dam", "selected"], action.damId)

    case CHANGE_TESTRESULT_NEWDAM_PROP:
      return state.setIn(["testresult", "dam", "dog", action.prop], action.value)

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

    case FETCH_RELATIONSHIPS_BEGIN:
      return state.set("relationships", Map({
        isFetching: true,
        list: null
      }))
    
    case FETCH_RELATIONSHIPS_SUCCESS:
      return state.set("relationships", Map({
        isFetching: false,
        list: fromJS(action.relationships)
      }))
    
    case FETCH_RELATIONSHIPS_FAILURE:
      return state.setIn(["relationships", "isFetching"], false)

    default:
      return state
  }
}

export default data
