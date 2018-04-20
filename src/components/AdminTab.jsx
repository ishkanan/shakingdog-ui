
import PropTypes from "prop-types"
import React from "react"

import AdminControls from "../containers/AdminControls.jsx"
import AdminMenu from "../containers/AdminMenu.jsx"


const AdminTab = () => {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <AdminMenu />
      </div>
      <div className="column">
        <AdminControls />
      </div>
    </div>
  )
}

export default AdminTab
