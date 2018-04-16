
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { fetchDog, fetchFamily } from "../actions/api"
import { changeSearchMode } from "../actions/search"
import { changeSelectedSire, changeSelectedDam } from "../actions/ui"
import Button from "../components/Button.jsx"
import RadioMultiSelect from "../components/RadioMultiSelect.jsx"
import { toJS } from "../data/util.jsx"
import { getSires, getDams } from "../selectors/dogs"
import { coalesce } from "../utils"


const SearchControls = ({dogs, sires, dams, searchMode, selectedSire, selectedDam, canSearch, onModeChange, onDogChange, onDoSearch}) => {
  const radios = [
    {id: "single", value: "Single Dog"},
    {id: "couple", value: "Couple"}
  ]

  const selects = [
    {radioId: "single", caption: "Dog", data: _.map(dogs, d => ({id: d.id, value: d.name}))},
    {radioId: "couple", caption: "Sire", data: _.map(sires, d => ({id: d.id, value: d.name}))},
    {radioId: "couple", caption: "Dam", data: _.map(dams, d => ({id: d.id, value: d.name}))}
  ]

  return [
    <RadioMultiSelect radios={radios}
                      selects={selects}
                      selectedRadio={searchMode}
                      selectedValues={[selectedSire, selectedDam]}
                      onRadioChange={onModeChange}
                      onSelectChange={onDogChange} />,
    <Button caption="Search"
            className="is-primary"
            disabled={!canSearch}
            onClick={onDoSearch} />
  ]
}

const canSearch = (mode, sire, dam) => {
  switch (mode) {
    case "single":
      return (sire !== null)
    case "couple":
      return (sire !== null && dam !== null)
    default:
      return false
  }
}

// have to do some funk to get access to state within mapDispatchToProps
// https://stackoverflow.com/questions/35836290/access-state-inside-of-mapdispatchtoprops-method
const doSearchAction = () => {
  return (dispatch, getState) => {
    const state = getState()
    const search = canSearch(state)
    const mode = state.getIn(["search", "mode"])
    const sire = state.getIn(["ui", "selectedSire"])
    const dam = state.getIn(["ui", "selectedDam"])

    if (search && mode === "single") {
      return () => fetchDog(sire)
    } else if (search && mode === "couple") {
      return () => fetchFamily(sire, dam)
    } else {
      return () => {}
    }
  }
}

const mapStateToProps = (state) => ({
  dogs: coalesce(state.getIn(["data", "dogs", "list"]), []),
  sires: getSires(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  dams: getDams(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  searchMode: state.getIn(["search", "mode"]),
  selectedSire: state.getIn(["ui", "selectedSire"]),
  selectedDam: state.getIn(["ui", "selectedDam"]),
  canSearch: canSearch(
    state.getIn(["search", "mode"]),
    state.getIn(["ui", "selectedSire"]),
    state.getIn(["ui", "selectedDam"])
  )
})

const mapDispatchToProps = (dispatch) => ({
  onModeChange: changeSearchMode,
  onDogChange: (role, index, dog) => role === "sire" ? changeSelectedSire(dog) : changeSelectedDam(dog),
  onDoSearch: () => dispatch(doSearchAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SearchControls))
