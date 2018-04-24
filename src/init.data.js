
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
    relationships: {
      isFetching: false,
      list: null
    },
    newdog: {
      lastCreatedId: null,
      dog: {
        id: null,
        gender: "U",
        name: "",
        shakingdogstatus: "Unknown",
        cecsstatus: "Unknown"
      }
    },
    newlitter: {
      sire: {
        mode: "search",
        selected: null,
        dog: {
          id: null,
          gender: "D",
          name: "",
          shakingdogstatus: "Unknown",
          cecsstatus: "Unknown"
        }
      },
      dam: {
        mode: "search",
        selected: null,
        dog: {
          id: null,
          gender: "B",
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
        mode: "search",
        selected: null,
        dog: {
          id: null,
          gender: "U",
          name: "",
          shakingdogstatus: "Unknown",
          cecsstatus: "Unknown"
        }
      },
      dam: {
        mode: "search",
        selected: null,
        dog: {
          id: null,
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
