# Shaking Dog / CECS register

State tree:

{
  ui: {
    selectedTab: "search",
    selectedSire: ID,
    selectedDam: ID,
  },
  data: {
    dogs: {
      isFetching: false,
      list: [],
    },
    dogReport: {
      isFetching: false,
      dog: {},
      familyAsChild: {},
      familiesAsParent: [],
    }
    couplesReport: {
      isFetching: false,
      sire: {},
      dam: {},
      children: [],
    }
  },
  auth: {
    redirect: {message, url}
  },
  search: {
    mode: ""
  }
}
