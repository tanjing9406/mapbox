import { combineReducers } from "redux"
import alarmAreaPageSlice from "./alarmareapageslice"
import areaSwitchSlice from './areaswitchslice'
import basemapReducer from './basemapslice'
import baseLayerControlSlice from "./baselayercontrolslice"
import bussinessLayerControlSlice from "./bussinesslayercontrolslice"
import cornerInfoPanelSlice from "./cornerinfopanelslice"
import mapTooltipSlice from "./maptooltipslice"
import popupsControllerSlice from "./popupscontrollerslice"

const rootReducer = combineReducers({
    alarmAreaPage: alarmAreaPageSlice,
    areaSwitch: areaSwitchSlice,
    basemap: basemapReducer,
    baseLayerControl: baseLayerControlSlice,
    bussinessLayerControl: bussinessLayerControlSlice,
    cornerInfoPanel: cornerInfoPanelSlice,
    mapTooltip: mapTooltipSlice,
    popupsController: popupsControllerSlice
})

export default rootReducer