import { useRef, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Title from './components/Title'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import React from 'react'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/LoggedInUserReducer'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/UsersReducer'
import { initializeBlogs } from './reducers/BlogsReducer'
import Navigation from './components/Navigation'
import { Container, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const loggedInUser = window.localStorage.getItem('loggedInUser')

  useEffect(() => {
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(setUser(userObj))
      dispatch(initializeUsers())
      dispatch(initializeBlogs())
    }
  }, [loggedInUser])
  const signedUser = useSelector((state) => state.loggedInUser)
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
      <Container>
        {signedUser && <Navigation />}
        <Notification />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              signedUser || loggedInUser ? (
                <>
                  <Title name="Blogs" />
                  <Typography variant={'h4'}> Create new blog</Typography>
                  <Togglable buttonText="new blog" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <BlogList user={signedUser} blogs={blogs} />
                </>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route
            path="/users"
            element={
              signedUser || loggedInUser ? (
                <Users users={users} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/users/:id"
            element={
              signedUser || loggedInUser ? (
                <User user={user} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              signedUser || loggedInUser ? (
                <Blog blog={blog} user={signedUser} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App
