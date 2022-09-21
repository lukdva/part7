import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMessageWithTimeout } from '../reducers/NotificationReducer'
import { setUser } from '../reducers/LoggedInUserReducer'
import { Button, TextField } from '@mui/material'

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
          <TextField
            label="Username"
            name="Username"
            size="small"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            data-testid="username"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="Password"
            size="small"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            data-testid="password"
          />
        </div>
        <Button
          size="small"
          variant="contained"
          type="submit"
          data-testid="login_button"
        >
          login
        </Button>
      </form>
    </>
  )
}

export default Login
