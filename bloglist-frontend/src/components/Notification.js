import { Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const styleClass = notification.type
  if (!notification.visible) return null
  else
    return (
      <Alert severity={styleClass} data-testid="notification">
        {notification.message}
      </Alert>
    )
}
export default Notification
