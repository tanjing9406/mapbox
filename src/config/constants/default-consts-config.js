import { FlyToInterpolator } from 'deck.gl'
import * as d3 from 'd3'

export const BASE_LAYER_ID = 'vector'
export const BASE_MODE_ID = 'b'
export const BASE_THEME_ID = 'day'

export const DEFAULT_SHOW_TARGET = false

export const MAP_CHANGE_TRANSITION = {
    transitionDuration: 1600,
    transitionEasing: d3.easeCubicInOut,
    transitionInterpolator: new FlyToInterpolator()
}
export const INITIAL_VIEW_STATE = {
    longitude: 108.5819, latitude: 19.6711, zoom: 8,
    ...MAP_CHANGE_TRANSITION
}
export const TRACK_VIEW_STATE = {
    longitude: 108.0244, latitude: 19.1878, zoom: 13,
    ...MAP_CHANGE_TRANSITION
}