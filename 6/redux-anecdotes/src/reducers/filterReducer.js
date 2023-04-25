import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        createFilter(state, action) {
            return action.payload
        }
    },
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer