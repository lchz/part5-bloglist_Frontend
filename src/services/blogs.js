import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// const config = {
//   headers: { Authorization: token}
// }

const getAll = async () => {
  // const res = await axios.get(baseUrl, config)
  // return res.data
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token}
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, create, setToken }