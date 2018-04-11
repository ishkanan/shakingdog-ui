
import PropTypes from "prop-types";
import React, { Component } from "react";


export default class Redirecter extends Component {

  static propTypes = {
    // Message
    message: PropTypes.string.isRequired,
    // URL
    url: PropTypes.string.isRequired
  };

  componentDidMount() {
    // redirect AFTER render
    window.location.replace(this.props.url);
  }

  render() {
    return (
      <div className="box">
        <nav className="level">
          <div className="level-item">
            <h2 className="title is-2">{this.props.message}</h2>
          </div>
        </nav>
        <nav className="level">
          <div className="level-item">
            <h4 className="subtitle is-4">Just a moment!</h4>
          </div>
        </nav>
      </div>
    );
  }

}
