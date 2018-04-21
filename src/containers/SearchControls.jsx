
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { doSearch, setSearchMode, setSelectedDog } from "../actions/search"
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
                           isNarrow={false} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  dogs: coalesce(state.getIn(["data", "dogs", "list"]), []),
  sires: getSires(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  dams: getDams(coalesce(state.getIn(["data", "dogs", "list"]), [])),
  searchMode: state.getIn(["ui", "searchMode"]),
  selectedDam: state.getIn(["ui", "selectedDam"]),
  selectedSire: state.getIn(["ui", "selectedSire"]),
  isSearching: state.getIn(["data", "dogReport", "isFetching"]) || state.getIn(["data", "couplesReport", "isFetching"]),
  canSearch: state.getIn(["ui", "canSearch"])
})

const mapDispatchToProps = (dispatch) => ({
  onModeChange: (mode) => dispatch(setSearchMode(mode)),
  onDogChange: (mode, role, dogId) => dispatch(setSelectedDog(mode, role, dogId)),
  onDoSearch: () => dispatch(doSearch())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SearchControls))
