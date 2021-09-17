import React, { useEffect, useState } from 'react'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import centroid from '@turf/centroid'

import { fetchAlarmArea, mapAlarmAreaToGeoJSON } from './lib'
import { useSelector } from 'react-redux'

function AlarmAreaLayer() {
    const { viewState } = useSelector(state => state.basemap)
    const [alarmAreaGeoJson, setAreaList] = useState(null)
    const isShowText = alarmAreaGeoJson && alarmAreaGeoJson.features.length > 0 && viewState.zoom >= 7
    useEffect(() => {
        const init = async () => {
            const areaList = await fetchAlarmArea()
            setAreaList(mapAlarmAreaToGeoJSON(areaList))
        }
        init()
    }, [])

    return (
        <>
            <GeoJsonLayer
                id="alarm-area-layer"
                data={alarmAreaGeoJson}
                lineWidthMinPixels={1}
                getLineColor={d => d.properties.lineColor}
                getFillColor={d => d.properties.fillColor}
                parameters={{
                    blend: true
                }}
            />
            {isShowText && <TextLayer
                id="alarm-area-text-layer"
                data={alarmAreaGeoJson.features}
                characterSet={alarmAreaGeoJson.characterSet}
                getText={d => d.properties.areaName}
                getPosition={d => centroid(d).geometry.coordinates}
                getSize={16}
            />}
        </>
    )
}

export default AlarmAreaLayer