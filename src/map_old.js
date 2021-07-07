import { Deck } from '@deck.gl/core';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';
import { pick } from 'lodash';
import './map_old.css'

const INITIAL_VIEW_STATE = {
    latitude: 20,
    longitude: 110,
    zoom: 7,
    bearing: 0,
    pitch: 0
};

function source(url) {
    this.type = 'raster'
    this.tileSize = 256
    this.tiles = [url]
    return this
}

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const seaLayerUrl = '/self/map/cuttingMap/{z}/{y}/{x}?graphNode=day_b&token=77dc1b424-d126-41ff-90eb-7c33179ebac4'
const onlySeaLayerUrl = '/self/map/cuttingMap/{z}/{y}/{x}?graphNode=day_b&skipcode=71&token=77dc1b424-d126-41ff-90eb-7c33179ebac4'
const tdtVectorUrl = '/api/tianditu/land/{z}/{x}/{y}.png'
const tdtImageUrl = '/api/tianditu/satellite/{z}/{x}/{y}.png'
const tdtNameUrl = '/api/tianditu/name/{z}/{x}/{y}.png'

const sources = {
    'tdtVector': new source(tdtVectorUrl),
    'tdtImage': new source(tdtImageUrl),
    'tdtName': new source(tdtNameUrl),
    'sea': new source(seaLayerUrl),
    'onlySea': new source(onlySeaLayerUrl)
}

const seaMap = pick(sources, 'sea') // 海图
const vectorMap = pick(sources, ['tdtVector', 'tdtName']) // 地图
const imageMap = pick(sources, ['tdtImage', 'tdtName']) // 卫星图
const vectorSeaMap = pick(sources, ['tdtVector', 'tdtName', 'onlySea']) // 海图地图
const imageSeaMap = pick(sources, ['tdtImage', 'tdtName', 'onlySea']) // 海图卫星

const mapSource = vectorMap

const map = new mapboxgl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": mapSource,
        "layers": Object.keys(mapSource).map(id => ({
            id: id + '-layer',
            type: 'raster',
            source: id,
            minzoom: 0,
            maxzoom: 19
        }))
    },
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
});

export const deck = new Deck({
    canvas: 'deck-canvas',
    width: '100%',
    height: '100%',
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    onViewStateChange: ({ viewState }) => {
        // map.setStyle(mapStyle('/sea-vector-image-vectorsea-imagesea/day-dusk-night/basis-standard-all'))
        map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
        });
    },
    layers: [
    ]
});