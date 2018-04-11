
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import KeyedSelectable from "../generic/KeyedSelectable.jsx";


export default class TenantAndRangePicker extends React.Component {

  static propTypes = {
    // Full tenants state
    tenants: PropTypes.object,
    // Query range start date/time
    startDate: PropTypes.string,
    // Query range end date/time
    endDate: PropTypes.string,
    // First recording date for selected tenant 
    minDate: PropTypes.string,
    // Last recording date for selected tenant 
    maxDate: PropTypes.string,
    // Number of results for tenant/date values
    recordCount: PropTypes.number,
    // Indicates if counting is in progress
    recordCounting: PropTypes.bool,
    // Callback whenever state changes
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onFetchTenants = this.onFetchTenants.bind(this);
    this.onTenantChange = this.onTenantChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
  }

  onFetchTenants(e) {
    // invoked when the user clicks the "!" to retry tenant fetch
    // if it error'd out on the last attempt
    
    e.preventDefault();
    this.props.flux.getActions("filter").getTenants().then(() => {
      // on success, refresh the columns data for the selected tenant
      var newState = this.props.flux.getStore("filter").getState();
      return this.props.flux.getActions("filter").getColumns(
        newState.tenants.selected,
        newState.tenants.minDate,
        newState.tenants.maxDate
      )}).then(() => {
      if (this.props.onChange !== undefined)
        this.props.onChange();
    });
  }
  
  onTenantChange(e) {
    this.props.flux.getActions("filter").changeSelectedTenant(
      e.target.value);
    // refresh the columns data for the selected tenant
    var newState = this.props.flux.getStore("filter").getState();
    this.props.flux.getActions("filter").getColumns(
      newState.tenants.selected,
      newState.tenants.minDate,
      newState.tenants.maxDate
    ).then(() => {
      if (this.props.onChange !== undefined)
        this.props.onChange();
    });
  }

  onStartChange(value) {
    this.props.flux.getActions("filter").changeStartDate(
      value.toJSON());
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  onEndChange(value) {
    this.props.flux.getActions("filter").changeEndDate(
      value.toJSON());
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  render() {
    var keyedOptions = this.props.tenants.list.map(p => ({
      display: p.displayName,
      key: p.key
    }));

    return (
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <KeyedSelectable options={keyedOptions}
                             selected={this.props.tenants.selected}
                             onChange={this.onTenantChange}
                             divClass="select is-small" />
            {this.props.tenants.fetching === true &&
              <span className="icon has-text-info">
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
            }
            {this.props.tenants.fetching === false && this.props.tenants.list.length == 0 &&
            <a className="button is-small is-warning" onClick={this.onFetchTenants}>
              <span className="icon is-small">
                <i className="fas fa-exclamation-circle"></i>
              </span>
            </a>
            }
          </div>
          <div className="level-item">
            <p className="has-text-weight-bold">between</p>
          </div>
          <div className="level-item">
            <DatePicker
              selected={moment(this.props.startDate)}
              onChange={this.onStartChange}
              minDate={moment(this.props.minDate)}
              maxDate={moment(this.props.maxDate)}
              dateFormat="DD-MMM-YYYY HH:mm"
              showMonthDropdown
              showYearDropdown
              showWeekNumbers
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dropdownMode="select"
              popperPlacement="bottom"
              className="input is-small" />
          </div>
          <div className="level-item">
            <p className="has-text-weight-bold">and</p>
          </div>
          <div className="level-item">
            <DatePicker
              selected={moment(this.props.endDate)}
              onChange={this.onEndChange}
              minDate={moment(this.props.minDate)}
              maxDate={moment(this.props.maxDate)}
              dateFormat="DD-MMM-YYYY HH:mm"
              showMonthDropdown
              showYearDropdown
              showWeekNumbers
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dropdownMode="select"
              popperPlacement="bottom"
              className="input is-small" />
          </div>
          {!this.props.recordCounting && !_.includes([undefined, -1], this.props.recordCount) &&
          <div className="level-item">
            <span className="tag is-warning is-rounded">
            {this.props.recordCount.toLocaleString()} result{this.props.recordCount !== 1 ? "s" : ""}
            </span>
          </div>
          }
        </div>
      </nav>
    );
  }

}
