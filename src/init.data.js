
const initialState = {
  auth: {
    redirect: {
      initiate: false,
      message: null,
      url: null
    }
  },
  data: {
    auditLog: {
      isFetching: false,
      systemEntries: null,
      userEntries: null
    },
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
      dog: {
        id: null,
        gender: "U",
        name: "",
        shakingdogstatus: "Unknown",
        cecsstatus: "Unknown"
      },
      setParents: false,
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
      dog: {
        mode: "search",
        selected: {
          id: null,
          gender: null,
          name: null,
          shakingdogstatus: null,
          cecsstatus: "Unknown", // change to null if/when we take on CECS
          origshakingdogstatus: null,
          origcecsstatus: null
        },
        dog: {
          id: null,
          gender: "U",
          name: "",
          shakingdogstatus: "Affected",
          cecsstatus: "Unknown"
        }
      },
      sire: {
        edit: false,
        mode: "search",
        selected: null,
        dog: {
          id: null,
          gender: "D",
          name: "",
          shakingdogstatus: "Affected",
          cecsstatus: "Unknown"
        }
      },
      dam: {
        edit: false,
        mode: "search",
        selected: null,
        dog: {
          id: null,
          gender: "B",
          name: "",
          shakingdogstatus: "Affected",
          cecsstatus: "Unknown"
        }
      }
    },
    updatedog: {
      selected: null,
      name: "",
      gender: null
    }
  },
  ui: {
    adminMode: "newdog",
    auditLog: {
      systemPageNumber: 1,
      userPageNumber: 1
    },
    canSave: false,
    isSaving: false,
    notification: {
      admin: {
        save: null
      },
      fetch: null
    },
    search: {
      canSearch: false,
      mode: "single",
      selectedDam: null,
      selectedSire: null
    },
    selectedTab: "view",
    view: {
      pageNumber: 1
    }
  }
}

export default initialState
