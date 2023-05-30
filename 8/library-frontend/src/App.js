import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const Error = ({ errormessage }) => {
  if (!errormessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>{errormessage}</div>
  )
}

const App = () => {
  const [page, setPage] = useState('books')
  const [errormessage, setErrormessage] = useState(null)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const error = (message) => {
    setErrormessage(message)
    setTimeout(() => { setErrormessage(null) }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book ${data.data.bookAdded.title} has been added`)
    }
  })

  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>loading</div>
  }
  const books = result.data.allBooks

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Error errormessage={errormessage}/>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} books={books}/>
        <LoginForm show={page === 'login'} setError={error} setToken={setToken}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('editauthor')}>set birthyear</button>
        <button onClick={logout}>logout</button>
      </div>
      <Error errormessage={errormessage}/>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} books={books}/>
      <Recommendations show={page === 'recommendations'} books={books}/>
      <NewBook show={page === 'add'} setError={error} />
      <EditAuthor show={page === 'editauthor'} />
    </div>
  )
}

export default App
