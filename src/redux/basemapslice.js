import { createSlice } from '@reduxjs/toolkit'
import { ViewMode } from "nebula.gl"
import { INITIAL_VIEW_STATE } from "@/config/constants/default-consts-config"

const initialState = {
  viewState: INITIAL_VIEW_STATE,
  mapEditMode: ViewMode,
  totalTargetNumber: 0
}

const basemapSlice = createSlice({
  name: 'basemap',
  initialState,
  reducers: {
    setMapEditMode(state, action) {
      const mapEditMode = action.payload
      state.mapEditMode = mapEditMode
    },
    setMapViewState(state, action) {
      const viewState = action.payload
      state.viewState = viewState
    },
    setTotalTargetNumber(state, action) {
      const totalTargetNumber = action.payload
      state.totalTargetNumber = totalTargetNumber
    }
  }
})

export const { setMapEditMode, setMapViewState, setTotalTargetNumber } = basemapSlice.actions

export default basemapSlice.reducer