import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = sentToken => {
  token = `bearer ${sentToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const login = async credentials => {
  const response = await axios.post('/api/login',credentials)
  return response.data
}
const createBlogReq = async newBlogData => {
  const config = {
    headers: { 'Authorization' : token }
  }
  const response = await axios.post(baseUrl,newBlogData,config)
  return response.data
}
const updateBlog = async (blogId,newBlogData) => {
  const response = await axios.put(`${baseUrl}/${blogId}`,newBlogData)
  return response.data
}
const deleteBlogReq = async id => {
  const config = {
    headers: { 'Authorization' : token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll,login,setToken ,createBlogReq,updateBlog,deleteBlogReq }