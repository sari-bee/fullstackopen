import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errormessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const addBlogFormRef = useRef()

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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification('logout successful')
    setTimeout(() => { setNotification(null) }, 5000)
  }

  const createBlog = async (blog) => {
    try {
      addBlogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.addNew(blog)
      const response = await blogService.getAll()
      setBlogs(response)
      setNotification(`added ${addedBlog.title} by ${addedBlog.author}`)
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setErrorMessage('adding blog failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const addLike = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      const newLikes = blog.likes+1
      const changedBlog = { ...blog, likes: newLikes }
      await blogService.addLike(id, changedBlog)
      const response = await blogService.getAll()
      setBlogs(response)
    } catch (exception) {
      setErrorMessage('adding like failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm(`Remove blog ${blogs.find(blog => blog.id === id).title} by ${blogs.find(blog => blog.id === id).author}?`)) {
      try {
        await blogService.deleteOne(id)
        const response = await blogService.getAll()
        setBlogs(response)
        setNotification('blog deleted')
        setTimeout(() => { setNotification(null) }, 5000)
      } catch (exception) {
        setErrorMessage('deleting blog failed')
        setTimeout(() => { setErrorMessage(null) }, 5000)
      }
    }
  }

  const loginUser = async (handledUser) => {
    try {
      const user = await loginService.login(handledUser)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotification('login successful')
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const blogViewer = () => {
    return (
      <>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>{user.name} logged in <button type="submit">logout</button></form>
        <p></p>
        <Togglable buttonLabel='create new blog' closeLabel='cancel' ref={addBlogFormRef}>
          <AddBlogForm createBlog={createBlog}/>
        </Togglable>
        <p></p>
        <div id="blog-listing">
          {blogs.sort((a, b) => b.likes-a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user.username} />
          )}
        </div>
      </>
    )
  }

  return (
    <div>
      <Error message={errormessage}/>
      <Notification message={notification}/>
      {!user && <LoginForm loginUser={loginUser}/>}
      {user && blogViewer()}
    </div>
  )
}

export default App