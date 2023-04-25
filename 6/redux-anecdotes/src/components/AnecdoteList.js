import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const value = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(value.toLowerCase())))

  const vote = (id, content) => {
    dispatch(createVote(id))
    dispatch(createNotification(`you voted "${content}"`))
    setTimeout(() => { dispatch(deleteNotification()) }, 5000)
  }

  return (
    <>
      {anecdotes.sort((a, b) => (b.votes-a.votes)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList