import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/NotificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

export default store
