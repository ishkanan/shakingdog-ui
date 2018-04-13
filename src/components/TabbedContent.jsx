
import PropTypes from "prop-types"
import React from "react"

import Redirecter from "../components/Redirecter.jsx"
import SearchTab from "./SearchTab.jsx"


const TabbedContent = ({redirect, selectedTab, onTabChange}) => {
  // redirect override
  if (redirect !== null) {
    return (
      <Redirecter message={redirect.message}
                  url={redirect.url} />
    )
  }

  // authorised, so render
  return (
    <React.Fragment>
      <div className="tabs is-boxed">
        <ul>
          <li className={(selectedTab === "search" ? "is-active" : "")}>
            <a onClick={(e) => {e.preventDefault(); onTabChange("search")}}>
              <span className="icon is-small"><i className="fas fa-search" aria-hidden="true"></i></span>
              <span>Search / View</span>
            </a>
          </li>
          <li className={(selectedTab === "dataadmin" ? "is-active" : "")}>
            <a onClick={(e) => {e.preventDefault(); onTabChange("dataadmin")}}>
              <span className="icon is-small"><i className="fas fa-pencil-alt" aria-hidden="true"></i></span>
              <span>Data Admin</span>
            </a>
          </li>
        </ul>
      </div>
      {selectedTab === "search" && 
      <SearchTab />
      }
    </React.Fragment>
  )
}

TabbedContent.propTypes = {
  // Redirect state
  redirect: PropTypes.object,
  // Currently selected tab
  selectedTab: PropTypes.string.isRequired,
  // Events
  onTabChange: PropTypes.func.isRequired
}

export default TabbedContent
