
const initialState = {
  auth: {
    redirect: {
      initiate: false,
      message: null,
      url: null
    }
  },
  data: {
    dogs: {
      isFetching: false,
      list: null
    },
    dogReport: {
      isFetching: false,
      dog: null,
      familyAsChild: null,
      familiesAsParent: null
    },
    couplesReport: {
      isFetching: false,
      sire: null,
      dam: null,
      children: null
    }
  },
  search: {
    mode: "single"
  },
  ui: {
    selectedTab: "search",
    selectedSire: null,
    selectedDam: null
  }
}

export default initialState
