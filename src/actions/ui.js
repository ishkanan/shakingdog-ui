
export const CHANGE_ADMIN_MODE = "CHANGE_ADMIN_MODE"
export const CHANGE_CAN_SAVE = "CHANGE_CAN_SAVE"
export const CHANGE_SELECTED_TAB = "CHANGE_SELECTED_TAB"
export const CHANGE_VIEW_PAGENUMBER = "CHANGE_VIEW_PAGENUMBER"

export const changeAdminMode = mode => ({
  type: CHANGE_ADMIN_MODE,
  mode
})

export const changeCanSave = value => ({
  type: CHANGE_CAN_SAVE,
  value
})

export const changeSelectedTab = tab => ({
  type: CHANGE_SELECTED_TAB,
  tab
})

export const changeViewPageNumber = page => ({
  type: CHANGE_VIEW_PAGENUMBER,
  page
})
