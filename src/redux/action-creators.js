import { store } from './store'
import * as Constants from './constants'

export function setMapStyle(mapStyle) {
  store.dispatch({
    type: Constants.SET_MAP_STYLE,
    data: mapStyle
  })
}

export function setMapViewState(viewState) {
  store.dispatch({
    type: Constants.SET_MAP_VIEWSTATE,
    data: viewState
  })
}

export function setTotalTargetNumber(number) {
  store.dispatch({
    type: Constants.SET_TOTAL_TARGET_NUMBER,
    data: number
  })
}
