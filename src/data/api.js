
import { sprintf } from "sprintf-js"

import { config } from "../app.config.js"


function checkAuthRedirect(data) {
  if (data.location !== undefined) {
    var error = new Error("AUTH-REDIRECT")
    error.redirectUrl = data.location
    throw error
  }
  return data
}

function checkValidStatus(response) {
  if (response.status != 200) {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return response
}

function genericAsyncFetch(path, success, failure) {
  // initiates an asynchronous GET query to the specified path
  // and fires either a success or failure callback

  return fetch(config.apiUrl + path, {
      credentials: "include"  // send site cookies
    })
    .then(checkValidStatus)
    .then(response => response.json())
    .then(checkAuthRedirect)
    .then(data => success(data))
    .catch(error => {
      failure({
        auth: {
          redirect: {
            initiate: (error.redirectUrl !== undefined),
            url: error.redirectUrl
          }
        },
        error: error
      })
    })
}

function genericAsyncPost(path, data, success, failure) {
  // initiates an asynchronous POST call to the specified path
  // and fires either a success or failure callback

  return fetch(config.apiUrl + path, {
      credentials: "include",  // send site cookies
      body: JSON.stringify(data),
      method: "POST"
    })
    .then(checkValidStatus)
    .then(response => response.json())
    .then(checkAuthRedirect)
    .then(data => success(data))
    .catch(error => {
      failure({
        auth: {
          redirect: {
            initiate: (error.redirectUrl !== undefined),
            url: error.redirectUrl
          }
        },
        error: error
      })
    })
}

export function getDogs(success, failure) {
  return genericAsyncFetch("/api/dogs", success, failure)
}

export function getDog(dogId, success, failure) {
  return genericAsyncFetch(
    sprintf("/api/dog/%s", dogId),
    success,
    failure
  )
}

export function getFamily(sireId, damId, success, failure) {
  return genericAsyncFetch(
    sprintf("/api/family?sireid=%s&damid=%s", sireId, damId),
    success,
    failure
  )
}

export function getRelationships(success, failure) {
  return genericAsyncFetch("/api/relationships", success, failure)
}

export function submitNewDog(name, gender, shakingDogStatus, cecsStatus, success, failure) {
  return genericAsyncPost(
    "/api/admin/dog",
    {
      name: name,
      gender: gender,
      shakingdogstatus: shakingDogStatus,
      cecsstatus: cecsStatus
    },
    success,
    failure
  )
}

export function submitNewLitter(sire, dam, children, success, failure) {
  return genericAsyncPost(
    "/api/admin/litter",
    {
      sire: sire,
      dam: dam,
      children: children
    },
    success,
    failure
  )
}

export function submitTestResult(dog, sire, dam, success, failure) {
  return genericAsyncPost(
    "/api/admin/testresult",
    {
      dog: dog,
      sire: sire,
      dam: dam
    },
    success,
    failure
  )
}
