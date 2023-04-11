import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errormessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const alreadyLoggedUser = window.localStorage.getItem('loggedBlogUser')
    if (alreadyLoggedUser) {
      const user = JSON.parse(alreadyLoggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
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

  const blogViewer = () => {
    return (
      <>
      <h2>blogs</h2>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type="submit">log out</button>
      </form>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
  }

  return (
    <div>
      {errormessage}
      {!user && loginForm()}
      {user && blogViewer()}
    </div>
  )
}

export default App