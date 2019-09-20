import React,{ useState } from 'react'
import blogServices from '../services/blogs'
const Blog = ({ blog,state }) => {
  const [visible,setVisible] = useState(false)
  const [blogs,setBlogs,setNotification,user] = state
  const addLike = async () => {
    const updatedBlog = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes : blog['likes']+1
    }
    try{
      await blogServices.updateBlog(blog.id,updatedBlog)
      setNotification({
        message : 'Liked!',status:'success'
      })
      blogServices.getAll().then(sentBlogs => {
        setBlogs(sentBlogs)
      })
    }catch(error){
      setNotification({
        message : 'Failed to add a like',status:'failure'
      })
    }
    setTimeout(() => {
      setNotification(null)
    },4000)
  }
  const deleteBlog = async () => {
    const confirmed = window.confirm(`Are you sure you wanna delete "${blog.title}" blog ?`)
    if(confirmed){
      try{
        await blogServices.deleteBlogReq(blog.id)
        const updatedBlogs = blogs.filter(blogy => blogy.id !== blog.id)
        setBlogs(updatedBlogs)
        setNotification({
          message : 'Deleted!',status:'success'
        })
      }catch(error){
        setNotification({
          message : 'You are not authorized to delete this blog',
          status: 'failure'
        })
      }
      setTimeout(() => {
        setNotification(null)
      },4000)
    }
  }
  const removeButton = () => {
    if(user.name === blog.user.name){
      return <li><button type='button' onClick={deleteBlog}>Remove</button></li>
    }
    return null
  }
  return (
    <li>
      <span onClick={() => setVisible(!visible)} style={{ cursor:'pointer' }}>{blog.title}</span>
      <ul style={{ height : visible ? '6rem' : '0',transition :'all 0.5s ease-in',overflow:'hidden' }}>
        <li> Written by: {blog.author}</li>
        <li><a href={blog.url}> Visit the blog </a></li>
        <li>Likes : {blog.likes}<button type='button' onClick={addLike}>Like</button></li>
        <li>Added by {blog.user.name}</li>
        {removeButton()}
      </ul>
    </li>
  )
}

export default Blog