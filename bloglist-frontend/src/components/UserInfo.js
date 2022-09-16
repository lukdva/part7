import React from 'react'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/UserReducer'

const UserInfo = (props) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    // console.log('Logout click')
    dispatch(clearUser())
    // window.localStorage.removeItem('loggedInUser')
  }
  return (
    <p>
      {props.user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default UserInfo
