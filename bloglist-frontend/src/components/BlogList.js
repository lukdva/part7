import Blog from './Blog'
import React from 'react'

const BlogList = ({ blogs, user, setBlogs }) => {

  const updateBlogList = (updatedBlog) => {
    const updatedBlogList = blogs.map(blog => { return blog.id === updatedBlog.id ? updatedBlog : blog })
    setBlogs(updatedBlogList)
  }
  const removeBlogFromList = (blogToRemove) => {
    const updatedBlogList = blogs.filter( blog => blog.id !== blogToRemove.id)
    setBlogs(updatedBlogList)
  }
  return (
    <div data-testid='blog_list'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} user={user} removeBlogFromList={removeBlogFromList} />
        )}
    </div>
  )
}

export default BlogList
