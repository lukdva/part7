import React from 'react'

const Notification = (props) => {
  const styleClass = props.error ? 'error' : 'success'
  if (props.msg === null) return null
  else
    return (
      <div className={`${styleClass} notification`} data-testid="notification">
        {props.msg}
      </div>
    )
}

export default Notification
