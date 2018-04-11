
import FluxComponent from "flummox/component";
import PropTypes from "prop-types";
import React from "react";


export default class SearchControl extends React.Component {

  static propTypes = {
    // Determines if we can search or not
    canSearch: PropTypes.bool,
    // Determines if search in progress
    searching: PropTypes.bool,
    // Selected tenant
    tenant: PropTypes.string,
    // Start date
    startDate: PropTypes.string,
    // End date
    endDate: PropTypes.string,
    // Dynamic entries (if any)
    dynamicEntries: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    if (!this.props.canSearch)
      return;
    this.props.flux.getActions("search").doSearch(
      this.props.tenant,
      this.props.startDate,
      this.props.endDate,
      this.props.dynamicEntries);
  }

  render() {
    return (
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
          {this.props.searching &&
            <a className="button is-info is-rounded is-loading" disabled={true}>Search</a>
          }
          {!this.props.searching &&
            <a className="button is-info is-rounded" disabled={!this.props.canSearch} onClick={this.onClick}>Search</a>
          }
          </div>
        </div>
      </nav>
    );
  }

}
