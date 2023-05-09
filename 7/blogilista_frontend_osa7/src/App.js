import { useEffect, useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import Error from './components/Error'
import ErrorContext from './ErrorContext'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const queryClient = useQueryClient()
  const [user, userDispatch] = useContext(UserContext)
  const [errormessage, errorDispatch] = useContext(ErrorContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const addBlogFormRef = useRef()

  const newBlogMutation = useMutation(blogService.addNew, {
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries('blogs')
      notificationDispatch({ type: "ADDBLOG", payload: newBlog })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)
    },
    onError: () => {
      errorDispatch({ type: "ADDBLOGERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  })

  const changeBlogMutation = useMutation(blogService.addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: () => {
      errorDispatch({ type: "ADDLIKEERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  })

  const deleteBlogMutation = useMutation(blogService.deleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      notificationDispatch({ type: "DELETE" })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)      
    },
    onError: () => {
      errorDispatch({ type: "DELETEERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  })

  const loginUserMutation = useMutation(loginService.login, {
    onSuccess: (user) => {
      userDispatch({ type: "LOGINUSER", payload: user })
      notificationDispatch({ type: "LOGIN" })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)
    },
    onError: () => {
      errorDispatch({ type: "AUTHENTICATIONERROR" })
      setTimeout(() => {
        errorDispatch({ type: "RESET" })
      }, 5000)
    }
  })

  useEffect(() => {
    const alreadyLoggedUser = window.localStorage.getItem('loggedBlogUser')
    if (alreadyLoggedUser) {
      const user = JSON.parse(alreadyLoggedUser)
      userDispatch({type: "OLDUSER", payload: user})
    }
  }, [])

  const result = useQuery('blogs', blogService.getBlogs)
  if (result.isLoading) { return <div>please wait</div> }
  const blogs = result.data

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    userDispatch({type: "RESET"})
    notificationDispatch({ type: "LOGOUT" })
    setTimeout(() => {
      notificationDispatch({ type: "RESET" })
    }, 5000)
  }

  const createBlog = async (blog) => {
    addBlogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blog)
  }

  const addLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const newLikes = blog.likes + 1
    const changedBlog = { ...blog, likes: newLikes }
    changeBlogMutation.mutate(changedBlog)
  }

  const deleteBlog = (id) => {
    if (
      window.confirm(
        `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${
          blogs.find((blog) => blog.id === id).author
        }?`
      )
    ) {
      deleteBlogMutation.mutate(id)

    }    
  }

  const loginUser = (handledUser) => {
    loginUserMutation.mutate(handledUser)
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
    <UserContext.Provider value={[user, userDispatch]}>
      <ErrorContext.Provider value={[errormessage, errorDispatch]}>
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <div>
          <Error message={errormessage} />
          <Notification message={notification} />
          {!user && <LoginForm loginUser={loginUser} />}
          {user && blogViewer()}
        </div>
      </NotificationContext.Provider>
      </ErrorContext.Provider>
    </UserContext.Provider>
  )
}

export default App
