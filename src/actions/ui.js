
import { doAuthCheck } from "../data/api"


export const CHANGE_ADMIN_MODE = "CHANGE_ADMIN_MODE"
export const CHANGE_AUDITLOG_SYSTEM_PAGENUMBER = "CHANGE_AUDITLOG_SYSTEM_PAGENUMBER"
export const CHANGE_AUDITLOG_USER_PAGENUMBER = "CHANGE_AUDITLOG_USER_PAGENUMBER"
export const CHANGE_CAN_SAVE = "CHANGE_CAN_SAVE"
export const CHANGE_SELECTED_TAB_BEGIN = "CHANGE_SELECTED_TAB_BEGIN"
export const CHANGE_SELECTED_TAB_SUCCESS = "CHANGE_SELECTED_TAB_SUCCESS"
export const CHANGE_SELECTED_TAB_FAILURE = "CHANGE_SELECTED_TAB_FAILURE"
export const CHANGE_SELECTED_TAB = "CHANGE_SELECTED_TAB"
export const CHANGE_VIEW_PAGENUMBER = "CHANGE_VIEW_PAGENUMBER"
export const DISMISS_ADMIN_NOTIFICATION = "DISMISS_ADMIN_NOTIFICATION"
export const DISMISS_FETCH_NOTIFICATION = "DISMISS_FETCH_NOTIFICATION"

export const changeAdminMode = mode => ({
  type: CHANGE_ADMIN_MODE,
  mode
})

export const changeAuditLogSystemPageNumber = page => ({
  type: CHANGE_AUDITLOG_USER_PAGENUMBER,
  page
})

export const changeAuditLogUserPageNumber = page => ({
  type: CHANGE_AUDITLOG_SYSTEM_PAGENUMBER,
  page
})

export const changeCanSave = value => ({
  type: CHANGE_CAN_SAVE,
  value
})

export const changeViewPageNumber = page => ({
  type: CHANGE_VIEW_PAGENUMBER,
  page
})

export const dismissAdminNotification = section => ({
  type: DISMISS_ADMIN_NOTIFICATION,
  section
})

export const dismissFetchNotification = () => ({
  type: DISMISS_FETCH_NOTIFICATION
})

// change selected tab

const changeSelectedTabBegin = () => ({
  type: CHANGE_SELECTED_TAB_BEGIN
})

const changeSelectedTabSuccess = tab => ({
  type: CHANGE_SELECTED_TAB_SUCCESS,
  tab
})

const changeSelectedTabFailure = (error, auth) => ({
  type: CHANGE_SELECTED_TAB_FAILURE,
  error,
  auth
})

export const changeSelectedTab = tab => dispatch => {
  // perform early Okta auth check when switching to the admin tab
  // this avoids the annoying situation where user enters details, clicks
  // Save and then gets redirected and has to start all over again
  if (tab === "admin") {
    dispatch(changeSelectedTabBegin())
    return doAuthCheck(
      data => dispatch(changeSelectedTabSuccess(tab)),
      error => dispatch(changeSelectedTabFailure(error.error, error.auth))
    )
  }
  dispatch(changeSelectedTabSuccess(tab))
}
