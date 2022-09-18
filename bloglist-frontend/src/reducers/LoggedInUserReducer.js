import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setUserState(state, action) {
      return action.payload
    },
    clearUserState() {
      return null
    },
  },
})

export const setUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUserState(user))
  }
}

export const clearUser = () => {
  return (dispatch) => {
    dispatch(clearUserState())
    window.localStorage.removeItem('loggedInUser')
  }
}

export const { setUserState, clearUserState } = userSlice.actions
export default userSlice.reducer
