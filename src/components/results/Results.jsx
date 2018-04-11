
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

import "./results.css";
import { config } from "../../app.config";
import HTML5AudioPlayer from "../generic/HTML5AudioPlayer.jsx";
import NoFrillsGridDisplay from "../generic/NoFrillsGridDisplay.jsx";


export default class Results extends React.Component {

  static propTypes = {
    // Full results state
    resultsState: PropTypes.object,
    // Shared Flux instance
    flux: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onListenHideClick = this.onListenHideClick.bind(this);
  }

  onListenHideClick(rowIndex, listening, e) {
    e.preventDefault();
    if (listening) {
      this.props.flux.getActions("results").removeListenRow(
        rowIndex);
    } else {
      this.props.flux.getActions("results").addListenRow(
        rowIndex);
    }
  }

  onMediaError(rowIndex, e) {
    this.props.flux.getActions("results").setListenRowError(
      rowIndex,
      "-- Playback error or recording not found --");
  }

  render() {
    // get the index of the recording column so we can
    // access the playback URL in the row render function
    const recordingColumnIndex = _.findIndex(this.props.resultsState.headers, (header) => {
      return (header === "Recording");
    });

    // generate table headers from column names
    const headers = this.props.resultsState.headers.map(header => {
      return {
        key: (headerIndex) => header,
        render: (header, headerIndex) => {
          return <th key={header}>{(header !== "Recording" ? header : "")}</th>;
        }
      }
    });

    // generate table data
    const data = this.props.resultsState.results.slice(0, config.maxSearchResultsDisplayed).map(row => {
      return {
        render: (renderedData, rowIndex) => {
          // each row can have an optional "render" function that is responsible
          // for the encasing row render (<tr/>). this lets us inject a <tr/>
          // entry for each recording whose "Listen" button has been clicked
          var listenRow = this.props.resultsState.listenRows[rowIndex];
          var ret = [<tr key={rowIndex}>{renderedData}</tr>];
          
          if (listenRow !== undefined) {
            ret.push(
              <tr key={rowIndex.toString()+"-listen"}>
                <td colSpan={renderedData.length}>
                  {listenRow.err === null &&
                  <HTML5AudioPlayer mimeType="audio/mpeg"
                                    playURL={row[recordingColumnIndex]}
                                    onMediaError={(e) => this.onMediaError(rowIndex, e)} />
                  }
                  {listenRow.err !== null &&
                  <p className="results-listen-bar is-size-6 has-text-danger has-text-centered has-text-weight-bold">{listenRow.err}</p>
                  }
                </td>
              </tr>
            );
          }
          return ret;
        },
        data: row.map(datum => {
          return {
            render: (header, rowIndex, datumIndex) => {
              // datum render function

              // database NULLs are returned as '<nil>'
              datum = datum.replace("<nil>", "");

              if (header === "Call Date") {
                // re-format to something prettier
                return <td key={header}>{moment(datum, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY, h:mm A")}</td>;
              } else if (header !== "Recording") {
                // no-frills rendering
                return <td key={header}>{datum}</td>;
              } else {
                // render a listen/hide toggle button
                var listening = _.has(this.props.resultsState.listenRows, rowIndex);
                var listenToggleButton =
                  <a className={listening ? "button is-small is-danger" : "button is-small"} onClick={(e) => this.onListenHideClick(rowIndex, listening, e)}>
                    <span className="icon is-small">
                      <i className="fas fa-headphones"></i>
                    </span>
                  </a>;
                // and render a download button
                var downloadButton =
                  <a className="button is-small" href={datum+"&download"}>
                    <span className="icon is-small">
                      <i className="fas fa-download"></i>
                    </span>
                  </a>;
                return <td key={header}>{listenToggleButton}{downloadButton}</td>;
              }
            }
          } // return
        })
      } // return
    });

    const rawResultsCount = this.props.resultsState.results.length;
    const overflow = (this.props.resultsState.results.length > config.maxSearchResultsDisplayed);

    return ([
      <nav className="level" key="nav">
        <div className="level-left">
          <div className="level-item">
            {rawResultsCount == 0 &&
            <p>No results to display.</p>
            }
            {rawResultsCount > 0 &&
            <p>Found {rawResultsCount} result{rawResultsCount > 1 ? "s" : ""}{overflow ? "" : "."}</p>
            }
            {overflow &&
            <p>, displaying maximum of <u>{data.length}</u>.</p>
            }
          </div>
        </div>
      </nav>,
      <NoFrillsGridDisplay key="grid"
                           headers={headers}
                           data={data}
                           tableClass="results-table" />
    ]);
  }

}
