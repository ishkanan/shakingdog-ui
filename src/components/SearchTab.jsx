
import PropTypes from "prop-types"
import React from "react"

import SearchControls from "../containers/SearchControls.jsx"
import SearchResults from "../containers/SearchResults.jsx"


const SearchTab = () => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        <SearchControls />
      </div>
      <div className="column">
        <SearchResults />
      </div>
    </div>
  )
}

export default SearchTab
