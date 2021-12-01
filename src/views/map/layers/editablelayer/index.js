import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer, ViewMode, ModifyMode } from "nebula.gl"

import { setMapEditMode } from '@/redux/basemapslice'

import { mapAlarmAreaToGeoJSON } from '@/lib/tools'

function EditableLayer() {
    const dispatch = useDispatch()
    const { viewState, mapEditMode } = useSelector(state => state.basemap)
    const { editAreaId, areaList } = useSelector(state => state.alarmAreaPage)
    const [editGeoJsonData, setEditGeoJsonData] = useState(null)
    const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
    // const isShowText = editGeoJsonData && editGeoJsonData.features.length > 0 && viewState.zoom >= 7

    useEffect(() => {
        if (editAreaId) {
            const data = areaList.filter(o => o.areaId === editAreaId)
            setSelectedFeatureIndexes([0])
            setEditGeoJsonData(mapAlarmAreaToGeoJSON(data))
            dispatch(setMapEditMode(ModifyMode))
            return
        }
        setSelectedFeatureIndexes([])
        setEditGeoJsonData(null)
        dispatch(setMapEditMode(ViewMode))
    }, [editAreaId])

    return (
        <>
            <EditableGeoJsonLayer
                id="editable-layer"
                data={editGeoJsonData}
                mode={mapEditMode}
                onEdit={({ updatedData, editType, editContext }) => {
                    setEditGeoJsonData(updatedData);
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
            {/* <TextLayer
                id="editable-text-layer"
                visible={isShowText}
                data={editGeoJsonData?.features}
                // characterSet={editGeoJsonData?.characterSet}
                getText={d => d.properties.areaName}
                getPosition={d => centroid(d).geometry.coordinates}
                getSize={16}
            /> */}
        </>
    )
}

export default EditableLayer