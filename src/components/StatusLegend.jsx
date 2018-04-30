
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"
import ReactTable from "react-table";

import HorizontalFormField from "./HorizontalFormField.jsx"
import { dogStatusUIMap } from "../util/ui"


const StatusLegend = ({statuses}) => {
  const columns = _.map(statuses, status => {
    const ui = dogStatusUIMap[status]
    return {
      Header: <div className={"is-height-full is-width-full no-radius " + ui.badgeClass}>{ui.caption}</div>
    }
  })

  return (
    <HorizontalFormField caption="Legend:"
                         content={<ReactTable data={[]}
                                              columns={columns}
                                              defaultPageSize={0}
                                              pageSize={0}
                                              resizable={false}
                                              sortable={false}
                                              showPagination={false}
                                              noDataText={""} />}
                         labelClass="is-normal has-text-left is-flex-dwarf"
                         bodyClass="is-normal is-width-full" />
  )
}

StatusLegend.propTypes = {
  // Statuses to display
  statuses: PropTypes.array.isRequired
}

export default StatusLegend
