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
    }
})

export const { setAreaList, setEditAreaId } = alarmAreaPageSlice.actions

export default alarmAreaPageSlice.reducer