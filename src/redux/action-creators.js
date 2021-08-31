import { store } from './store'
import * as Constants from './constants'

export function setMapStyle(mapStyle) {
  store.dispatch({
    type: Constants.SET_MAP_STYLE,
    data: mapStyle
  })
}
