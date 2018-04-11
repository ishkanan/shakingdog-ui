
import deepmerge from "deepmerge";
import { Store } from "flummox";
import _ from "lodash";
import moment from "moment";

import { saveStateToAnchor, saveAnchorToCookie } from "../../data/context.js";
import { doArrayReplace } from "../../util.js";


const BLANK_ENTRY = {
  id: null,
  displayName: null,
  key: null,
  type: null,
  operators: [],
  selectables: [],
  selected: {
    operator: null,
    values: []
  },
  valid: false
};

// maps tenant keys to displayable names
const TENANT_NAME_MAP = {
  acma: "ACMA",
  amex: "AMEX",
  ato: "Australian Tax Office",
  bigpondmovies: "Bigpond Movies",
  choicenz: "Choice NZ",
  coles: "Coles",
  digitalhelpdesk: "Salmat Digital Help Desk",
  diis: "DIIS",
  flybuys: "FlyBuys",
  inlandrevenue: "Inland Revenue",
  medibank: "Medibank",
  meridianenergy: "Meridian Energy",
  nzdirect: "NZ Direct",
  onepath: "OnePath",
  origin: "Origin",
  panasonic: "Panasonic",
  ptv: "Public Transport Victoria",
  qrt: "QRT",
  salmatactive: "Salmat Active",
  salmatldn: "Salmat LDN",
  sony: "Sony",
  telechoice: "Telechoice",
  telstrabusinessawards: "Telstra Business Awards",
  thorn: "Thorn",
  vodafoneau: "Vodafone AU",
  vodafonenz: "Vodafone NZ",
  woolworths: "Woolworths",
}

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
  irdnumber: "IRD Number",
  lastaction: "Kana Last Action",
  outcome: "Outcome",
  pcscompletioncode: "Dialler Code",
  reason: "Reason",
  salmatid: "Salmat ID",
  workmode: "Workmode"
}

export default class FilterDataStore extends Store {

  static assignState(oldState, newState) {
    /*
     * Updates allValid value on every state update.
     * Note: deepmerge messes with "moment" objects so we stick to
     *       ISO representations
    */
    var ret = (oldState === undefined ?
      newState : 
      deepmerge(oldState, newState, {arrayMerge: doArrayReplace}));
    ret.allValid = FilterDataStore.checkAllValid(ret);
    return ret
  }

  static checkAllValid(state) {
    /*
     * Checks if current filter values are valid enough to perform a search.
     * Also sets the "valid" flag on each dynamic entry.
    */
    if (state.tenants.selected === "")
      return false;
    if (moment(state.startDate) > moment(state.endDate))
      return false;
    return state.entries.reduce((acc, entry) => {
      entry.valid = FilterDataStore.checkEntryValid(entry);
      return acc && entry.valid;
    }, true);
  }

  static checkEntryValid(entry) {
    /*
     * Checks if a dynamic entry is valid enough to perform for a search.
    */
    var result = (entry.selected.operator !== "");
    if (entry.type === "text")
      return result && (entry.selected.values[0] !== "");
    else if (entry.type === "number")
      return result && !isNaN(_.parseInt(entry.selected.values[0]));
    else if (entry.type === "select")
      return result && _.every(entry.selected.values, value => value !== "");
    else
      return false;
  }

