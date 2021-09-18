import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer, ViewMode, ModifyMode } from "nebula.gl"
import centroid from '@turf/centroid'

import { setMapEditMode } from '@/redux/basemapslice'
import { setAreaList } from '@/redux/alarmareapageslice'

import { fetchAlarmArea, mapAlarmAreaToGeoJSON } from './lib'
import { findIndex } from 'lodash'

function AlarmAreaLayer() {
    const dispatch = useDispatch()
    const { viewState, mapEditMode } = useSelector(state => state.basemap)
    const { editAreaId } = useSelector(state => state.alarmAreaPage)
    const [alarmAreaGeoJson, setAlarmAreaGeoJson] = useState(null)
    const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
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
            const index = findIndex(alarmAreaGeoJson.features, o => o.properties.areaId === editAreaId)
            setSelectedFeatureIndexes([index])
            dispatch(setMapEditMode(ModifyMode))
            return
        }
        setSelectedFeatureIndexes([])
        dispatch(setMapEditMode(ViewMode))
    }, [editAreaId])

    return (
        <>
            <EditableGeoJsonLayer
                id="alarm-area-layer"
                data={alarmAreaGeoJson}
                mode={mapEditMode}
                onEdit={({ updatedData, editType, editContext }) => {
                    setAlarmAreaGeoJson(updatedData);
                }}
                lineWidthMinPixels={1}
                selectedFeatureIndexes={selectedFeatureIndexes}
                getLineWidth={d => 1}
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