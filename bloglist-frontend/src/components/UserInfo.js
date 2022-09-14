import React from 'react'

const UserInfo = props => {
  const handleLogout = () => {
    console.log('Logout click')
    props.setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
  return (
    <p>{props.user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default UserInfo
