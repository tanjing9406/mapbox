import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_SHOW_TARGET } from "@/config/constants/default-consts-config"

const initialState = {
    dmsArr: undefined,
    showTarget: DEFAULT_SHOW_TARGET,
    // viewTarNum: 0,
    showTrack: false
}

const cornerInfoPanelSlice = createSlice({
    name: 'cornerinfopanel',
    initialState,
    reducers: {
        setDmsArr: (state, action) => {
            state.dmsArr = action.payload
        },
        setShowTarget: (state, action) => {
            state.showTarget = action.payload
        },
        setShowTrack: (state, action) => {
            state.showTrack = action.payload
        }
    }
})

export const { setDmsArr, setShowTarget, setShowTrack } = cornerInfoPanelSlice.actions

export default cornerInfoPanelSlice.reducer
