import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendations = (props) => {
  const books = props.books

  const userResult = useQuery(ME)
  if (userResult.loading) {
    return <div>loading</div>
  }
  const favoritegenre = userResult.data.me.favoriteGenre

  if (!props.show) {
    return null
  }

  const favoritebooks = books.filter(b => b.genres.includes(favoritegenre))

  if (favoritebooks.length === 0) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>Books in your favorite genre <b>{favoritegenre}</b></p>
        <p>no books for you :(</p>
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre <b>{favoritegenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoritebooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
