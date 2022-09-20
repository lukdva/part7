import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    updateBlogState(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    addComment(state, action) {
      console.log('state', state[0].comments)
      const comment = action.payload
      const index = state.findIndex((blog) => blog.id === comment.blog)
      state[index].comments.push({ id: comment.id, content: comment.content })
    },
  },
})
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const result = await blogService.createNew(blog)
    dispatch(addBlog(result))
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog)
    dispatch(removeBlog(blog))
  }
}
export const increaseLikes = (blog) => {
  return async (dispatch) => {
    const result = await blogService.increaseLikes(blog)
    dispatch(updateBlogState(result))
  }
}
export const createComment = (blogId, comment) => {
  return async (dispatch) => {
    const result = await blogService.createComment(blogId, comment)
    console.log('result', result)
    dispatch(addComment(result))
  }
}
export const { addBlog, setBlogs, removeBlog, updateBlogState, addComment } =
  blogsSlice.actions
export default blogsSlice.reducer
