import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genreToSearch, setGenreToSearch] = useState(null)
  const books = props.books
  const genres = books.flatMap(b => b.genres)

  const resultByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genreToSearch },
    skip: !genreToSearch
  })
  if (resultByGenre.loading) {
    return <div>loading</div>
  }

  if (!props.show) {
    return null
  }

  if (genreToSearch && resultByGenre.data) {
    const booksByGenre = resultByGenre.data.allBooks
    return (
      <div>
        <h2>books</h2>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenreToSearch(g)}>{g}</button>
        ))}
        <button onClick={() => setGenreToSearch(null)}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      {genres.map((g) => (
          <button key={g} onClick={() => setGenreToSearch(g)}>{g}</button>
        ))}
        <button onClick={() => setGenreToSearch(null)}>all genres</button>
    </div>
  )
}

export default Books
