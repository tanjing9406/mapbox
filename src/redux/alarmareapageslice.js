import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    areaList: [],
    editAreaId: null
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
        reset: (state, action) => {
            state.editAreaId = initialState.editAreaId
        },
    }
})

export const { setAreaList, setEditAreaId, reset } = alarmAreaPageSlice.actions

export default alarmAreaPageSlice.reducer