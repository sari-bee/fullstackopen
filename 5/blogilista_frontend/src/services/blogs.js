import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (id, changedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, changedBlog)
  return response.data
}

export default { getAll, addNew, setToken, addLike }