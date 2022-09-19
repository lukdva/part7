import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

const Navigation = () => {
  const style = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: 'grey',
  }
  const linkStyle = {
    paddingRight: 5,
  }
  return (
    <div style={style}>
      <Link to="/" style={linkStyle}>
        blogs
      </Link>
      <Link to="/users" style={linkStyle}>
        users
      </Link>
      <UserInfo />
    </div>
  )
}

export default Navigation
