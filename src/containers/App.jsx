
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Redirecter from "../components/Redirecter.jsx";


class App extends Component {

  static propTypes = {
    // entire state tree
    state: PropTypes.object.isRequired,
    // action dispatch function
    dispatch: PropTypes.func.isRequired
  };

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
