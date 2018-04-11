
import FluxComponent from "flummox/component";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import MultiSelect from "./MultiSelect.jsx";
import KeyedSelectable from "../../generic/KeyedSelectable.jsx";


export default class DynamicEntries extends React.Component {

  static propTypes = {
    // Full tenants state
    tenants: PropTypes.object,
    // Start date (for column fetch retry)
    startDate: PropTypes.string,
    // End date (for column fetch retry)
    endDate: PropTypes.string,
    // Full columns state
    columns: PropTypes.object,
    // Dynamic entry dictionaries
    entries: PropTypes.array,
    // List of results for each entry, cascading down
    recordCounts: PropTypes.array,
    // Indicates if counting is in progress
    recordCounting: PropTypes.bool,
    // Callback whenever state changes
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onColumnChange = this.onColumnChange.bind(this);
    this.onEntryAdd = this.onEntryAdd.bind(this);
    this.onEntryRemove = this.onEntryRemove.bind(this);
    this.onFetchColumns = this.onFetchColumns.bind(this);
    this.onOperatorChange = this.onOperatorChange.bind(this);
    this.onSingleValueChange = this.onSingleValueChange.bind(this);
  }
  
  onColumnChange(e) {
    this.props.flux.getActions("filter").changeSelectedColumn(
      e.target.value);
  }

  onEntryAdd(e) {
    e.preventDefault();
    if (this.props.columns.selected === "")
      return;
    this.props.flux.getActions("filter").addEntry();
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }
  
  onEntryRemove(id, e) {
    e.preventDefault();
    this.props.flux.getActions("filter").removeEntry(
      id);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  onFetchColumns(e) {
    e.preventDefault();
    this.props.flux.getActions("filter").getColumns(
      this.props.tenants.selected,
      this.props.startDate,
      this.props.endDate
    ).then(() => {
      if (this.props.onChange !== undefined)
        this.props.onChange();
    });
  }

  onOperatorChange(id, e) {
    this.props.flux.getActions("filter").changeOperator(
      id,
      e.target.value);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }
  
  onSingleValueChange(id, e) {
    this.props.flux.getActions("filter").changeValue(
      id,
      0,
      e.target.value);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  render() {
    var keyedColumns = this.props.columns.list.map(c => ({
      display: c.displayName,
      key: c.key
    }));
    
    var keyedOperators = (operators) => operators.map(o => ({
      display: o,
      key: o
    }));
    
    var aggregator = (operator) => {
      return {
        "is": "or",
        "is not": "and"
      }[operator];
    };

    // if an entry has no human-readable name, then it is not a complete
    // entry (i.e. restored from URL state) and will not be rendered
    var entries = this.props.entries.map((entry, index) => {
      if (entry.displayName !== null)
        return (
          <tr key={entry.id}>
            <td>
              <a className="button is-small is-danger is-rounded" onClick={(e) => this.onEntryRemove(entry.id, e)}>Remove</a>
            </td>
            <td>
              <p className="has-text-weight-bold">{entry.displayName}</p>
            </td>
            <td>
              <KeyedSelectable options={keyedOperators(entry.operators)}
                               selected={entry.selected.operator}
                               onChange={(e) => this.onOperatorChange(entry.id, e)}
                               divClass="select is-small" />
            </td>
            <td>
            {entry.type === "select" &&
              <FluxComponent flux={this.props.flux}>
                <MultiSelect id={entry.id}
                             aggregator={aggregator(entry.selected.operator)}
                             selectables={entry.selectables}
                             selectedValues={entry.selected.values}
                             onChange={this.props.onChange} />
              </FluxComponent>
            }
            {_.includes(["number", "text"], entry.type) &&
              <input type="text"
                     className="input is-small"
                     value={entry.selected.values[0] !== undefined ? entry.selected.values[0] : ""}
                     onChange={(e) => this.onSingleValueChange(entry.id, e)} />
            }
            </td>
            {!this.props.recordCounting && !_.includes([undefined, -1], this.props.recordCounts[index]) &&
            <td>
              <span className="tag is-warning is-rounded">
              {this.props.recordCounts[index].toLocaleString()} result{this.props.recordCounts[index] !== 1 ? "s" : ""}
              </span>
            </td>
            }
          </tr>
        )
    });

    return ([
      <nav className="level" key="add-filter">
        <div className="level-left">
          <div className="level-item">
            <KeyedSelectable options={keyedColumns}
                             selected={this.props.columns.selected}
                             onChange={this.onColumnChange}
                             divClass="select is-small" />
            {this.props.columns.fetching === true &&
            <span className="icon has-text-info">
              <i className="fas fa-spinner fa-pulse"></i>
            </span>
            }
            {this.props.columns.fetching === false && this.props.columns.list.length == 0 && this.props.tenants.list.length != 0 &&
            <a className="button is-small is-warning" onClick={this.onFetchColumns}>
              <span className="icon is-small">
                <i className="fas fa-exclamation-circle"></i>
              </span>
            </a>
            }
          </div>
          <div className="level-item">
            <a className="button is-small is-success is-rounded" disabled={this.props.columns.selected === ""} onClick={this.onEntryAdd}>Add Filter</a>
          </div>
        </div>
      </nav>,
      <table className="table dynamic-entries-table" key="current-filters">
        <tbody>
        {entries}
        </tbody>
      </table>
    ]);
  }

}
