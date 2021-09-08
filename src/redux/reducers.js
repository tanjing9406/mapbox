import { combineReducers } from "redux"
import basemapReducer from './basemapslice'

const rootReducer = combineReducers({
    basemap: basemapReducer
})

export default rootReducer