  constructor(flux, initState = {}) {
    super();

    const filterActionIds = flux.getActionIds("filter");
    const searchActionIds = flux.getActionIds("search");

    // register synchronous actions
    this.register(filterActionIds.changeOperator, this.onChangeOperator);
    this.register(filterActionIds.addSelectedValue, this.onAddSelectedValue);
    this.register(filterActionIds.changeValue, this.onChangeValue);
    this.register(filterActionIds.removeSelectedValue, this.onRemoveSelectedValue);
    this.register(filterActionIds.addEntry, this.onAddEntry);
    this.register(filterActionIds.changeSelectedColumn, this.onChangeSelectedColumn);
    this.register(filterActionIds.removeEntry, this.onRemoveEntry);
    this.register(filterActionIds.changeSelectedTenant, this.onChangeSelectedTenant);
    this.register(filterActionIds.changeStartDate, this.onChangeStartDate);
    this.register(filterActionIds.changeEndDate, this.onChangeEndDate);
    
    // register asynchronous (API-bound) actions
    this.registerAsync(filterActionIds.getTenants,
      this.onGetTenantsBegin,
      this.onGetTenantsSuccess,
      this.onGetTenantsFailure);
    this.registerAsync(filterActionIds.getColumns,
      this.onGetColumnsBegin,
      this.onGetColumnsSuccess,
      this.onGetColumnsFailure);
    this.registerAsync(searchActionIds.doSearch,
      this.onDoSearchBegin);

    // bind utility functions
    this.getState = this.getState.bind(this);
    this._nextEntryId = this._nextEntryId.bind(this);
    this._newEntryFromColumn = this._newEntryFromColumn.bind(this);
    this._newEntryFromUrlEntry = this._newEntryFromUrlEntry.bind(this);

    // some initial state can be set externally
    this.state = {
      tenants: {
        fetching: false,
        selected: "",
        list: [],
        minDate: moment("20100101").toJSON(),
        maxDate: moment().endOf("day").toJSON(),
      },
      columns: {
        fetching: false,
        selected: "",
        list: []
      },
      startDate: moment("20100101").toJSON(),
      endDate: moment().endOf("day").toJSON(),
      entries: [],
      allValid: false,
      redirect: null
    };
    try {
      this.setState({
        tenants: {selected: (initState.tenant !== undefined ? initState.tenant : "")},
        startDate: (initState.start !== undefined ? moment(initState.start).toJSON() : this.state.startDate),
        endDate: (initState.end !== undefined ? moment(initState.end).toJSON() : this.state.endDate),
        entries: (initState.dynamics !== undefined ? initState.dynamics.map(this._newEntryFromUrlEntry) : [])
      });
    }
    catch (err) {
      console.warn("FilterDataStore: Initial state error", err);
    }
  }

  getState() {
    // Only used in index.jsx
    return this.state;
  }

  // Utility functions

  _nextEntryId() {
    var usedIds = _.map(this.state.entries, (entry) => entry.Id);
    do {
      var id = _.random(5000000);
    } while (_.find(usedIds, id) == id);
    return id;
  }

  _newEntryFromColumn(column) {
    // returns a new entry with values from a fetched column
    return deepmerge(BLANK_ENTRY, {
      id: this._nextEntryId(),
      displayName: column.displayName,
      key: column.key,
      type: column.type,
      operators: column.operators,
      selectables: column.selectables,
      selected: {
        operator: column.operators[0],
        values: [(column.type === "select" ? column.selectables[0] : "")]
      }
    });
  }

  _newEntryFromUrlEntry(entry) {
    // returns a new entry with best-effort values from a URL entry
    // these will not be rendered until the remaining values are filled in
    // (after column information is fetched from the API server)
    return deepmerge(BLANK_ENTRY, {
      id: this._nextEntryId(),
      key: entry.name,
      selected: {
        operator: entry.op,
        values: entry.values
      }
    });
  }

  // MultiSelect and SingleInput

  onChangeOperator(payload) {
    var entry = _.find(this.state.entries, ["id", payload.entryId]);
    entry.selected.operator = payload.operator;
    this.setState({entries: this.state.entries});
  }

  onAddSelectedValue(payload) {
    // "select" type only
    var entry = _.find(this.state.entries, ["id", payload.entryId]);
    entry.selected.values = entry.selected.values.concat(payload.value);
    this.setState({entries: this.state.entries});
  }

  onChangeValue(payload) {
    var entry = _.find(this.state.entries, ["id", payload.entryId]);
    entry.selected.values[payload.index] = payload.value;
    this.setState({entries: this.state.entries});
  }

  onRemoveSelectedValue(payload) {
    // "select" type only
    var entry = _.find(this.state.entries, ["id", payload.entryId]);
    entry.selected.values.splice(payload.index, 1);
    this.setState({entries: this.state.entries});
  }

  // DynamicEntries

  onAddEntry() {
    var column = _.find(this.state.columns.list, ["key", this.state.columns.selected]);
    if (column === null)
      return;
    this.setState({
      entries: this.state.entries.concat(this._newEntryFromColumn(column))
    });
  }

  onChangeSelectedColumn(payload) {
    this.setState({columns: {selected: payload.value}});
  }

  onRemoveEntry(payload) {
    var entry = _.find(this.state.entries, ["id", payload.entryId]);
    this.setState({entries: _.without(this.state.entries, entry)});
  }

  // TenantAndRangePicker

  onChangeSelectedTenant(payload) {
    var selectedTenant = _.find(this.state.tenants.list, ["key", payload.value]);

    // shift selected dates (if necessary) to within the min/max bounds
    var startDate = moment.max(
      moment.min(
        moment(this.state.startDate),
        moment(selectedTenant.maxdate)
      ),
      moment(selectedTenant.mindate)
    ).toJSON();
    var endDate = moment.min(
      moment.max(
        moment(this.state.endDate),
        moment(selectedTenant.mindate)
      ),
      moment(selectedTenant.maxdate)
    ).toJSON();

    // and set state
    this.setState({
      tenants: {
        selected: payload.value,
        minDate: selectedTenant.mindate,
        maxDate: selectedTenant.maxdate
      },
      entries: [],
      startDate: startDate,
      endDate: endDate
    });
  }

