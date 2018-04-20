
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
      dog: {
        gender: "U",
        name: "",
        shakingdogstatus: "",
        cecsstatus: "unknown"
      }
    },
    newlitter: {
      sire: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "",
          cecsstatus: "unknown"
        }
      },
      dam: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "",
          cecsstatus: "unknown"
        }
      },
      children: []
    },
    testresult: {
      acceptedStatuses: null,
      selected: null,
      sire: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "",
          cecsstatus: "unknown"
        }
      },
      dam: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "",
          cecsstatus: "unknown"
        }
      }
    }
  },
  ui: {
    adminMode: "newdog",
    error: null,
    searchMode: "single",
    selectedTab: "search",
    selectedSire: null,
    selectedDam: null
  }
}

export default initialState
