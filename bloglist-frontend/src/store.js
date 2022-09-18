import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/NotificationReducer'
import blogsReducer from './reducers/BlogsReducer'
import loggedInUserReducer from './reducers/LoggedInUserReducer'
import usersReducer from './reducers/UsersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    loggedInUser: loggedInUserReducer,
    users: usersReducer,
  },
})

export default store
