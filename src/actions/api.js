
import {
  getDogs,
  getDog,
  getFamily,
  getRelationships,
  submitNewDog,
  submitNewGender,
  submitNewLitter,
  submitTestResult
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
export const FETCH_RELATIONSHIPS_BEGIN = "FETCH_RELATIONSHIPS_BEGIN"
export const FETCH_RELATIONSHIPS_SUCCESS = "FETCH_RELATIONSHIPS_SUCCESS"
export const FETCH_RELATIONSHIPS_FAILURE = "FETCH_RELATIONSHIPS_FAILURE"
export const SAVE_NEWDOG_BEGIN = "SAVE_NEWDOG_BEGIN"
export const SAVE_NEWDOG_SUCCESS = "SAVE_NEWDOG_SUCCESS"
export const SAVE_NEWDOG_FAILURE = "SAVE_NEWDOG_FAILURE"
export const SAVE_NEWLITTER_BEGIN = "SAVE_NEWLITTER_BEGIN"
export const SAVE_NEWLITTER_SUCCESS = "SAVE_NEWLITTER_SUCCESS"
export const SAVE_NEWLITTER_FAILURE = "SAVE_NEWLITTER_FAILURE"
export const SAVE_SETGENDER_BEGIN = "SAVE_SETGENDER_BEGIN"
export const SAVE_SETGENDER_SUCCESS = "SAVE_SETGENDER_SUCCESS"
export const SAVE_SETGENDER_FAILURE = "SAVE_SETGENDER_FAILURE"
export const SAVE_TESTRESULT_BEGIN = "SAVE_TESTRESULT_BEGIN"
export const SAVE_TESTRESULT_SUCCESS = "SAVE_TESTRESULT_SUCCESS"
export const SAVE_TESTRESULT_FAILURE = "SAVE_TESTRESULT_FAILURE"

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

// Fetch all relationships

const fetchRelationshipsBegin = () => ({
  type: FETCH_RELATIONSHIPS_BEGIN
})

const fetchRelationshipsSuccess = relationships => ({
  type: FETCH_RELATIONSHIPS_SUCCESS,
  relationships
})

const fetchRelationshipsFailure = (error, auth) => ({
  type: FETCH_RELATIONSHIPS_FAILURE,
  error,
  auth
})

export const fetchRelationships = () => dispatch => {
  dispatch(fetchRelationshipsBegin())
  return getRelationships(
    data => dispatch(fetchRelationshipsSuccess(data.relationships)),
    error => dispatch(fetchRelationshipsFailure(error.error, error.auth))
  )
}

// Save new dog

const saveNewDogBegin = () => ({
  type: SAVE_NEWDOG_BEGIN
})

const saveNewDogSuccess = () => ({
  type: SAVE_NEWDOG_SUCCESS
})

const saveNewDogFailure = (error, auth) => ({
  type: SAVE_NEWDOG_FAILURE,
  error,
  auth
})

export const saveNewDog = (name, gender, shakingdogstatus, cecsstatus) => dispatch => {
  window.scrollTo(0, 0)
  dispatch(saveNewDogBegin())
  return submitNewDog(
    name,
    gender,
    shakingdogstatus,
    cecsstatus,
    data => {
      dispatch(saveNewDogSuccess())
      dispatch(fetchDogs())
    },
    error => dispatch(saveNewDogFailure(error.error, error.auth))
  )
}

// Set gender

const saveSetGenderBegin = () => ({
  type: SAVE_SETGENDER_BEGIN
})

const saveSetGenderSuccess = () => ({
  type: SAVE_SETGENDER_SUCCESS
})

const saveSetGenderFailure = (error, auth) => ({
  type: SAVE_SETGENDER_FAILURE,
  error,
  auth
})

export const saveSetGender = (dogId, gender) => dispatch => {
  window.scrollTo(0, 0)
  dispatch(saveSetGenderBegin())
  return submitNewGender(
    dogId,
    gender,
    data => {
      dispatch(saveSetGenderSuccess())
      dispatch(fetchDogs())
    },
    error => dispatch(saveSetGenderFailure(error.error, error.auth))
  )
}

// Save new litter

const saveNewLitterBegin = () => ({
  type: SAVE_NEWLITTER_BEGIN
})

const saveNewLitterSuccess = () => ({
  type: SAVE_NEWLITTER_SUCCESS
})

const saveNewLitterFailure = (error, auth) => ({
  type: SAVE_NEWLITTER_FAILURE,
  error,
  auth
})

export const saveNewLitter = (sire, dam, children) => dispatch => {
  window.scrollTo(0, 0)
  dispatch(saveNewLitterBegin())
  return submitNewLitter(
    sire,
    dam,
    children,
    data => {
      dispatch(saveNewLitterSuccess())
      dispatch(fetchDogs())
      dispatch(fetchRelationships())
    },
    error => dispatch(saveNewLitterFailure(error.error, error.auth))
  )
}

// Save test result

const saveTestResultBegin = () => ({
  type: SAVE_TESTRESULT_BEGIN
})

const saveTestResultSuccess = () => ({
  type: SAVE_TESTRESULT_SUCCESS
})

const saveTestResultFailure = (error, auth) => ({
  type: SAVE_TESTRESULT_FAILURE,
  error,
  auth
})

export const saveTestResult = (dog, sire, dam) => dispatch => {
  window.scrollTo(0, 0)
  dispatch(saveTestResultBegin())
  return submitTestResult(
    dog,
    sire,
    dam,
    data => {
      dispatch(saveTestResultSuccess())
      dispatch(fetchDogs())
      dispatch(fetchRelationships())
    },
    error => dispatch(saveTestResultFailure(error.error, error.auth))
  )
}
