import axios from 'axios'
import blogService from '../services/blogs'
import { useState } from 'react'
import React from 'react'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const response = await axios.post('/api/login', { username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
      props.setUser(response.data)
      blogService.setToken(response.data.token)
      setUsername('')
      setPassword('')
      props.setMessage('Login successful')
      props.setIsError(false)
      setTimeout(() => {
        props.setMessage(null)
      }, 3000)
    } catch(err) {
      props.setMessage(err.message)
      props.setIsError(true)
      setTimeout(() => {
        props.setMessage(null)
      }, 3000)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} data-testid='login_form'>
        <div>
                username
          <input
            type="text"
            name="Username"
            value={username}
            onChange = {({ target }) => {setUsername(target.value)}}
            data-testid='username'
          ></input>
        </div>
        <div>
                password
          <input
            type="password"
            name="Password"
            value={password}
            onChange = {({ target }) => {setPassword(target.value)}}
            data-testid='password'
          ></input>
        </div>
        <button type="submit" data-testid='login_button'>login</button>
      </form>
    </>
  )
}

export default Login