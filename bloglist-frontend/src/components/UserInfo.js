import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/LoggedInUserReducer'
import { Button, Typography } from '@mui/material'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser)
  const handleLogout = () => {
    dispatch(clearUser())
  }
  const buttonStyle = {
    marginLeft: 5,
  }
  if (!user) {
    return null
  }
  return (
    <Typography variant={'body2'}>
      {user.name} logged in
      <Button color="inherit" onClick={handleLogout} style={buttonStyle}>
        logout
      </Button>
    </Typography>
  )
}

export default UserInfo
