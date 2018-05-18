
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

// mapping from error codes to UI messages
export const errorCodeUIMap = {
  1: "Dog already exists",
  2: "Both parents required",
  3: "Dog is already a parent",
  400: "Bad request",
  403: "Forbidden",
  404: "Not found",
  500: "Server error"
}

// mapping from DB values to UI caption
export const genderUIMap = {
  "D": "D",
  "B": "B",
  "U": "Unknown"
}

// mapping from notification type to CSS class
export const notificationTypeUIMap = {
  "success": {notifyClass: "is-success", iconClass: "fa-check-circle"},
  "failure": {notifyClass: "is-danger", iconClass: "fa-times-circle"},
  "warning": {notifyClass: "is-warning", iconClass: "fa-exclamation-circle"}
}

const dogOK = (name, gender, shakingdogstatus, cecsstatus) => {
  return (
    !isNilOrEmptyString(name) &&
    !isNilOrEmptyString(gender) &&
    !isNilOrEmptyString(shakingdogstatus) &&
    !isNilOrEmptyString(cecsstatus)
  )
}

export const canSaveNewDog = (dog, setParents, sire, dam) => {
  return (
    dogOK(dog.get("name"), dog.get("gender"), dog.get("shakingdogstatus"), dog.get("cecsstatus")) &&
    (!setParents ? true : !_.isNil(sire) && dogOK(sire.get("name"), sire.get("gender"), sire.get("shakingdogstatus"), sire.get("cecsstatus"))) &&
    (!setParents ? true : !_.isNil(dam) && dogOK(dam.get("name"), dam.get("gender"), dam.get("shakingdogstatus"), dam.get("cecsstatus")))
  )
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

export const canSaveUpdateDog = (dogId, name, gender) => {
  return !_.isNil(dogId) && !isNilOrEmptyString(name) && !isNilOrEmptyString(gender)
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
