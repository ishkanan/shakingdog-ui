
import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"


const VerticalMenu = ({items, selectedItem, onItemClick}) => {
  return (
    <aside className="menu">
      <ul className="menu-list">
        {_.map(items, item =>
        <li key={item.id}><a className={selectedItem === item.id ? "is-active" : ""} onClick={(e) => {e.preventDefault(); onItemClick(item.id)}}>{item.value}</a></li>  
        )}
      </ul>
    </aside>
  )
}

VerticalMenu.propTypes = {
  // Menu items
  items: PropTypes.array.isRequired,
  // Selected menu
  selectedItem: PropTypes.string.isRequired,
  // Events
  onItemClick: PropTypes.func.isRequired
}

export default VerticalMenu
