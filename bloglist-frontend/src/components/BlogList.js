import BlogLine from './BlogLine'
import React from 'react'
import { useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { initializeBlogs } from '../reducers/BlogsReducer'
import { List } from '@mui/material'

const BlogList = () => {
  // const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  // useEffect(() => {

  // }, [])

  return (
    <List data-testid="blog_list">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogLine key={blog.id} blog={blog} />
        ))}
    </List>
  )
}

export default BlogList
