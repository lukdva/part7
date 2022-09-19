import BlogLine from './BlogLine'
import React from 'react'
import { useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { initializeBlogs } from '../reducers/BlogsReducer'

const BlogList = () => {
  // const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  // useEffect(() => {

  // }, [])

  return (
    <div data-testid="blog_list">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogLine key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
