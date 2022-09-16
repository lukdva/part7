import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/NotificationReducer'
import blogsReducer from './reducers/BlogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})

export default store
