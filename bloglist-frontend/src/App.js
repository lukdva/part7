import { useRef, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Title from './components/Title'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import React from 'react'
import Users from './components/Users'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/LoggedInUserReducer'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  console.log('user', user)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(setUser(userObj))
    }
  }, [])

  return (
    <>
      {user === null && (
        <>
          <Title name="log in to application" />
          <Notification />
          <Login />
        </>
      )}

      {user !== null && (
        <>
          <Title name="blogs" />
          <Notification />
          <UserInfo user={user} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Title name="create new" />
                  <Togglable buttonText="new note" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <BlogList user={user} />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
