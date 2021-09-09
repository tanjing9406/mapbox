import { combineReducers } from "redux"
import basemapReducer from './basemapslice'
import baseLayerControlSlice from "./baselayercontrolslice"

const rootReducer = combineReducers({
    basemap: basemapReducer,
    baseLayerControl: baseLayerControlSlice
})

export default rootReducer