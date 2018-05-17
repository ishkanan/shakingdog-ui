
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { changeAdminMode } from "../actions/ui"
import VerticalMenu from "../components/VerticalMenu.jsx"
import { toJS } from "../data/util.jsx"


const mapStateToProps = (state) => ({
  items: [
    {id: "newdog", value: "Add New Dog"},
    {id: "newlitter", value: "Add New Litter"},
    {id: "testresult", value: "Record Test Result"},
    {id: "updatedog", value: "Update Dog"},
    {id: "auditlog", value: "View Audit Log"}
  ],
  selectedItem: state.getIn(["ui", "adminMode"])
})

const mapDispatchToProps = ({
  onItemClick: changeAdminMode
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(VerticalMenu))
