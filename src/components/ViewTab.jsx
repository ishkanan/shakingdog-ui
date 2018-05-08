
import PropTypes from "prop-types"
import React from "react"
import ReactTable from "react-table";

import StatusLegend from "./StatusLegend.jsx"
import FetchNotification from "../containers/FetchNotification.jsx"
import RelationshipsTable from "../containers/RelationshipsTable.jsx"


const ViewTab = () => {
  return (
    <React.Fragment>
      <FetchNotification />
      <div className="is-width-full">
        <StatusLegend statuses={["Affected", "Carrier", "CarrierByProgeny", "Clear", "ClearByParentage", "Unknown"]} />
        <br/>
        <RelationshipsTable />
      </div>
    </React.Fragment>
  )
}

export default ViewTab
