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
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/LoggedInUserReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/UsersReducer'

const App = () => {
  const signedUser = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  // console.log('user', user)
  const blogFormRef = useRef()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(setUser(userObj))
      dispatch(initializeUsers())
    }
  }, [])
  const userMatch = useMatch('/users/:id')
  if (userMatch) {
    console.log('Number(userMatch.params.id)', Number(userMatch.params.id))
    console.log('match', userMatch)
  }
  const user = userMatch
    ? users.find((user) => {
        // console.log('user.id', user.id)
        // console.log('Number(userMatch.params.id)', Number(userMatch.params.id))
        return user.id === userMatch.params.id
      })
    : null
  console.log(user)
  return (
    <>
      {signedUser === null && (
        <>
          <Title name="log in to application" />
          <Notification />
          <Login />
        </>
      )}

      {signedUser !== null && (
        <>
          <Title name="blogs" />
          <Notification />
          <UserInfo user={signedUser} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Title name="create new" />
                  <Togglable buttonText="new note" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <BlogList user={signedUser} />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
