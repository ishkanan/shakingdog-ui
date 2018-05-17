
import React from "react"
import { connect } from "react-redux"

import AuditLogTable from "./AuditLogTable.jsx"
import NewDogPage from "./NewDogPage.jsx"
import NewLitterPage from "./NewLitterPage.jsx"
import RecordTestResult from "./RecordTestResult.jsx"
import UpdateDogPage from "./UpdateDogPage.jsx"
import { toJS } from "../data/util.jsx"


const AdminControls = ({adminMode}) => {
  return (
    <React.Fragment>
      {adminMode === "newdog" &&
      <NewDogPage />
      }
      {adminMode === "updatedog" &&
      <UpdateDogPage />
      }
      {adminMode === "newlitter" &&
      <NewLitterPage />
      }
      {adminMode === "testresult" &&
      <RecordTestResult />
      }
      {adminMode === "auditlog" &&
      <AuditLogTable />
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
