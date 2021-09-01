import * as Constants from '@/redux/constants'
import { BASE_LAYER_ID, BASE_THEME_ID, BASE_MODE_ID, INITIAL_VIEW_STATE } from "@/config/constants/default-consts-config"
import getMapStyle from "@/lib/mapstyle"

const initialState = {
  mapStyle: getMapStyle(BASE_LAYER_ID, `${BASE_THEME_ID}_${BASE_MODE_ID}`),
  viewState: INITIAL_VIEW_STATE
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_MAP_STYLE:
      return {
        ...state,
        mapStyle: action.data
      }
    case Constants.SET_MAP_VIEWSTATE:
      return {
        ...state,
        viewState: { ...state.viewState, ...action.data }
      }
    default:
      return state;
  }
}

export { reducer, initialState };
