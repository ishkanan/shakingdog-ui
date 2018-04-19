
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import { fetchDog } from "../actions/api"
import { changeSearchMode } from "../actions/search"
import { changeSelectedSire } from "../actions/ui"
import { toJS } from "../data/util.jsx"


const DogSearchLink = ({dogId, dogName, className, onDoSearch}) => {
  return (
    <a className={"dogsearchlink " + className} onClick={(e) => {e.preventDefault(); onDoSearch(dogId)}}>{dogName}</a>
  )
}

DogSearchLink.propTypes = {
  // Dog ID
  dogId: PropTypes.number.isRequired,
  // Dog name
  dogName: PropTypes.string.isRequired,
  // Additional CSS
  className: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  dogId: ownProps.dogId,
  dogName: ownProps.dogName,
  className: ownProps.className
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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
