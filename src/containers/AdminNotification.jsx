
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { sprintf } from "sprintf-js"

import { dismissAdminNotification } from "../actions/ui"
import { toJS } from "../data/util.jsx"
import Notification from "../components/Notification.jsx"
import { coalesce, isNilOrEmptyString } from "../util/data"
import { errorCodeUIMap, notificationTypeUIMap } from "../util/ui"


const AdminNotification = ({notification, onDismiss}) => {
  // can have nothing to render
  if (_.isNil(notification)) {
    return null
  }

  // determine what to render and how
  var message = notification.message
  if (notification.type === "failure" ) {
    message = sprintf("%s: %s (%s)",
      _.isNil(notification.code) ? "GENERAL ERROR" : "API ERROR #" + notification.code.toString(),
      coalesce(errorCodeUIMap[notification.code], "Unknown server error"),
      coalesce(notification.message, "UNKNOWN")
    )
  }
  const ui = notificationTypeUIMap[notification.type]

  return (
    <Notification message={message}
                  className={ui.notifyClass}
                  iconClass={ui.iconClass}
                  onDismiss={onDismiss} />
  )
}

const mapStateToProps = (state) => ({
  notification: state.getIn(["ui", "notification", "admin"])
})

const mapDispatchToProps = ({
  onDismiss: dismissAdminNotification
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(AdminNotification))
