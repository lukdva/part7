import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/LoggedInUserReducer'

const UserInfo = (props) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(clearUser())
  }
  return (
    <p>
      {props.user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default UserInfo
