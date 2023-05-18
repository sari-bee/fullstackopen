import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ EditAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

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
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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