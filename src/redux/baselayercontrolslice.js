import getMapStyle from "@/lib/mapstyle"
import { createSlice } from '@reduxjs/toolkit'
import { BASE_LAYER_ID, BASE_THEME_ID, BASE_MODE_ID } from "@/config/constants/default-consts-config"

const initialState = {
    baseLayerId: BASE_LAYER_ID,
    baseThemeId: BASE_THEME_ID,
    baseModeId: BASE_MODE_ID
}

const baseLayerControlSlice = createSlice({
    name: 'baselayercontrol',
    initialState,
    reducers: {
        setBaseLayerControlId: {
            reducer: (state, action) => {
                const { keyId, value } = action.payload
                state[keyId] = value
            },
            prepare: (keyId, value) => {
                return { payload: { keyId, value } }
            }
        }
    }
})

export const { setBaseLayerControlId } = baseLayerControlSlice.actions

export default baseLayerControlSlice.reducer

export function mapStyleSelector(state){
    const { baseLayerId, baseThemeId, baseModeId } = state.baseLayerControl
    return getMapStyle(baseLayerId, `${baseThemeId}_${baseModeId}`)
}
