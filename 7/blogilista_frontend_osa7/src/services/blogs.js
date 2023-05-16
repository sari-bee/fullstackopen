import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const addNew = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addComment = async (comment) => {
  const newComment = { "content" : comment.content }
  const response = await axios.post(`${baseUrl}/${comment.id}/comments`, newComment)
  return response.data
}

const addLike = async (changedBlog) => {
  const response = await axios.put(`${baseUrl}/${changedBlog.id}`, changedBlog)
  return response.data
}

const deleteOne = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { addNew, setToken, addLike, deleteOne, getBlogs, addComment }