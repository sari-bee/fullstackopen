import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createVote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload)
      const changedAnecdote = {...anecdoteToChange, votes:anecdoteToChange.votes+1}
      return state.map(anecdote => anecdote.id !== action.payload ? anecdote : changedAnecdote)
    },
    createAnecdote(state, action) {
      const anecdote = asObject(action.payload)
      state.push(anecdote)      
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer