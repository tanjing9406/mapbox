import * as Constants from '@/constants'
import getMapStyle from '@/lib/mapstyle'

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
  activeLayer: layerOptions[0],
  themeOptions,
  activeTheme: themeOptions[0],
  modeOptions,
  activeMode: modeOptions[0],
  mapStyle: getMapStyle(layerOptions[0].id, `${themeOptions[0].id}_${modeOptions[0].id}`)
};

function reduceMapStyle(state, action, optionKey) {
  const newState = Object.assign({}, state, {
    [optionKey]: action.option
  })
  newState.mapStyle = getMapStyle(newState.activeLayer.id, `${newState.activeTheme.id}_${newState.activeMode.id}`)
  return newState
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_LAYER_OPTION:
      return reduceMapStyle(state, action, 'activeLayer')
    case Constants.SET_THEME_OPTION:
      return reduceMapStyle(state, action, 'activeTheme')
    case Constants.SET_MODE_OPTION:
      return reduceMapStyle(state, action, 'activeMode')
    default:
      return state;
  }
}

export { reducer, initialState };
