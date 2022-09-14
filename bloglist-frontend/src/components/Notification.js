import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const styleClass = notification.type
  if (!notification.visible) return null
  else
    return (
      <div className={`${styleClass} notification`} data-testid="notification">
        {notification.message}
      </div>
    )
}
export default Notification
