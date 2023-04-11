import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleAdd = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      const response = await blogService.addNew(blogObject)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`added ${title} by ${author}`)
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setErrorMessage('adding blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  const addNewForm = () => {
    return (
      <>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
      </>
    )
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
      {addNewForm()}
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
      {!user && loginForm()}
      {user && blogViewer()}
    </div>
  )
}

export default App