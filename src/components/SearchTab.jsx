
import PropTypes from "prop-types"
import React, { Component } from "react"

import FilterableDogSelect from "../containers/FilterableDogSelect.jsx"


const SearchTab = () => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        <FilterableDogSelect />
      </div>
      <div className="column">
        Search results
      </div>
    </div>
  )
}

export default SearchTab
