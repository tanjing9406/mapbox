import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    targetId: ''
}

const targetInfoPanelSlice = createSlice({
    name: 'alarmareapageslice',
    initialState,
    reducers: {
        setTargetId: (state, action) => {
            state.targetId = action.payload
        }
    }
})

export const { setTargetId } = targetInfoPanelSlice.actions

export default targetInfoPanelSlice.reducer