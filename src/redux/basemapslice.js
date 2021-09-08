import { createSlice } from '@reduxjs/toolkit'
import { ViewMode } from "nebula.gl"
import { BASE_LAYER_ID, BASE_THEME_ID, BASE_MODE_ID, INITIAL_VIEW_STATE } from "@/config/constants/default-consts-config"
import getMapStyle from "@/lib/mapstyle"

const initialState = {
  mapStyle: getMapStyle(BASE_LAYER_ID, `${BASE_THEME_ID}_${BASE_MODE_ID}`),
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
    setMapStyle(state, action) {
      console.log('setmapstyle', action)
      const mapStyle = action.payload
      state.mapStyle = mapStyle
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

export const { setMapEditMode, setMapStyle, setMapViewState, setTotalTargetNumber } = basemapSlice.actions

export default basemapSlice.reducer