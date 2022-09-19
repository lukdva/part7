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
import Blog from './components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/LoggedInUserReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/UsersReducer'
import { initializeBlogs } from './reducers/BlogsReducer'

const App = () => {
  const signedUser = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(setUser(userObj))
      dispatch(initializeUsers())
      dispatch(initializeBlogs())
    }
  }, [])
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

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
                  <BlogList user={signedUser} blogs={blogs} />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blog} user={signedUser} />}
            />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
