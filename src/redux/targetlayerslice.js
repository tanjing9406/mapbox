import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    realtimeTargetList: []
}

const targetLayerSlice = createSlice({
    name: 'alarmareapageslice',
    initialState,
    reducers: {
        setRealtimeTargetList: (state, action) => {
            state.realtimeTargetList = action.payload
        }
    }
})

export const { setRealtimeTargetList } = targetLayerSlice.actions

export default targetLayerSlice.reducer
