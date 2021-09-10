import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    siteLayersChecked: ['photoele_site']
}

const bussinessLayerControlSlice = createSlice({
    name: 'bussinesslayercontrol',
    initialState,
    reducers: {
        setCheckedLayers: {
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

export const { setCheckedLayers } = bussinessLayerControlSlice.actions

export default bussinessLayerControlSlice.reducer