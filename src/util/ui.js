
import _ from "lodash"

import { isNilOrEmptyString } from "./data"


// mapping from DB values to UI caption and CSS class
export const dogStatusUIMap = {
  "Affected": {caption: "Affected", badgeClass: "dogstatus is-affected"},
  "Carrier": {caption: "Carrier", badgeClass: "dogstatus is-carrier"},
  "CarrierByProgeny": {caption: "Carrier By Progeny", badgeClass: "dogstatus is-carrierbyprogeny"},
  "Clear": {caption: "Clear", badgeClass: "dogstatus is-clear"},
  "ClearByParentage": {caption: "Clear By Parentage", badgeClass: "dogstatus is-clearbyparentage"},
  "Unknown": {caption: "Unknown", badgeClass: "dogstatus is-unknown"}
}

// mapping from DB values to UI caption
export const genderUIMap = {
  "D": "D",
  "B": "B",
  "U": "Unknown"
}

const dogOK = (name, gender, shakingdogstatus, cecsstatus) => {
  return (
    !isNilOrEmptyString(name) &&
    !isNilOrEmptyString(gender) &&
    !isNilOrEmptyString(shakingdogstatus) &&
    !isNilOrEmptyString(cecsstatus)
  )
}

export const canSaveNewDog = (name, gender, shakingdogstatus, cecsstatus) => {
  return dogOK(name, gender, shakingdogstatus, cecsstatus)
}

export const canSaveNewLitter = (sire, dam, children) => {
  return (
    !_.isNil(sire) && dogOK(sire.get("name"), sire.get("gender"), sire.get("shakingdogstatus"), sire.get("cecsstatus")) &&
    !_.isNil(dam) && dogOK(dam.get("name"), dam.get("gender"), dam.get("shakingdogstatus"), dam.get("cecsstatus")) &&
    children.reduce(
      (acc, c) => acc && !_.isNil(c) && dogOK(c.get("name"), c.get("gender"), c.get("shakingdogstatus"), c.get("cecsstatus")),
      children.size > 0
    )
  )
}

export const canSaveTestResult = (result, dog, editSire, sire, editDam, dam) => {
  return (
    !isNilOrEmptyString(result) &&
    !_.isNil(dog) && dogOK(dog.get("name"), dog.get("gender"), dog.get("shakingdogstatus"), dog.get("cecsstatus")) &&
    (!editSire ? true : !_.isNil(sire) && dogOK(sire.get("name"), sire.get("gender"), sire.get("shakingdogstatus"), sire.get("cecsstatus"))) &&
    (!editDam ? true : !_.isNil(dam) && dogOK(dam.get("name"), dam.get("gender"), dam.get("shakingdogstatus"), dam.get("cecsstatus")))
  )
}

export const canSearch = (mode, dam, sire) => {
  switch (mode) {
    case "single":
      return (sire !== null)
    case "couple":
      return (sire !== null && dam !== null)
    default:
      return false
  }
}
