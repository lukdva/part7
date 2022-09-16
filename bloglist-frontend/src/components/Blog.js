import { useState } from 'react'
// import blogService from '../services/blogs'
import { deleteBlog, increaseLikes } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()
  const [visibleDetails, setVisibleDetails] = useState(false)
  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails)
  }
  const handleLikeClick = () => {
    dispatch(increaseLikes(blog))
  }
  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle}>
      <div data-testid="blog_info">
        {blog.title} {blog.author}{' '}
        <button
          onClick={toggleVisibility}
          data-testid="blog_details_view_button"
        >
          {visibleDetails ? 'hide' : 'view'}
        </button>{' '}
      </div>
      <div style={{ display: visibleDetails ? '' : 'none' }}>
        <div data-testid="blog_url">{blog.url}</div>
        <div data-testid="blog_likes">
          likes {blog.likes}{' '}
          <button onClick={handleLikeClick} data-testid="blog_like_button">
            like
          </button>{' '}
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        {blog.user.username === user.username && (
          <button onClick={handleRemoveClick} data-testid="remove_button">
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
