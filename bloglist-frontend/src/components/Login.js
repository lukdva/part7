import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMessageWithTimeout } from '../reducers/NotificationReducer'
import { setUser } from '../reducers/LoggedInUserReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
      dispatch(setUser(response.data))
      setUsername('')
      setPassword('')
      dispatch(setMessageWithTimeout('Login successful', 'success', 3))
    } catch (err) {
      dispatch(setMessageWithTimeout(err.message, 'error', 3))
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} data-testid="login_form">
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            data-testid="username"
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            data-testid="password"
          ></input>
        </div>
        <button type="submit" data-testid="login_button">
          login
        </button>
      </form>
    </>
  )
}

export default Login
