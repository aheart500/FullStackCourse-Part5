import React,{ useState,useEffect } from 'react'
import './App.css'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

function App() {
  const [username,setUsername] =useState('')
  const [password,setPassword] =useState('')
  const[blogs,setBlogs] =useState([])
  const [user,setUser] = useState(null)
  const[notification,setNotification] = useState(null)
  useEffect(() => {
    blogServices.getAll().then(sentBlogs => {
      setBlogs(sentBlogs)
    })
  },[])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogServices.setToken(user.token)
    }
  },[])
  const handleLogin = async (event) => {
    event.preventDefault()
    const loginData = {
      username,
      password
    }
    try{
      const user = await blogServices.login(loginData)
      setUser(user)
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setNotification({
        message : 'Logged in successfuly!',
        status : 'success'
      })
    }catch(error){
      setNotification({
        message : 'Wrong username or password',
        status : 'failure'
      })
    }
    setTimeout(() => {
      setNotification(null)
    },4000)
    setUsername('')
    setPassword('')
  }
  const handleLogout =() => {
    window.localStorage.clear()
    setUser(null)
    setNotification({
      message : 'Logged out successfuly!',
      status : 'success'
    })
    setTimeout(() => {
      setNotification(null)
    },4000)
    blogServices.setToken(null)
  }
  const showBlogs = () => {
    const sortedBlogs = [...blogs].sort((a,b) => {
      return b.likes - a.likes
    })
    return sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} state={[blogs,setBlogs,setNotification,user]}/>)
  }
  if(user !== null){
    return (
      <div className="Blog-site">
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <h3>Logged in as {user.name} <button onClick={handleLogout}>Log Out</button></h3>
        <ul>
          {showBlogs()}
        </ul>
        <CreateBlog state={[blogs,setBlogs,setNotification]} />
      </div>
    )
  }
  return (
    <div className='App'>
      <Notification notification={notification} />
      <LoginForm states={[username,password]} functions={[setUsername,setPassword,handleLogin]} />
    </div>
  )
}

export default App
