import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        deleteNotification(state, action) {
            return null
        }
    },
})

export const createNewNotification = (content) => {
  return dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => { dispatch(deleteNotification()) }, 5000)
  }
}

export const { createNotification, deleteNotification } = notificationSlice.actions

export default notificationSlice.reducer