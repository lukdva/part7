import axios from 'axios'
const baseUrl = '/api/blogs'
let auth = null

const setToken = (token) => {
  auth = `Bearer ${token}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (blog) => {
  const config = { headers: { Authorization: auth } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const increaseLikes = async (blog) => {
  const config = { headers: { Authorization: auth } }
  const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
  return response.data
}

const removeBlog = async (blog) => {
  const config = { headers: { Authorization: auth } }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, createNew, setToken, increaseLikes, removeBlog }
