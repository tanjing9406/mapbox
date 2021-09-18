import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import centroid from '@turf/centroid'

import { setAreaList } from '@/redux/alarmareapageslice'

import { fetchAlarmArea, mapAlarmAreaToGeoJSON } from './lib'

function AlarmAreaLayer() {
    const dispatch = useDispatch()
    const { viewState } = useSelector(state => state.basemap)
    const [alarmAreaGeoJson, setAlarmAreaGeoJson] = useState(null)
    const isShowText = alarmAreaGeoJson && alarmAreaGeoJson.features.length > 0 && viewState.zoom >= 7
    useEffect(() => {
        const init = async () => {
            const areaList = await fetchAlarmArea()
            dispatch(setAreaList(areaList))
            setAlarmAreaGeoJson(mapAlarmAreaToGeoJSON(areaList))
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