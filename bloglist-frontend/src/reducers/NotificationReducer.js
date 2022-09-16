import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', visible: false, type: '' },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
      state.visible = true
    },
    clearMessage: (state) => {
      state.message = ''
      state.visible = false
    },
  },
})
export const setMessageWithTimeout = (message, type, timeinSecs) => {
  return (dispatch) => {
    dispatch(setMessage({ message, type }))
    setTimeout(() => dispatch(clearMessage()), timeinSecs * 1000)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions

export default notificationSlice.reducer
