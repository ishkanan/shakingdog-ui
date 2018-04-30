
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { doSearch, changeSearchMode, changeSelectedDog } from "../actions/search"
import Button from "../components/Button.jsx"
import HorizontalFormField from "../components/HorizontalFormField.jsx"
import RadioMultiSelect from "../components/RadioMultiSelect.jsx"
import { toJS } from "../data/util.jsx"
import { getSires, getDams } from "../selectors/dogs"
import { coalesce } from "../util/data"
import { canSearch } from "../util/ui"


const SearchControls = ({dogs, sires, dams, searchMode, selectedSire, selectedDam, canSearch, isSearching, onModeChange, onDogChange, onDoSearch}) => {
  const radios = [
    {id: "single", value: "Single Dog"},
    {id: "couple", value: "Couple"}
  ]

  const selects = [
    {radioId: "single", id: "sire", caption: "Dog", data: _.map(dogs, d => ({id: d.id, value: d.name}))},
    {radioId: "couple", id: "sire", caption: "Sire", data: _.map(sires, d => ({id: d.id, value: d.name}))},
    {radioId: "couple", id: "dam", caption: "Dam", data: _.map(dams, d => ({id: d.id, value: d.name}))}
  ]

  return (
    <React.Fragment>
      <RadioMultiSelect radios={radios}
                        selects={selects}
                        selectedRadio={searchMode}
                        selectedValues={[selectedSire, selectedDam]}
                        onRadioChange={onModeChange}
                        onSelectChange={onDogChange} />
      <HorizontalFormField caption=""
                           content={<Button caption="Search"
                                      className={"is-primary is-rounded" + (isSearching ? " is-loading" : "")}
                                      disabled={!canSearch}
                                      onClick={onDoSearch} />}
                           labelClass="is-normal"
                           bodyClass="is-normal" />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  dogs: coalesce(state.getIn(["data", "dogs", "list"]), []),
  sires: getSires(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  dams: getDams(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  searchMode: state.getIn(["ui", "search", "mode"]),
  selectedDam: state.getIn(["ui", "search", "selectedDam"]),
  selectedSire: state.getIn(["ui", "search", "selectedSire"]),
  isSearching: state.getIn(["data", "dogReport", "isFetching"]) || state.getIn(["data", "couplesReport", "isFetching"]),
  canSearch: state.getIn(["ui", "search", "canSearch"])
})

const mapDispatchToProps = (dispatch) => ({
  onModeChange: (mode) => dispatch(changeSearchMode(mode)),
  onDogChange: (mode, role, dogId) => dispatch(changeSelectedDog(mode, role, dogId)),
  onDoSearch: () => dispatch(doSearch())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SearchControls))
