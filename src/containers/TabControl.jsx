
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"

import { changeSelectedTab } from "../actions/ui"
import SearchTab from "../components/SearchTab.jsx"
import TabPage from "../components/TabPage.jsx"
import { toJS } from "../data/util.jsx"


const TabControl = ({selectedTab, onTabChange}) => {
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
      <TabPage isVisible={selectedTab === "search"}
               contents={<SearchTab />} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  selectedTab: state.getIn(["ui", "selectedTab"])
})

const mapDispatchToProps = ({
  onTabChange: changeSelectedTab
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(TabControl))
