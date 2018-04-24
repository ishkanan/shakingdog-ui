
import React from "react"
import Pagination from "react-js-pagination";
import { connect } from "react-redux"
import ReactTable from "react-table";

import { changeViewPageNumber } from "../actions/ui"
import { toJS } from "../data/util.jsx"
import { dogStatusUIMap } from "../util/ui"


const RelationshipsTable = ({relationships, totalRelationships, pageNumber, isFetching, onPageChange}) => {
  const columns = [
    {
      Header: "Sire",
      accessor: "sirename",
      Cell: row => <div className={dogStatusUIMap[row.original.sireshakingdogstatus].badgeClass}>{row.value}</div>
    },
    {
      Header: "Dam",
      accessor: "damname",
      Cell: row => <div className={dogStatusUIMap[row.original.damshakingdogstatus].badgeClass}>{row.value}</div>
    },
    {
      Header: "Child",
      accessor: "childname",
      Cell: row => <div className={dogStatusUIMap[row.original.childshakingdogstatus].badgeClass}>{row.value}</div>
    }
  ]

  return (
    <React.Fragment>
      {isFetching &&
      <h6 className="title is-6">Loading data...please wait!</h6>
      }
      {!isFetching && totalRelationships === 0 &&
      <h6 className="title is-6">No data to display! Try refresh the page.</h6>
      }
      {!isFetching && totalRelationships > 0 &&
      <React.Fragment>
        <div className="justify-center">
          <Pagination prevPageText="Previous"
                      nextPageText="Next"
                      itemClass="paginate-item"
                      linkClass="paginate-link"
                      hideDisabled={true}
                      pageRangeDisplayed={15}
                      activePage={pageNumber}
                      itemsCountPerPage={relationships.length}
                      totalItemsCount={totalRelationships}
                      onChange={onPageChange} />
        </div>
        <br/>
        <ReactTable data={relationships}
                    columns={columns}
                    defaultPageSize={relationships.length}
                    resizable={false}
                    showPagination={false} />
      </React.Fragment>
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  relationships: function r() {
    if (state.getIn(["data", "relationships", "list"]) === null) {
      return null
    }
    const rships = state.getIn(["data", "relationships", "list"])
    const page = state.getIn(["ui", "view", "pageNumber"])
    const baseIndex = (page - 1) * 50
    return rships.slice(baseIndex, Math.min(baseIndex + 50, rships.size))
  }(),
  totalRelationships: function r() {
    if (state.getIn(["data", "relationships", "list"]) === null) {
      return 0
    }
    return state.getIn(["data", "relationships", "list"]).size
  }(),
  pageNumber: state.getIn(["ui", "view", "pageNumber"]),
  isFetching: state.getIn(["data", "relationships", "isFetching"])
})

const mapDispatchToProps = ({
  onPageChange: changeViewPageNumber
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(RelationshipsTable))
