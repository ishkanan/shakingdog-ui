
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import { changeAdminMode } from "../actions/ui"
import { toJS } from "../data/util.jsx"


const AdminMenu = ({adminMode, onModeChange}) => {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li><a className={adminMode === "newdog" ? "is-active" : ""} onClick={(e) => {e.preventDefault(); onModeChange("newdog")}}>Add New Dog</a></li>
        <li><a className={adminMode === "newlitter" ? "is-active" : ""} onClick={(e) => {e.preventDefault(); onModeChange("newlitter")}}>Add New Litter</a></li>
        <li><a className={adminMode === "testresult" ? "is-active" : ""} onClick={(e) => {e.preventDefault(); onModeChange("testresult")}}>Record Test Result</a></li>
      </ul>
    </aside>
  )
}

AdminMenu.propTypes = {
  // Current admin mode
  adminMode: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  adminMode: state.getIn(["ui", "adminMode"])
})

const mapDispatchToProps = ({
  onModeChange: changeAdminMode
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AdminMenu))
