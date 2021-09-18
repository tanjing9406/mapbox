import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    areaList: []
}

const alarmAreaPageSlice = createSlice({
    name: 'alarmareapageslice',
    initialState,
    reducers: {
        setAreaList: (state, action) => {
            state.areaList = action.payload
        }
    }
})

export const { setAreaList } = alarmAreaPageSlice.actions

export default alarmAreaPageSlice.reducer