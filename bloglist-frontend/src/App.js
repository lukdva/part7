import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Title from './components/Title'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import React from 'react'

const App = () => {
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      setUser(userObj)
      blogService.setToken(userObj.token)
    }
  }, [])

  return (
    <>
      {user === null && (
        <>
          <Title name="log in to application" />
          <Notification />
          <Login setUser={setUser} />
        </>
      )}

      {user !== null && (
        <>
          <Title name="blogs" />
          <Notification />
          <UserInfo setUser={setUser} user={user} />
          <Title name="create new" />
          <Togglable buttonText="new note" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList user={user} />
        </>
      )}
    </>
  )
}

export default App
