import blogService from '../services/blogs'
import { useState } from 'react'
import React from 'react'
import { setMessageWithTimeout } from '../reducers/NotificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/BlogsReducer'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      props.blogFormRef.current.toggleVisibility()
      const blog = { title, author, url }
      const newBlog = await blogService.createNew(blog)
      console.log(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(createBlog(newBlog))
      dispatch(setMessageWithTimeout('Blog created successfully', 'success', 3))
    } catch (err) {
      dispatch(setMessageWithTimeout(err.message, 'error', 3))
    }
  }
  return (
    <form onSubmit={handleNewBlogSubmit}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value)
          }}
          data-testid="title_input"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value)
          }}
          data-testid="author_input"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value)
          }}
          data-testid="url_input"
        />
      </div>
      <button type="submit" data-testid="create_button">
        create
      </button>
    </form>
  )
}

export default BlogForm
