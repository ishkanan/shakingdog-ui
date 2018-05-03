
import PropTypes from "prop-types"
import React from "react"

import AdminControls from "../containers/AdminControls.jsx"
import AdminNotification from "../containers/AdminNotification.jsx"
import AdminVerticalMenu from "../containers/AdminVerticalMenu.jsx"


const AdminTab = () => {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <AdminVerticalMenu />
      </div>
      <div className="column">
        <AdminNotification />
        <AdminControls />
      </div>
    </div>
  )
}

export default AdminTab
