import { deleteBlog, increaseLikes } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { Button, Typography } from '@mui/material'
// import '@fontsource/roboto/700.css'

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
      <Typography variant={'h3'}>{blog.title}</Typography>
      <Typography variant={'body1'} data-testid="blog_url">
        {blog.url}
      </Typography>
      <Typography variant={'body1'} data-testid="blog_likes">
        likes {blog.likes}{' '}
        <Button
          variant="contained"
          size="small"
          fontSize="small"
          onClick={handleLikeClick}
          data-testid="blog_like_button"
        >
          like
        </Button>
      </Typography>
      <Typography variant={'body1'}>
        {blog.user ? `added by ${blog.user.name}` : ''}
      </Typography>
      {blog.user.username === user.username && (
        <Button
          variant="contained"
          size="small"
          fontSize="small"
          onClick={handleRemoveClick}
          data-testid="remove_button"
        >
          remove
        </Button>
      )}
      <Comments comments={blog.comments} />
    </>
  )
}

export default Blog
