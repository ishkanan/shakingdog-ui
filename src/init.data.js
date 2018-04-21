
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
      lastCreatedId: null,
      dog: {
        gender: "U",
        name: "",
        shakingdogstatus: "Unknown",
        cecsstatus: "Unknown"
      }
    },
    newlitter: {
      sire: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "Unknown",
          cecsstatus: "Unknown"
        }
      },
      dam: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "Unknown",
          cecsstatus: "Unknown"
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
          shakingdogstatus: "Unknown",
          cecsstatus: "Unknown"
        }
      },
      dam: {
        create: false,
        selected: null,
        dog: {
          gender: "U",
          name: "",
          shakingdogstatus: "",
          cecsstatus: "Unknown"
        }
      }
    }
  },
  ui: {
    adminMode: "newdog",
    canSave: false,
    canSearch: false,
    error: null,
    isSaving: false,
    searchMode: "single",
    selectedTab: "search",
    selectedSire: null,
    selectedDam: null
  }
}

export default initialState
