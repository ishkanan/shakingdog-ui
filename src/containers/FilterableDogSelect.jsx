
import { connect } from "react-redux"

import { changeSearchMode } from "../actions/search"
import { changeSelectedSire, changeSelectedDam } from "../actions/ui"
import DogSelect from "../components/DogSelect.jsx"
import { toJS } from "../data/util.jsx"
import { getSires, getDams } from "../selectors/dogs"


const defaultIfNull = (value, def) => (value !== null ? value : def)

const mapStateToProps = (state) => ({
  dogs: defaultIfNull(state.getIn(["data", "dogs", "list"]), []),
  mode: state.getIn(["search", "mode"]),
  sires: getSires(defaultIfNull(state.getIn(["data", "dogs", "list"]), [])),
  dams: getDams(defaultIfNull(state.getIn(["data", "dogs", "list"]), [])),
  selectedSire: state.getIn(["ui", "selectedSire"]),
  selectedDam: state.getIn(["ui", "selectedDam"])
})

const mapDispatchToProps = ({
  onDogChange: (role, dog) =>
    role === "sire" ? changeSelectedSire(dog) : changeSelectedDam(dog)
  ,
  onModeChange: changeSearchMode
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DogSelect))
