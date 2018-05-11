
import _ from "lodash"
import React from "react"
import Pagination from "react-js-pagination";
import { connect } from "react-redux"
import ReactTable from "react-table";

import { fetchAuditLog } from "../actions/api"
import {
  changeAuditLogSystemPageNumber,
  changeAuditLogUserPageNumber
} from "../actions/ui"
import Button from "../components/Button.jsx"
import HorizontalFormField from "../components/HorizontalFormField.jsx"
import { toJS } from "../data/util.jsx"
import { sliceOfPie } from "../util/data"


const AuditLogTable = ({systemEntries, totalSystemEntries, systemPageNumber,
                        userEntries, totalUserEntries, userPageNumber,
                        isFetching, onSystemPageChange, onUserPageChange, onDoRefresh}) => {
  const columns = [
    {
      Header: <div className="dark-header">Timestamp</div>,
      accessor: "stamp",
      Cell: row => row.original.stamp
    },
    {
      Header: <div className="dark-header">User</div>,
      accessor: "actor",
      Cell: row => row.original.actor
    },
    {
      Header: <div className="dark-header">Action</div>,
      accessor: "action",
      Cell: row => row.original.action
    }
  ]

  return (
    <React.Fragment>
      {isFetching &&
      <h6 className="title is-6">Loading data...please wait!</h6>
      }
      {!isFetching && totalSystemEntries === 0 && totalUserEntries === 0 &&
      <h6 className="title is-6">No entries.</h6>
      }
      {!isFetching && totalSystemEntries > 0 &&
      <React.Fragment>
        <HorizontalFormField caption="System Log:"
                             content={<Pagination prevPageText="Previous"
                                                  nextPageText="Next"
                                                  itemClass="paginate-item"
                                                  linkClass="paginate-link"
                                                  hideDisabled={true}
                                                  pageRangeDisplayed={10}
                                                  activePage={systemPageNumber}
                                                  itemsCountPerPage={15}
                                                  totalItemsCount={totalSystemEntries}
                                                  onChange={onSystemPageChange} />}
                             labelClass="is-normal"
                             bodyClass="is-normal" />
        <br/>
        <ReactTable className="auditlog-entries"
                    data={systemEntries}
                    columns={columns}
                    defaultPageSize={systemEntries.length}
                    resizable={false}
                    showPagination={false} />
      </React.Fragment>
      }
      {!isFetching && totalUserEntries > 0 &&
      <React.Fragment>
        <br/>
        <HorizontalFormField caption="User Log:"
                             content={<Pagination prevPageText="Previous"
                                                  nextPageText="Next"
                                                  itemClass="paginate-item"
                                                  linkClass="paginate-link"
                                                  hideDisabled={true}
                                                  pageRangeDisplayed={10}
                                                  activePage={userPageNumber}
                                                  itemsCountPerPage={15}
                                                  totalItemsCount={totalUserEntries}
                                                  onChange={onUserPageChange} />}
                             labelClass="is-normal"
                             bodyClass="is-normal" />
        <br/>
        <ReactTable className="auditlog-entries"
                    data={userEntries}
                    columns={columns}
                    defaultPageSize={userEntries.length}
                    resizable={false}
                    showPagination={false} />
      </React.Fragment>
      }
      <br/>
      <Button caption="Refresh"
              className={"is-primary is-rounded" + (isFetching ? " is-loading" : "")}
              disabled={isFetching}
              onClick={onDoRefresh} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  systemEntries: sliceOfPie(
    state.getIn(["data", "auditLog", "systemEntries"]),
    state.getIn(["ui", "auditLog", "systemPageNumber"]),
    15
  ),
  totalSystemEntries: function e() {
    const items = state.getIn(["data", "auditLog", "systemEntries"])
    return _.isNil(items) ? 0 : items.size
  }(),
  systemPageNumber: state.getIn(["ui", "auditLog", "systemPageNumber"]),
  userEntries: sliceOfPie(
    state.getIn(["data", "auditLog", "userEntries"]),
    state.getIn(["ui", "auditLog", "userPageNumber"]),
    15
  ),
  totalUserEntries: function e() {
    const items = state.getIn(["data", "auditLog", "userEntries"])
    return _.isNil(items) ? 0 : items.size
  }(),
  userPageNumber: state.getIn(["ui", "auditLog", "userPageNumber"]),
  isFetching: state.getIn(["data", "auditLog", "isFetching"])
})

const mapDispatchToProps = ({
  onSystemPageChange: changeAuditLogSystemPageNumber,
  onUserPageChange: changeAuditLogUserPageNumber,
  onDoRefresh: fetchAuditLog
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AuditLogTable))
