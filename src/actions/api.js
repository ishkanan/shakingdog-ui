
import {
  getDogs,
  getDog,
  getFamily,
  submitNewDog
} from "../data/api"


export const FETCH_DOGS_BEGIN = "FETCH_DOGS_BEGIN"
export const FETCH_DOGS_SUCCESS = "FETCH_DOGS_SUCCESS"
export const FETCH_DOGS_FAILURE = "FETCH_DOGS_FAILURE"
export const FETCH_DOG_BEGIN = "FETCH_DOG_BEGIN"
export const FETCH_DOG_SUCCESS = "FETCH_DOG_SUCCESS"
export const FETCH_DOG_FAILURE = "FETCH_DOG_FAILURE"
export const FETCH_FAMILY_BEGIN = "FETCH_FAMILY_BEGIN"
export const FETCH_FAMILY_SUCCESS = "FETCH_FAMILY_SUCCESS"
export const FETCH_FAMILY_FAILURE = "FETCH_FAMILY_FAILURE"
export const SAVE_NEWDOG_BEGIN = "SAVE_NEWDOG_BEGIN"
export const SAVE_NEWDOG_SUCCESS = "SAVE_NEWDOG_SUCCESS"
export const SAVE_NEWDOG_FAILURE = "SAVE_NEWDOG_FAILURE"

// Fetch all dogs

const fetchDogsBegin = () => ({
  type: FETCH_DOGS_BEGIN
})

const fetchDogsSuccess = dogs => ({
  type: FETCH_DOGS_SUCCESS,
  dogs
})

const fetchDogsFailure = (error, auth) => ({
  type: FETCH_DOGS_FAILURE,
  error,
  auth
})

export const fetchDogs = () => dispatch => {
  dispatch(fetchDogsBegin())
  return getDogs(
    data => dispatch(fetchDogsSuccess(data.dogs)),
    error => dispatch(fetchDogsFailure(error.error, error.auth))
  )
}

// Fetch single dog

const fetchDogBegin = () => ({
  type: FETCH_DOG_BEGIN
})

const fetchDogSuccess = (dog, familyAsChild, familiesAsParent) => ({
  type: FETCH_DOG_SUCCESS,
  dog,
  familyAsChild,
  familiesAsParent
})

const fetchDogFailure = (error, auth) => ({
  type: FETCH_DOG_FAILURE,
  error,
  auth
})

export const fetchDog = dogId => dispatch => {
  dispatch(fetchDogBegin())
  return getDog(
    dogId,
    data => dispatch(fetchDogSuccess(data.dog, data.familyaschild, data.familiesasparent)),
    error => dispatch(fetchDogFailure(error.error, error.auth))
  )
}

// Fetch particular family

const fetchFamilyBegin = () => ({
  type: FETCH_FAMILY_BEGIN
})

const fetchFamilySuccess = (sire, dam, children) => ({
  type: FETCH_FAMILY_SUCCESS,
  sire,
  dam,
  children
})

const fetchFamilyFailure = (error, auth) => ({
  type: FETCH_FAMILY_FAILURE,
  error,
  auth
})

export const fetchFamily = (sireId, damId) => dispatch => {
  dispatch(fetchFamilyBegin())
  return getFamily(
    sireId,
    damId,
    data => dispatch(fetchFamilySuccess(data.sire, data.dam, data.children)),
    error => dispatch(fetchFamilyFailure(error.error, error.auth))
  )
}

// Save new dog

const saveNewDogBegin = () => ({
  type: SAVE_NEWDOG_BEGIN
})

const saveNewDogSuccess = (dogId) => ({
  type: SAVE_NEWDOG_SUCCESS,
  dogId
})

const saveNewDogFailure = (error, auth) => ({
  type: SAVE_NEWDOG_FAILURE,
  error,
  auth
})

export const saveNewDog = (name, gender, shakingdogstatus, cecsstatus) => dispatch => {
  dispatch(saveNewDogBegin())
  return submitNewDog(
    name,
    gender,
    shakingdogstatus,
    cecsstatus,
    data => dispatch(saveNewDogSuccess(data.dogId)),
    error => dispatch(saveNewDogFailure(error.error, error.auth))
  )
}
