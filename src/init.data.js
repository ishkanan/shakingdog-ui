
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
    addtestresult: {
      acceptedStatuses: null,
      dog: 0,
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
