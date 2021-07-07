import * as Constants from '../constants'

const layerOptions = [
  { name: '海图', id: 'sea' },
  { name: '地图', id: 'vector' },
  { name: '卫星图', id: 'image' },
  { name: '海图地图', id: 'vectorSea' },
  { name: '海图卫星', id: 'imageSea' }
]

const themeOptions = [
  { name: '白天', id: 'day' },
  { name: '黄昏', id: 'dusk' },
  { name: '夜晚', id: 'night' }
]

const modeOptions = [
  { name: '基础', id: 'b' },
  { name: '标准', id: 's' },
  { name: '全部', id: 'a' }
]

const initialState = {
  layerOptions,
  activeLayer: layerOptions[1],
  themeOptions,
  activeTheme: themeOptions[0],
  modeOptions,
  activeMode: modeOptions[0]
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_LAYER_OPTION:
      console.log(action)
      return Object.assign({}, state, {
        activeLayer: action.option
      });
    case Constants.SET_THEME_OPTION:
      console.log(action)
      return Object.assign({}, state, {
        activeTheme: action.option
      });
    case Constants.SET_MODE_OPTION:
      return Object.assign({}, state, {
        activeMode: action.option
      });
    default:
      return state;
  }
}

export { reducer, initialState };