  onChangeStartDate(payload) {
    var selectedTenant = _.find(this.state.tenants.list, ["key", this.state.tenants.selected]);
    
    // ensure start date stays within the min/max bounds
    var startDate = moment.max(
      moment.min(
        moment(payload.value),
        moment(selectedTenant.maxdate)
      ),
      moment(selectedTenant.mindate)
    ).toJSON();
    
    // ensure end date is never less than start date
    var endDate = moment.max(
      moment(startDate),
      moment(this.state.endDate)
    ).toJSON();

    // and set state
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  }

  onChangeEndDate(payload) {
    var selectedTenant = _.find(this.state.tenants.list, ["key", this.state.tenants.selected]);
    
    // ensure end date stays within the min/max bounds
    var endDate = moment.min(
      moment.max(
        moment(payload.value),
        moment(selectedTenant.mindate)
      ),
      moment(selectedTenant.maxdate)
    ).toJSON();
    
    // ensure start date is never greater than end date
    var startDate = moment.min(
      moment(endDate),
      moment(this.state.startDate)
    ).toJSON();

    // and set state
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  }

  // App

  onDoSearchBegin() {
    // save certain filter criteria to anchor for link sharing
    saveStateToAnchor({
      filter: {
        tenant: this.state.tenants.selected,
        start: this.state.startDate,
        end: this.state.endDate,
        dynamics: this.state.entries.map(entry => {
          return {
            name: entry.key,
            op: entry.selected.operator,
            values: entry.selected.values
          }
        })
      }
    });
  }

  // Tenant API

  onGetTenantsBegin() {
    this.setState({
      tenants: {
        fetching: true,
        list: []
    }});
  }

  onGetTenantsSuccess(payload) {
    // slight manipulations to returned data
    _.each(payload.data.tenants, tenant => {
      tenant.displayName = (TENANT_NAME_MAP[tenant.key] !== undefined ? TENANT_NAME_MAP[tenant.key] : tenant.key)
    });
    payload.data.tenants = _.sortBy(payload.data.tenants, ["displayName"]);

    // determine selected tenant
    var selectedTenant = payload.data.tenants.reduce((acc, p) => {
      return (this.state.tenants.selected === p.key ? p : acc)
    }, payload.data.tenants[0]);

    // shift selected dates (if necessary) to within the min/max bounds
    var startDate = moment.max(
      moment.min(
        moment(this.state.startDate),
        moment(selectedTenant.maxdate)
      ),
      moment(selectedTenant.mindate)
    ).toJSON();
    var endDate = moment.min(
      moment.max(
        moment(this.state.endDate),
        moment(selectedTenant.mindate)
      ),
      moment(selectedTenant.maxdate)
    ).toJSON();

    // and set state
    this.setState({
      startDate: startDate,
      endDate: endDate,
      tenants: {
        fetching: false,
        list: payload.data.tenants,
        selected: selectedTenant.key,
        minDate: selectedTenant.mindate,
        maxDate: selectedTenant.maxdate
    }});
  }

  onGetTenantsFailure(error) {
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

    console.error("onGetTenantsFailure:", error);
    this.setState({tenants: {fetching: false}});
  }

  // Column API

  onGetColumnsBegin() {
    this.setState({
      columns: {
        fetching: true,
        list: []
    }});
  }

  onGetColumnsSuccess(payload) {
    // slight manipulations to returned data
    _.each(payload.data.columns, column => {
      column.displayName = (COLUMN_NAME_MAP[column.key] !== undefined ? COLUMN_NAME_MAP[column.key] : column.key)
      if (column.selectables !== null) {
        column.selectables = _.sortBy(column.selectables, [s => s]);
      }
    });
    payload.data.columns = _.sortBy(payload.data.columns, ["displayName"]);

    // update partial entries that were set from initial state
    var entries = this.state.entries.map(entry => {
      var column = _.find(payload.data.columns, ["key", entry.key]);
      return (column === null ? entry : deepmerge(entry, {
        displayName: column.displayName,
        type: column.type,
        operators: column.operators,
        selectables: column.selectables
      }));
    });

    // and set state
    this.setState({
      entries: entries,
      columns: {
        fetching: false,
        list: payload.data.columns,
        selected: payload.data.columns[0].key
    }});
  }
  
  onGetColumnsFailure(error) {
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

    console.error("onGetColumnsFailure:", error);
    this.setState({columns: {fetching: false}});
  }

}
