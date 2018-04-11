
import FluxComponent from "flummox/component";
import PropTypes from "prop-types";
import React from "react";

import "./filter.css";
import DynamicEntries from "./dynamic/DynamicEntries.jsx";
import TenantAndRangePicker from "./TenantAndRangePicker.jsx";


export default class Filter extends React.Component {

  static propTypes = {
    // Full FilterDataStore state
    filterState: PropTypes.object,
    // Full ResultsDataStore state
    resultsState: PropTypes.object,
    // Shared Flux instance
    flux: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    /*
     * Fired whenever any filter state changes.
     * This hook fires AFTER all actions are processed.
    */
    var state = this.props.flux.getStore("filter").getState();

    // it doesn't make sense in the UI to show a record count if
    // there are no tenants in the drop-down list
    if (state.tenants.list.length > 0) {
      this.props.flux.getActions("search").getRecordCounts(
        state.tenants.selected,
        state.startDate,
        state.endDate,
        state.entries);
    }
  }

  render() {
    return ([
      <FluxComponent key="tenant-range-picker"
                     flux={this.props.flux}>
        <TenantAndRangePicker tenants={this.props.filterState.tenants}
                              startDate={this.props.filterState.startDate}
                              endDate={this.props.filterState.endDate}
                              minDate={this.props.filterState.tenants.minDate}
                              maxDate={this.props.filterState.tenants.maxDate}
                              recordCount={this.props.resultsState.counts.length == 0 ? -1 : this.props.resultsState.counts[0]}
                              recordCounting={this.props.resultsState.counting}
                              onChange={this.onChange} />
      </FluxComponent>,
      <nav className="filter-entries-container" key="dynamic-entries">
        <FluxComponent flux={this.props.flux}>
          <DynamicEntries tenants={this.props.filterState.tenants}
                          startDate={this.props.filterState.startDate}
                          endDate={this.props.filterState.endDate}
                          columns={this.props.filterState.columns}
                          entries={this.props.filterState.entries}
                          recordCounts={this.props.resultsState.counts.slice(1)}
                          recordCounting={this.props.resultsState.counting}
                          onChange={this.onChange} />
        </FluxComponent>
      </nav>
    ]);
  }

}
