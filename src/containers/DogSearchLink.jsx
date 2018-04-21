
import React from "react"
import { connect } from "react-redux"

import { fetchDog } from "../actions/api"
import { changeSearchMode, changeSelectedSire } from "../actions/ui"
import Link from "../components/Link.jsx"
import { toJS } from "../data/util.jsx"


const DogSearchLink = ({dogId, dogName, onDoSearch}) => {
  return (
    <Link caption={dogName}
          className="dogsearchlink input is-static"
          onClick={() => onDoSearch(dogId)} />
  )
}

const mapStateToProps = (state, ownProps) => ({
  dogId: ownProps.dogId,
  dogName: ownProps.dogName
})

const mapDispatchToProps = (dispatch) => ({
  onDoSearch: (dogId) => {
    dispatch(changeSearchMode("single"))
    dispatch(changeSelectedSire(dogId))
    dispatch(fetchDog(dogId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DogSearchLink))
