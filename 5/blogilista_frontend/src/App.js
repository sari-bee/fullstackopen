import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(response => {setBlogs(response)})  
  }, [])

  useEffect(() => {
    const alreadyLoggedUser = window.localStorage.getItem('loggedBlogUser')
    if (alreadyLoggedUser) {
      const user = JSON.parse(alreadyLoggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('login successful')
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification('logout successful')
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const createBlog = async (blog) => {
    try {
      const response = await blogService.addNew(blog)
      setBlogs(blogs.concat(response))
      setNotification(`added ${response.title} by ${response.author}`)
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setErrorMessage('adding blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const blogViewer = () => {
    return (
      <>
      <h2>blogs</h2>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type="submit">log out</button>
      </form>
      <p></p>
      <Togglable buttonLabel='create new blog'>
        <AddBlogForm createBlog={createBlog}/>
      </Togglable>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
  }

  return (
    <div>
      <Error message={errormessage}/>
      <Notification message={notification}/>
      {!user && <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
        username={username}
        password={password}
      />}
      {user && blogViewer()}
    </div>
  )
}

export default App