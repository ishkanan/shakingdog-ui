
import PropTypes from "prop-types"
import React from "react"

import AdminOpControls from "./AdminOpControls.jsx"
import AdminOpMenu from "../containers/AdminOpMenu.jsx"


const AdminTab = () => {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <AdminOpMenu />
      </div>
      <div className="column">
        <AdminOpControls />
      </div>
    </div>
  )
}

export default AdminTab
