
export const CHANGE_SEARCH_MODE = "CHANGE_SEARCH_MODE"
export const CHANGE_SELECTED_DAM = "CHANGE_SELECTED_DAM"
export const CHANGE_SELECTED_SIRE = "CHANGE_SELECTED_SIRE"
export const CHANGE_SELECTED_TAB = "CHANGE_SELECTED_TAB"

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
