
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import NewDogPage from "./NewDogPage.jsx"
import { toJS } from "../data/util.jsx"


const AdminControls = ({adminMode}) => {
  return (
    <React.Fragment>
      {adminMode === "newdog" &&
      <NewDogPage />
      }
      {adminMode === "newlitter" &&
      <p>NEW LITTER</p>
      }
      {adminMode === "testresult" &&
      <p>RECORD TEST RESULT</p>
      }
    </React.Fragment>
  )
}

AdminControls.propTypes = {
  // Current admin mode
  adminMode: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  adminMode: state.getIn(["ui", "adminMode"])
})

export default connect(
  mapStateToProps
)(toJS(AdminControls))
