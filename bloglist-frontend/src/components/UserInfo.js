import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/LoggedInUserReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser)
  const handleLogout = () => {
    dispatch(clearUser())
  }
  const buttonStyle = {
    marginLeft: 5,
  }
  return (
    <>
      {user.name} logged in
      <button onClick={handleLogout} style={buttonStyle}>
        logout
      </button>
    </>
  )
}

export default UserInfo
