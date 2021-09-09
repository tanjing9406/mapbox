import { combineReducers } from "redux"
import basemapReducer from './basemapslice'
import baseLayerControlSlice from "./baselayercontrolslice"
import mapTooltipSlice from "./maptooltipslice"

const rootReducer = combineReducers({
    basemap: basemapReducer,
    baseLayerControl: baseLayerControlSlice,
    mapTooltip: mapTooltipSlice
})

export default rootReducer