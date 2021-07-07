import { pick } from 'lodash'

function source(url) {
    this.type = 'raster'
    this.tileSize = 256
    this.tiles = [url]
    return this
}

function MapStyle(mapSource) {
    return {
        "version": 8,
        "sources": mapSource,
        "layers": Object.keys(mapSource).map(id => ({
            id: id + '-layer',
            type: 'raster',
            source: id,
            minzoom: 0,
            maxzoom: 19
        }))
    }
}

export default function getMapStyle(type = 'vector', graphNode = 'day_b') {
    const seaLayerUrl = `/self/map/cuttingMap/{z}/{y}/{x}?graphNode=${graphNode}&token=77dc1b424-d126-41ff-90eb-7c33179ebac4`
    const onlySeaLayerUrl = `/self/map/cuttingMap/{z}/{y}/{x}?graphNode=${graphNode}&skipcode=71&token=77dc1b424-d126-41ff-90eb-7c33179ebac4`
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

    const MAP_STYLES = {
        sea: new MapStyle(seaMap),
        vector: new MapStyle(vectorMap),
        image: new MapStyle(imageMap),
        vectorSea: new MapStyle(vectorSeaMap),
        imageSea: new MapStyle(imageSeaMap)
    }

    return MAP_STYLES[type]
}
