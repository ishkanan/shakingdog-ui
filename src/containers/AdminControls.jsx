
import React from "react"
import { connect } from "react-redux"

import NewDogPage from "./NewDogPage.jsx"
import NewLitterPage from "./NewLitterPage.jsx"
import RecordTestResult from "./RecordTestResult.jsx"
import SetGenderPage from "./SetGenderPage.jsx"
import { toJS } from "../data/util.jsx"


const AdminControls = ({adminMode}) => {
  return (
    <React.Fragment>
      {adminMode === "newdog" &&
      <NewDogPage />
      }
      {adminMode === "setgender" &&
      <SetGenderPage />
      }
      {adminMode === "newlitter" &&
      <NewLitterPage />
      }
      {adminMode === "testresult" &&
      <RecordTestResult />
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  adminMode: state.getIn(["ui", "adminMode"])
})

export default connect(
  mapStateToProps
)(toJS(AdminControls))
