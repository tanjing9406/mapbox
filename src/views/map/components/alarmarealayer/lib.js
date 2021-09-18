import { WKTLoader } from '@loaders.gl/wkt'
import { parseSync } from '@loaders.gl/core'

function getColorToRgba(hex, opacity) {
    const rgba = hex.match(/[0-9a-fA-F]{2}/g).map(x => parseInt(x, 16))
    rgba[3] = opacity / 100 * 255
    return rgba
}
export function mapAlarmAreaToGeoJSON(beModel = []) {
    let characterSet = ''
    const features = beModel.map((area) => {
        const { lineCoords, polygonCoords, areaShape, areaOutsideColor, areaOutsideOpacity, areaInsideColor, areaInsideOpacity, ...rest } = area
        const wktText = areaShape === 'POLYGON' ? polygonCoords : lineCoords
        const lineColor = getColorToRgba(areaOutsideColor.slice(1), areaOutsideOpacity)
        const fillColor = getColorToRgba(areaInsideColor.slice(1), areaInsideOpacity)
        characterSet += area.areaName
        return {
            type: 'Feature',
            geometry: parseSync(wktText, WKTLoader),
            properties: {
                ...rest,
                lineColor,
                fillColor
            }
        }
    })
    return {
        type: 'FeatureCollection',
        features: features.reverse(),
        characterSet: new Set(characterSet)
    }
}

export function fetchAlarmArea(params) {
    return fetch('/self/target/area/new/page', {
        body: JSON.stringify({
            current: 1,
            size: 1000
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + process.env.HLX_ACCESS_TOKEN
        },
    }).then(res => {
        return res.json()
    }).then(res => {
        return (res && res.code === 0) ? res.data.records : []
    })
}