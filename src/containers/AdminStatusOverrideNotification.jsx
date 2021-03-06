
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

import { toJS } from "../data/util.jsx"
import Notification from "../components/Notification.jsx"
import { notificationTypeUIMap } from "../util/ui"


const AdminStatusOverrideNotification = ({isOverriding, status}) => {
  // can have nothing to render
  if (!isOverriding) {
    return null
  }

  const ui = notificationTypeUIMap["warning"]

  return (
    <Notification message={"WARNING: Overriding an inferred status ("+status+")!"}
                  className={ui.notifyClass}
                  iconClass={ui.iconClass}
                  onDismiss={null} />
  )
}

const mapStateToProps = (state) => ({
  isOverriding: _.includes(
    ["CarrierByProgeny", "ClearByParentage"],
    state.getIn(["data", "testresult", "dog", "selected", "origshakingdogstatus"])
  ),
  status: state.getIn(["data", "testresult", "dog", "selected", "origshakingdogstatus"])
})

export default connect(
  mapStateToProps
)(toJS(AdminStatusOverrideNotification))
