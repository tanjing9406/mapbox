import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { TripsLayer } from '@deck.gl/geo-layers'
import { COORDINATE_SYSTEM } from '@deck.gl/core'

import { targetService } from "@/lib/services"
import { formatBoundsToPointList, sendWsMessage } from './lib'

function RealtimeTrackLayer() {
    const { deckRef } = useSelector(state => state.basemap)
    const { showTrack } = useSelector(state => state.cornerInfoPanel)

    const [data, setData] = useState([])
    const [currentTime, setCurrentTime] = useState(0)

    const ws = useRef(null)

    const startWebsocket = () => {
        ws.current = new WebSocket(`ws://localhost:3000`)
        ws.current.onopen = () => {
            console.log('连接成功')
            if (ws.current && ws.current.readyState == WebSocket.OPEN) {
                const bounds = deckRef.current.viewports[0].getBounds()
                const { width, height } = deckRef.current.deck
                const ships = deckRef.current.pickObjects({ x: 0, y: 0, width, height, layerIds: ['target-layer'] })
                sendWsMessage(ws.current, { targetIdList: ships.map(ship => ship.object.targetId) })
            }
        };
        ws.current.onmessage = (option) => {
            const data = JSON.parse(option.data)
            const currentTime = data[0].timestamps[data[0].timestamps.length - 1]
            const time = new Date().getTime()
            console.log('socket data', data, currentTime, time)
            setData(data)
            setCurrentTime(currentTime)
        };
        ws.current.onclose = () => {
            setData([])
            console.log('websocket closed')
        }
    }

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
            // init()
            startWebsocket()
        } else {
            ws.current?.close()
        }
        return () => {
            ws.current?.close()
        }
    }, [showTrack])

    return (
        <>
            <TripsLayer
                id="realtime-track-layer"
                data={data}
                // getPath={d => d?.points.map(p => [p.longitude, p.latitude])}
                // getTimestamps={d => d?.points.map(p => p.lastTm)}
                // coordinateSystem={COORDINATE_SYSTEM.LNGLAT_OFFSETS}
                // coordinateOrigin={[182, -18]}
                getPath={d => d?.path}
                getTimestamps={d => d?.timestamps}
                widthMinPixels={2}
                currentTime={currentTime}
                getColor={[209, 49, 51]}
            />
        </>
    )
}

export default RealtimeTrackLayer