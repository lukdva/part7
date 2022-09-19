import React from 'react'
import { Link } from 'react-router-dom'

const BlogLine = ({ blog }) => {
  const blogLineStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogLineStyle}>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
    </div>
  )
}

export default BlogLine
