import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    areaList: [],
    editAreaId: null,
    visiblePanel: new Set(['alarmAreaList']) // 'alarmAreaList', 'editArea', 'editCoordinate'
}

const alarmAreaPageSlice = createSlice({
    name: 'alarmareapageslice',
    initialState,
    reducers: {
        setAreaList: (state, action) => {
            state.areaList = action.payload
        },
        setEditAreaId: (state, action) => {
            state.editAreaId = action.payload
        },
        setVisiblePanel: (state, action) => {
            state.visiblePanel = action.payload
        },
        reset: (state, action) => {
            state.editAreaId = initialState.editAreaId
            state.visiblePanel = initialState.visiblePanel
        },
    }
})

export const { setAreaList, setEditAreaId, setVisiblePanel, reset } = alarmAreaPageSlice.actions

export default alarmAreaPageSlice.reducer