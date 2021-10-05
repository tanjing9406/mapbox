import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { TripsLayer } from '@deck.gl/geo-layers'
import { COORDINATE_SYSTEM } from '@deck.gl/core'

import { targetService } from "@/lib/services"
import { formatBoundsToPointList } from './lib'

function RealtimeTrackLayer() {
    const { deckRef } = useSelector(state => state.basemap)
    const { showTrack } = useSelector(state => state.cornerInfoPanel)

    const [data, setData] = useState([])

    useEffect(() => {
        if (showTrack) {
            const init = async function () {
                const bounds = deckRef.current.viewports[0].getBounds()
                // console.log(bounds, formatBoundsToPointList(bounds))
                const params = {
                    "targetType": ["RADAR", "AIS_A", "AIS_B", "BDS", "CCTV", "RADAR_AIS_A", "RADAR_AIS_B", "RADAR_BDS", "RADAR_CCTV", "BDS_AIS", "CCTV_AIS", "OTHERS"],
                    "pointList": formatBoundsToPointList(bounds),
                    "areaList": [],
                    "zoom": 12,
                    "targetIdList": [],
                    "provinceList": ["HaiNan"],
                    "shipTypeList": ["1", "2", "4", "3", "10", "5", "8", "9"],
                    "stateList": ["1", "2"],
                    "shipNationalityList": ["0", "1", "2"],
                    "minLen": 0,
                    "maxLen": 500,
                    "minSpeed": 0,
                    "maxSpeed": 60,
                    // "trackLevel": 240,
                }
                const data = await targetService.fetchTargetTrackInTime(params)
                console.log(data)
                // setData(data.allTargetTrack)
                // setData(data)
            }
            init()
        }
    }, [showTrack])

    return (
        <TripsLayer
            id="realtime-track-layer"
            data={data}
            getPath={d => d?.points.map(p => [p.longitude, p.latitude])}
            getTimestamps={d => d?.points.map(p => p.lastTm)}
            // coordinateSystem={COORDINATE_SYSTEM.LNGLAT_OFFSETS}
            // coordinateOrigin={[182, -18]}
            // getPath={d => d?.path}
            // getTimestamps={d => d?.timestamps}
            widthMinPixels={2}
            currentTime={1790 || new Date().getTime()}
            getColor={[255, 0, 0]}
        />
    )
}

export default RealtimeTrackLayer