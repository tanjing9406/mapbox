import { store } from './store'
import * as Constants from '../constants'

export function setActiveLayerOption(option) {
  store.dispatch({
    type: Constants.SET_LAYER_OPTION,
    option
  });
}

export function setActiveThemeOption(option) {
  store.dispatch({
    type: Constants.SET_THEME_OPTION,
    option
  });
}

export function setActiveModeOption(option) {
  store.dispatch({
    type: Constants.SET_MODE_OPTION,
    option
  });
}
