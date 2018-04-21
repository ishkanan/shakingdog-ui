
import React from "react"
import { connect } from "react-redux"

import CouplesReport from "../components/CouplesReport.jsx"
import DogReport from "../components/DogReport.jsx"
import { toJS } from "../data/util.jsx"


const SearchResults = ({showDogReport, showCouplesReport, dog, familyAsChild, familiesAsParent, sire, dam, children}) => {
  return (
    <React.Fragment>
      {showDogReport &&
      <DogReport dog={dog}
                 familyAsChild={familyAsChild}
                 familiesAsParent={familiesAsParent} />
      }
      {showCouplesReport &&
      <CouplesReport sire={sire}
                     dam={dam}
                     children={children} />
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  showDogReport: state.getIn(["data", "dogReport", "dog"]) !== null,
  showCouplesReport: state.getIn(["data", "couplesReport", "sire"]) !== null,
  dog: state.getIn(["data", "dogReport", "dog"]),
  familyAsChild: state.getIn(["data", "dogReport", "familyAsChild"]),
  familiesAsParent: state.getIn(["data", "dogReport", "familiesAsParent"]),
  sire: state.getIn(["data", "couplesReport", "sire"]),
  dam: state.getIn(["data", "couplesReport", "dam"]),
  children: state.getIn(["data", "couplesReport", "children"])
})

export default connect(
  mapStateToProps
)(toJS(SearchResults))
