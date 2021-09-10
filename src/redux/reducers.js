import { combineReducers } from "redux"
import basemapReducer from './basemapslice'
import baseLayerControlSlice from "./baselayercontrolslice"
import bussinessLayerControlSlice from "./bussinesslayercontrolslice"
import mapTooltipSlice from "./maptooltipslice"

const rootReducer = combineReducers({
    basemap: basemapReducer,
    baseLayerControl: baseLayerControlSlice,
    bussinessLayerControl: bussinessLayerControlSlice,
    mapTooltip: mapTooltipSlice
})

export default rootReducer