import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkedAreas: ['HaiNan']
}

const areaSwitchSlice = createSlice({
    name: 'areaswitch',
    initialState,
    reducers: {
        setCheckedAreas: (state, action) => {
            state.checkedAreas = action.payload
        }
    }
})

export const { setCheckedAreas } = areaSwitchSlice.actions

export default areaSwitchSlice.reducer