
import deepmerge from "deepmerge";
import { Store } from "flummox";
import _ from "lodash";

import { saveAnchorToCookie } from "../../data/context.js";
import { doArrayReplace } from "../../util.js";


// maps DB column names to displayable names
const COLUMN_NAME_MAP = {
  account: "Account",
  agent: "Agent",
  businessunit: "Business Unit",
  calldate: "Call Date",
  campaign: "Campaign",
  cli: "CLI",
  connid: "Conn ID",
  custom1: "Custom 1",
  custom2: "Custom 2",
  custom3: "Custom 3",
  driver: "Kana Driver",
  id: "ID",
  irdnumber: "IRD Number",
  lastaction: "Kana Last Action",
  outcome: "Outcome",
  pcscompletioncode: "Dialler Code",
  reason: "Reason",
  recording: "Recording",
  salmatid: "Salmat ID",
  workmode: "Workmode"
}

export default class ResultsDataStore extends Store {

  static assignState(oldState, newState) {
    /*
     * Updates allValid value on every state update.
     * Note: deepmerge messes with "moment" objects so we stick to
     *       ISO representations
    */
    var ret = (oldState === undefined ?
      newState : 
      deepmerge(oldState, newState, {arrayMerge: doArrayReplace}));

    // we want to replace (instead of merge) the listenRows
    // object every possible time
    ret["listenRows"] = (newState["listenRows"] !== undefined ? newState["listenRows"] : ret["listenRows"]);
    return ret
  }

  constructor(flux) {
    super();

    const resultsActionIds = flux.getActionIds("results");
    const searchActionIds = flux.getActionIds("search");

    // register synchronous actions
    this.register(resultsActionIds.addListenRow, this.onAddListenRow);
    this.register(resultsActionIds.removeListenRow, this.onRemoveListenRow);
    this.register(resultsActionIds.setListenRowError, this.onSetListenRowError);

    // register asynchronous (API-bound) actions
    this.registerAsync(searchActionIds.doSearch,
      this.onDoSearchBegin,
      this.onDoSearchSuccess,
      this.onDoSearchFailure);
    this.registerAsync(searchActionIds.getRecordCounts,
      this.onGetRecordCountsBegin,
      this.onGetRecordCountsSuccess,
      this.onGetRecordCountsFailure);

    // some initial state can be set externally
    this.state = {
      counts: [],
      counting: false,
      headers: [],
      results: [],
      searching: false,
      redirect: null,
      listenRows: {}
    };
  }

  getState() {
    // Only used by FluxComponent in index.jsx
    return this.state;
  }

  // App

  onDoSearchBegin() {
    this.setState({
      headers: [],
      results: [],
      searching: true,
      listenRows: {}
    });
  }

  onDoSearchSuccess(payload) {
    // slight manipulations to returned data
    _.each(payload.data.results[0], (column, i) => {
      payload.data.results[0][i] = (COLUMN_NAME_MAP[column] !== undefined ? COLUMN_NAME_MAP[column] : column)
    });

    this.setState({
      headers: payload.data.results[0],
      results: payload.data.results.slice(1),
      searching: false
    });
  }
  
  onDoSearchFailure(error) {
    // handle redirect to Okta for auth
    if (error.auth.redirect === true) {
      saveAnchorToCookie();
      this.setState({
        redirect: {
          message: "Redirecting to Okta...",
          url: error.auth.url
      }});
      return;
    }

    console.error("onDoSearchFailure:", error);
    this.setState({searching: false});
  }

  // Record counts API

  onGetRecordCountsBegin() {
    this.setState({
      counts: [],
      counting: true
    });
  }

  onGetRecordCountsSuccess(payload) {
    this.setState({
      counts: payload.data.counts,
      counting: false
    });
  }

  onGetRecordCountsFailure(error) {
    // handle redirect to Okta for auth
    if (error.auth.redirect === true) {
      saveAnchorToCookie();
      this.setState({
        redirect: {
          message: "Redirecting to Okta...",
          url: error.auth.url
      }});
      return;
    }

    console.error("onGetRecordCountsFailure:", error);
    this.setState({counting: false});
  }

  // Results
  onAddListenRow(payload) {
    this.state.listenRows[payload.rowIndex] = payload.data;
    this.setState({listenRows: this.state.listenRows});
  }

  onRemoveListenRow(payload) {
    delete this.state.listenRows[payload.rowIndex];
    this.setState({listenRows: this.state.listenRows});
  }

  onSetListenRowError(payload) {
    this.state.listenRows[payload.rowIndex]["err"] = payload.data.err;
    this.setState({listenRows: this.state.listenRows});
  }

}
