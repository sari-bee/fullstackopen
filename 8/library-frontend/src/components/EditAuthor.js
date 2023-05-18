import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ EditAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>loading</div>
  }
  const authors=result.data.allAuthors

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = Number(year)
    EditAuthor({ variables: { name, setBornTo } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option key="default" value="default"> </option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor