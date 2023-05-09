import { useState, useEffect, useContext, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NotificationContext, { NotificationContextProvider } from './NotificationContext'
import Error from './components/Error'
import ErrorContext, { ErrorContextProvider } from './ErrorContext'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errormessage, errorDispatch] = useContext(ErrorContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(response)
    })
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
    notificationDispatch({ type: "LOGOUT" })
    setTimeout(() => {
      notificationDispatch({ type: "RESET" })
    }, 5000)
  }

  const createBlog = async (blog) => {
    try {
      addBlogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.addNew(blog)
      const response = await blogService.getAll()
      setBlogs(response)
      notificationDispatch({ type: "ADDBLOG", payload: addedBlog })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)
    } catch (exception) {
      errorDispatch({ type: "ADDBLOGERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  }

  const addLike = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id)
      const newLikes = blog.likes + 1
      const changedBlog = { ...blog, likes: newLikes }
      await blogService.addLike(id, changedBlog)
      const response = await blogService.getAll()
      setBlogs(response)
    } catch (exception) {
      errorDispatch({ type: "ADDLIKEERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    if (
      window.confirm(
        `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${
          blogs.find((blog) => blog.id === id).author
        }?`
      )
    ) {
      try {
        await blogService.deleteOne(id)
        const response = await blogService.getAll()
        setBlogs(response)
        notificationDispatch({ type: "DELETE" })
        setTimeout(() => {
          notificationDispatch({ type: "RESET" })
        }, 5000)
      } catch (exception) {
        errorDispatch({ type: "DELETEERROR" })
        setTimeout(() => {
          errorDispatch({ type: "RESET" })
        }, 5000)
      }
    }
  }

  const loginUser = async (handledUser) => {
    try {
      const user = await loginService.login(handledUser)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notificationDispatch({ type: "LOGIN" })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)
    } catch (exception) {
      errorDispatch({ type: "AUTHENTICATIONERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  }

  const blogViewer = () => {
    return (
      <>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>
          {user.name} logged in{' '}
          <button type="submit" id="logout-button">
            logout
          </button>
        </form>
        <p></p>
        <Togglable
          buttonLabel="create new blog"
          closeLabel="cancel"
          ref={addBlogFormRef}
        >
          <AddBlogForm createBlog={createBlog} />
        </Togglable>
        <p></p>
        <div id="blog-listing">
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}
                user={user.username}
              />
            ))}
        </div>
      </>
    )
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <Error message={errormessage} />
        <Notification message={notification} />
        {!user && <LoginForm loginUser={loginUser} />}
        {user && blogViewer()}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
