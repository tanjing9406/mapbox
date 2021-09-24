import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import centroid from '@turf/centroid'

import { setAreaList } from '@/redux/alarmareapageslice'

import { fetchAlarmArea } from './lib'
import { mapAlarmAreaToGeoJSON } from '@/lib/tools'

function AlarmAreaLayer() {
    const dispatch = useDispatch()
    const { viewState, mapEditMode } = useSelector(state => state.basemap)
    const { editAreaId, areaList } = useSelector(state => state.alarmAreaPage)
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

    useEffect(() => {
        if (editAreaId) {
            const filterAreaList = areaList.filter(o => o.areaId !== editAreaId)
            setAlarmAreaGeoJson(mapAlarmAreaToGeoJSON(filterAreaList))
            return
        }
        setAlarmAreaGeoJson(mapAlarmAreaToGeoJSON(areaList))
    }, [editAreaId])

    return (
        <>
            <GeoJsonLayer
                id="alarm-area-layer"
                data={alarmAreaGeoJson}
                lineWidthUnits="pixels"
                lineWidthMinPixels={1}
                getLineWidth={d => d.properties.areaOutsideStyle === '粗线' ? 3: 1}
                getLineColor={d => d.properties.lineColor}
                getFillColor={d => d.properties.fillColor}
                parameters={{
                    blend: true
                }}
            />
            <TextLayer
                id="alarm-area-text-layer"
                visible={isShowText}
                data={alarmAreaGeoJson?.features}
                characterSet={alarmAreaGeoJson?.characterSet}
                getText={d => d.properties.areaName}
                getPosition={d => centroid(d).geometry.coordinates}
                getSize={16}
            />
        </>
    )
}

export default AlarmAreaLayer