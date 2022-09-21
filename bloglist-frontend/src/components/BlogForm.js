import blogService from '../services/blogs'
import { useState } from 'react'
import React from 'react'
import { setMessageWithTimeout } from '../reducers/NotificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/BlogsReducer'
import { TextField, Button, Box } from '@mui/material'

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
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(createBlog(newBlog))
      dispatch(setMessageWithTimeout('Blog created successfully', 'success', 3))
    } catch (err) {
      dispatch(setMessageWithTimeout(err.message, 'error', 3))
    }
  }
  const margins = {
    marginBottom: 8,
  }
  return (
    <>
      <form onSubmit={handleNewBlogSubmit}>
        <Box style={margins}>
          <TextField
            label="Title"
            name="Title"
            size="small"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value)
            }}
            data-testid="title_input"
          />
        </Box>
        <Box style={margins}>
          <TextField
            label="Author"
            name="Author"
            size="small"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
            data-testid="author_input"
          />
        </Box>
        <Box style={margins}>
          <TextField
            label="Url"
            name="Url"
            size="small"
            value={url}
            onChange={({ target }) => {
              setUrl(target.value)
            }}
            data-testid="url_input"
          />
        </Box>
        <Button
          style={margins}
          variant="contained"
          size="small"
          type="submit"
          data-testid="create_button"
        >
          create
        </Button>
      </form>
    </>
  )
}

export default BlogForm
