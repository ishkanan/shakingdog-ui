
export const CHANGE_ADMIN_MODE = "CHANGE_ADMIN_MODE"
export const CHANGE_CAN_SAVE = "CHANGE_CAN_SAVE"
export const CHANGE_CAN_SEARCH = "CHANGE_CAN_SEARCH"
export const CHANGE_SEARCH_MODE = "CHANGE_SEARCH_MODE"
export const CHANGE_SELECTED_DAM = "CHANGE_SELECTED_DAM"
export const CHANGE_SELECTED_SIRE = "CHANGE_SELECTED_SIRE"
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

export const changeCanSearch = value => ({
  type: CHANGE_CAN_SEARCH,
  value
})

export const changeSearchMode = mode => ({
  type: CHANGE_SEARCH_MODE,
  mode
})

export const changeSelectedDam = damId => ({
  type: CHANGE_SELECTED_DAM,
  damId
})

export const changeSelectedSire = sireId => ({
  type: CHANGE_SELECTED_SIRE,
  sireId
})

export const changeSelectedTab = tab => ({
  type: CHANGE_SELECTED_TAB,
  tab
})

export const changeViewPageNumber = page => ({
  type: CHANGE_VIEW_PAGENUMBER,
  page
})
