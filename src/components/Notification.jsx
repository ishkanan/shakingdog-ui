
import PropTypes from "prop-types"
import React from "react"


const Notification = ({message, className, iconClass, onDismiss}) => {
  return (
    <div className={"notification " + className}>
      <button className="delete" onClick={(e) => onDismiss()}></button>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <span className="icon">
              <i className={"fas fa-lg " + iconClass}></i>
            </span>
          </div>
          <div className="level-item">
            <p className="subtitle is-6">{message}</p>
          </div>
        </div>
      </nav>
    </div>
  )
}

Notification.propTypes = {
  // Message
  message: PropTypes.string.isRequired,
  // CSS class
  className: PropTypes.string.isRequired,
  // FAS icon
  iconClass: PropTypes.string.isRequired,
  // Events
  onDismiss: PropTypes.func.isRequired
}

export default Notification
