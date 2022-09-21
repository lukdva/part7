import { deleteBlog, increaseLikes } from '../reducers/BlogsReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { Button, Typography, Box } from '@mui/material'
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
  const margins = {
    marginLeft: 8,
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
        likes {blog.likes}
      </Typography>
      <Typography variant={'body1'}>
        {blog.user ? `added by ${blog.user.name}` : ''}
      </Typography>
      <Box>
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
        <Button
          style={margins}
          variant="contained"
          size="small"
          fontSize="small"
          onClick={handleLikeClick}
          data-testid="blog_like_button"
        >
          like
        </Button>
      </Box>
      <Comments comments={blog.comments} />
    </>
  )
}

export default Blog
