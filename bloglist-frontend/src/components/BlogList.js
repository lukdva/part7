import Blog from './Blog'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/BlogsReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // const updateBlogList = (updatedBlog) => {
  //   const updatedBlogList = blogs.map((blog) => {
  //     return blog.id === updatedBlog.id ? updatedBlog : blog
  //   })
  //   // setBlogs(updatedBlogList)
  // }
  // const removeBlogFromList = (blogToRemove) => {
  //   const updatedBlogList = blogs.filter((blog) => blog.id !== blogToRemove.id)
  //   // setBlogs(updatedBlogList)
  // }
  return (
    <div data-testid="blog_list">
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // updateBlogList={updateBlogList}
            user={user}
            // removeBlogFromList={removeBlogFromList}
          />
        ))}
    </div>
  )
}

export default BlogList
