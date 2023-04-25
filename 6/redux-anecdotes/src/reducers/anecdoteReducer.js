import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

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
      state.push(action.payload)      
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer