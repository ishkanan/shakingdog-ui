
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
    },
    newdog: {
      acceptedStatuses: ["Affected", "Carrier", "Clear", "Unknown"],
      dog: null
    },
    newlitter: {
      sire: {
        create: false,
        selected: null,
        dog: null
      },
      dam: {
        create: false,
        selected: null,
        dog: null
      },
      children: null
    },
    testresult: {
      acceptedStatuses: null,
      dog: null,
      sire: {
        create: false,
        selected: null,
        dog: null
      },
      dam: {
        create: false,
        selected: null,
        dog: null
      }
    }
  },
  ui: {
    adminMode: "newdog",
    searchMode: "single",
    selectedTab: "search",
    selectedSire: null,
    selectedDam: null
  }
}

export default initialState
