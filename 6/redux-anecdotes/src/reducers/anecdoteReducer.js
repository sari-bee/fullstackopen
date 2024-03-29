import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createVote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
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

export const createNewVote = (id) => {
  return async dispatch => {
    const newVote = await anecdoteService.addVote(id)
    dispatch(createVote(newVote))
  }
}

export default anecdoteSlice.reducer