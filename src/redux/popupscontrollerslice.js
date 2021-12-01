import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    visiblePopups: new Set(['alarmAreaList'])
}

const popupsControllerSlice = createSlice({
    name: 'alarmareapageslice',
    initialState,
    reducers: {
        setVisiblePopups: (state, action) => {
            state.visiblePopups = action.payload
        }
    }
})

export const { setVisiblePopups } = popupsControllerSlice.actions

export default popupsControllerSlice.reducer
