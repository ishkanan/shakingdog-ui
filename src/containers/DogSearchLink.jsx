
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import {
  doSearch,
  setSearchMode,
  setSelectedDog
} from "../actions/search"
import { changeSelectedTab } from "../actions/ui"
import Link from "../components/Link.jsx"
import { toJS } from "../data/util.jsx"


const DogSearchLink = ({dogId, dogName, additionalClasses, onDoSearch}) => {
  const classes = (_.isNil(additionalClasses) ? "" : " " + additionalClasses)

  return (
    <Link caption={dogName}
          className={"dogsearchlink input is-static" + classes}
          onClick={() => onDoSearch(dogId)} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  dogId: ownProps.dogId,
  dogName: ownProps.dogName,
  additionalClasses: ownProps.additionalClasses
})

const mapDispatchToProps = (dispatch) => ({
  onDoSearch: (dogId) => {
    dispatch(changeSelectedTab("search"))
    dispatch(setSearchMode("single"))
    dispatch(setSelectedDog("single", "sire", dogId))
    dispatch(doSearch())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DogSearchLink))
