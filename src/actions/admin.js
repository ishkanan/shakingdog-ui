
export const CHANGE_NEWDOG_GENDER = "CHANGE_NEWDOG_GENDER"
export const CHANGE_NEWDOG_NAME = "CHANGE_NEWDOG_NAME"
export const CHANGE_NEWDOG_SHAKINGDOGSTATUS = "CHANGE_NEWDOG_SHAKINGDOGSTATUS"

export const changeNewDogName = name => ({
  type: CHANGE_NEWDOG_NAME,
  name
})

export const changeNewDogGender = gender => ({
  type: CHANGE_NEWDOG_GENDER,
  gender
})

export const changeNewDogShakingDogStatus = status => ({
  type: CHANGE_NEWDOG_SHAKINGDOGSTATUS,
  status
})
