
import PropTypes from "prop-types"
import React from "react"
import ReactTable from "react-table";

import StatusLegend from "./StatusLegend.jsx"
import RelationshipsTable from "../containers/RelationshipsTable.jsx"


const ViewTab = () => {
  return (
    <div className="is-width-full">
      <StatusLegend statuses={["Affected", "Carrier", "CarrierByProgeny", "Clear", "ClearByParentage", "Unknown"]} />
      <br/>
      <RelationshipsTable />
    </div>
  )
}

export default ViewTab
