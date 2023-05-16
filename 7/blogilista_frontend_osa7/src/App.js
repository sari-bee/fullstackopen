import { useEffect, useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
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

  const blogsResult = useQuery('blogs', blogService.getBlogs)
  const usersResult = useQuery('users', userService.getUsers)
  if (blogsResult.isLoading) { return <div>please wait</div> }
  if (usersResult.isLoading) { return <div>please wait</div> }
  const blogs = blogsResult.data
  const users = usersResult.data

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

  const LogoutUserViewer = () => {
    return (
      <>
        <h3>blogs</h3>
        <form onSubmit={handleLogout}>
          {user.name} logged in{' '}
          <button type="submit" id="logout-button">
            logout
          </button>
        </form>
        <p></p>
      </>
    )
  }

  const OneUserViewer = () => {
    const id = useParams().id
    const us = users.find(u => u.id === id)
    return (
      <div>
        <h3>{us.name}</h3>
        <p></p>
        <h6><b>added blogs</b></h6>
        <Table striped>
          <tbody>
            <tr><td>blog</td></tr>
            <tr><td>another blog</td></tr>
            <tr><td>third blog</td></tr>
          </tbody>
        </Table>
      </div>
    )
  }

  const UserViewer = () => {
    return (
      <>
        <h3>users</h3>
        <div>
          <Table striped>
            <tbody>
              <tr>
                <td></td>
                <td><b>blogs created</b></td>
              </tr>
              {users
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map(u =>
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
              )}
            </tbody>
          </Table> 
        </div>
      </>
    )
  }

  const BlogViewer = () => {
    return (
      <>
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
          <Router>
            <div className="container">
            <Error message={errormessage} />
            <Notification message={notification} />
            {!user && <LoginForm loginUser={loginUser} />}
            {user && <LogoutUserViewer/>}
            <Routes>
              <Route path="/" element={user && <BlogViewer/>}/>
              <Route path="/users" element={user && <UserViewer/>}/>
              <Route path="/users/:id" element={user && <OneUserViewer/>}/>
            </Routes>
            </div>
          </Router>
      </NotificationContext.Provider>
      </ErrorContext.Provider>
    </UserContext.Provider>
  )
}

export default App
