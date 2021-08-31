import * as Constants from '@/redux/constants'

const initialState = {
  mapStyle: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_MAP_STYLE:
      return {
        ...state,
        mapStyle: action.data
      }
    default:
      return state;
  }
}

export { reducer, initialState };
