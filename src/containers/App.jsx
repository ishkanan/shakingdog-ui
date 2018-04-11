
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { changeSelectedTab } from "../actions/app.jsx";
import Redirecter from "../components/Redirecter.jsx";


class App extends Component {

  static propTypes = {
    // entire state tree
    state: PropTypes.object.isRequired,
    // action dispatch function
    dispatch: PropTypes.func.isRequired
  };

  onChangeSelectedTab(e, tab) {
    e.preventDefault();
    dispatch(changeSelectedTab(tab));
  }

  render() {
    // redirect override
    if (this.props.state.redirect !== null) {
      return (
        <div className="container">
          <Redirecter message={this.props.state.redirect.message}
                      url={this.props.state.redirect.url} />
        </div>
      );
    }

    // normal render
    return (
      <div className="container">
        <div className="tabs is-boxed">
          <ul>
            <li className={(this.props.state.ui.selectedTab === "search" ? "is-active" : "")}>
              <a onClick={(e) => this.onChangeSelectedTab(e, "search")}>
                <span class="icon is-small"><i class="fas fa-search" aria-hidden="true"></i></span>
                <span>Search / View</span>
              </a>
            </li>
            <li className={(this.props.state.ui.selectedTab === "dataadmin" ? "is-active" : "")}>
              <a onClick={(e) => this.onChangeSelectedTab(e, "dataadmin")}>
                <span class="icon is-small"><i class="fas fa-pencil-alt" aria-hidden="true"></i></span>
                <span>Data Admin</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps)(App)
