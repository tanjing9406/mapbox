import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hoverInfo: {}
}

const mapTooltipSlice = createSlice({
    name: 'maptooltip',
    initialState,
    reducers: {
        setMapTooltip: (state, action) => {
            state.hoverInfo = action.payload
        }
    }
})

export const { setMapTooltip } = mapTooltipSlice.actions

export default mapTooltipSlice.reducer