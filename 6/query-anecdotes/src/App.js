import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const handleVote = async (anecdote) => {
    const newVotes = anecdote.votes +1
    updateAnecdoteMutation.mutate({...anecdote, votes: newVotes})
    notificationDispatch({ type : "VOTE", payload: anecdote.content})
    setTimeout(() => { notificationDispatch({ type: "RESET" }) }, 5000)
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const result = useQuery('anecdotes', getAnecdotes, { retry: false })
  if (result.isLoading) { return <div>please wait</div> }
  if (result.isError) { return <div>anecdote service not available due to problems with server</div> }
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
      <h3>Anecdote app</h3>
      <Notification content={notification}/>
      <AnecdoteForm/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
