import { useEffect, useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import Error from './components/Error'
import ErrorContext from './ErrorContext'
import LoginForm from './components/LoginForm'
import OneUserViewer from './components/OneUserViewer'
import UserViewer from './components/UserViewer'
import BlogViewer from './components/BlogViewer'
import OneBlogViewer from './components/OneBlogViewer'
import { Navbar, Nav } from 'react-bootstrap'

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

  const newCommentMutation = useMutation(blogService.addComment, {
    onSuccess: (newComment) => {
      queryClient.invalidateQueries('blogs')
      notificationDispatch({ type: "ADDCOMMENT" })
      setTimeout(() => {
        notificationDispatch({ type: "RESET" })
      }, 5000)
    },
    onError: () => {
      errorDispatch({ type: "COMMENTERROR" })
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

  const padding = { padding: 5 }

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

  const addComment = async (comment) => {
    newCommentMutation.mutate(comment)
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

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      <ErrorContext.Provider value={[errormessage, errorDispatch]}>
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
          <Router>
            {user
              ? <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">users</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    {user.name} logged in <button onClick={handleLogout}>logout</button>
                </Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
              : <div className="container"><br/></div>
            }
            <div className="container">
            <Error message={errormessage} />
            <Notification message={notification} />
            <h3>blogs</h3>
            <Routes>
              <Route path="/" element={user ? <BlogViewer blogs={blogs} user={user} addBlogFormRef={addBlogFormRef} createBlog={createBlog} addLike={addLike} deleteBlog={deleteBlog}/>  : <Navigate replace to="/login"/>}/>
              <Route path="/users" element={user ? <UserViewer users={users}/> : <Navigate replace to="/login"/>}/>
              <Route path="/users/:id" element={user ? <OneUserViewer users={users}/> : <Navigate replace to="/login"/>}/>
              <Route path="/blogs/:id" element={user ? <OneBlogViewer blogs={blogs} user={user} addLike={addLike} deleteBlog={deleteBlog} addComment={addComment}/> : <Navigate replace to="/login"/>}/>
              <Route path="/login" element={user ? <Navigate replace to="/"/> : <LoginForm loginUser={loginUser} />}/>
            </Routes>
            </div>
          </Router>
      </NotificationContext.Provider>
      </ErrorContext.Provider>
    </UserContext.Provider>
  )
}

export default App
