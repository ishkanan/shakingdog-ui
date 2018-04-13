
export const CHANGE_SELECTED_SIRE = "CHANGE_SELECTED_SIRE"
export const CHANGE_SELECTED_DAM = "CHANGE_SELECTED_DAM"


export const changeSelectedSire = sireId => ({
  type: CHANGE_SELECTED_SIRE,
  sireId
})

export const changeSelectedDam = damId => ({
  type: CHANGE_SELECTED_DAM,
  damId
})
