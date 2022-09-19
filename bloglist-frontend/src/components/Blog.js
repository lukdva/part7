import { deleteBlog, increaseLikes } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLikeClick = () => {
    dispatch(increaseLikes(blog))
  }
  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }
  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div data-testid="blog_url">{blog.url}</div>
      <div data-testid="blog_likes">
        likes {blog.likes}{' '}
        <button onClick={handleLikeClick} data-testid="blog_like_button">
          like
        </button>
      </div>
      <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
      {blog.user.username === user.username && (
        <button onClick={handleRemoveClick} data-testid="remove_button">
          remove
        </button>
      )}
    </>
  )
}

export default Blog
