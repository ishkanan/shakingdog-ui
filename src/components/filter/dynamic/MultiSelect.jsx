
import PropTypes from "prop-types";
import React from "react";

import "./dynamic.css";
import KeyedSelectable from "../../generic/KeyedSelectable.jsx";


export default class MultiSelect extends React.Component {

  static propTypes = {
    // Unique entry key
    id: PropTypes.number,
    // Aggregator word when chaining selects
    aggregator: PropTypes.string,
    // Selectable values
    selectables: PropTypes.array,
    // List of selected values
    selectedValues: PropTypes.array,
    // Callback whenever state changes
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onValueAdd = this.onValueAdd.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueRemove = this.onValueRemove.bind(this);
  }

  onValueAdd(e) {
    e.preventDefault();
    this.props.flux.getActions("filter").addSelectedValue(
      this.props.id,
      this.props.selectables[0]);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  onValueChange(index, e) {
    this.props.flux.getActions("filter").changeValue(
      this.props.id,
      index,
      e.target.value);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  onValueRemove(index, e) {
    e.preventDefault();
    this.props.flux.getActions("filter").removeSelectedValue(
      this.props.id,
      index);
    if (this.props.onChange !== undefined)
      this.props.onChange();
  }

  render() {
    var keyedSelectables = this.props.selectables.map(s => ({
      display: s,
      key: s
    }));

    return (
      <React.Fragment>
        {this.props.selectedValues.map((selValue, selIndex) =>
        <React.Fragment key={selIndex}>
          {selIndex > 0 &&
          <span>{this.props.aggregator}</span>
          }
          <KeyedSelectable options={keyedSelectables}
                           selected={selValue}
                           onChange={(e) => this.onValueChange(selIndex, e)}
                           divClass="select is-small" />
          {selIndex > 0 &&
          <a className="button is-small" onClick={(e) => this.onValueRemove(selIndex, e)}>
            <span className="icon is-small">
              <i className="fas fa-minus-circle"></i>
            </span>
          </a>
          }
        </React.Fragment>
        )}
        <a className="button is-small" onClick={this.onValueAdd}>
          <span className="icon is-small">
            <i className="fas fa-plus-circle"></i>
          </span>
        </a>
      </React.Fragment>
    );
  }

}
