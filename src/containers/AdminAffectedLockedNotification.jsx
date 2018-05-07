
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { toJS } from "../data/util.jsx"
import Notification from "../components/Notification.jsx"
import { notificationTypeUIMap } from "../util/ui"


const AdminAffectedLockedNotification = ({isAffected}) => {
  // can have nothing to render
  if (!isAffected) {
    return null
  }

  const ui = notificationTypeUIMap["warning"]

  return (
    <Notification message="WARNING: Cannot override 'Affected' status!"
                  className={ui.notifyClass}
                  iconClass={ui.iconClass}
                  onDismiss={null} />
  )
}

const mapStateToProps = (state) => ({
  isAffected: state.getIn(["data", "testresult", "dog", "selected", "origshakingdogstatus"]) === "Affected"
})

export default connect(
  mapStateToProps
)(toJS(AdminAffectedLockedNotification))
