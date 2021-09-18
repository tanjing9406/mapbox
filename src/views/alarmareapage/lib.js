import { WKTLoader } from '@loaders.gl/wkt'
import { parseSync } from '@loaders.gl/core'
import bbox from '@turf/bbox'

export function getFitViewport(record, deckRef) {
    const { lineCoords, polygonCoords, areaShape } = record
    const wktText = areaShape === 'POLYGON' ? polygonCoords : lineCoords
    const geometry = parseSync(wktText, WKTLoader)
    const [minLng, minLat, maxLng, maxLat] = bbox(geometry)
    const newViewState = deckRef.current.viewports[0].fitBounds([[minLng, minLat], [maxLng, maxLat]], {
        padding: 20
    })
    return newViewState
}