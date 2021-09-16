import { combineReducers } from "redux"
import areaSwitchSlice from './areaswitchslice'
import basemapReducer from './basemapslice'
import baseLayerControlSlice from "./baselayercontrolslice"
import bussinessLayerControlSlice from "./bussinesslayercontrolslice"
import cornerInfoPanelSlice from "./cornerinfopanelslice"
import mapTooltipSlice from "./maptooltipslice"

const rootReducer = combineReducers({
    areaSwitch: areaSwitchSlice,
    basemap: basemapReducer,
    baseLayerControl: baseLayerControlSlice,
    bussinessLayerControl: bussinessLayerControlSlice,
    cornerInfoPanel: cornerInfoPanelSlice,
    mapTooltip: mapTooltipSlice
})

export default rootReducer