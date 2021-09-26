import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconLayer, PathLayer, LineLayer, ScatterplotLayer } from 'deck.gl'
import { setTotalTargetNumber } from "@/redux/basemapslice"
import { setMapTooltip } from "@/redux/maptooltipslice"
import { getLonAndLats } from '@/lib/tools'
import { ICOM_MAPPING_CONFIG } from './consts'
import { fetchTargetTrack, addOrDelete, sendWsMessage } from './lib'
import IconClusterLayer from '../IconClusterLayer/icon-cluster-layer'
import { flatMap } from 'lodash'

const TargetLayer = (props) => {
    const dispatch = useDispatch()
    const checkedAreas = useSelector(state => state.areaSwitch.checkedAreas)

    const ws = useRef(null)
    const [message, setMessage] = useState([])
    const [targetsOfClicked, setTargetsOfClicked] = useState(new Set())
    const [targetTrackData, setTargetTrackData] = useState([])

    const startWebsocket = () => {
        ws.current = new WebSocket(`ws://${process.env.BASE_IP}/api/target/ws/region/${process.env.HLX_ACCESS_TOKEN}`)
        ws.current.onopen = () => {
            if (message.length > 0) {
                dispatch(setTotalTargetNumber(message.length))
            }
            console.log('连接成功')
            if (ws.current && ws.current.readyState == WebSocket.OPEN) {
                sendWsMessage(ws.current, { provinceList: checkedAreas })
            }
        };
        ws.current.onmessage = (option) => {
            const data = JSON.parse(option.data)
            setMessage(data.targetList || [])
            dispatch(setTotalTargetNumber(data.targetNum || 0))
        };
        ws.current.onclose = () => {
            dispatch(setTotalTargetNumber(0))
            console.log('websocket closed')
        }
    }

    useLayoutEffect(() => {
        startWebsocket()
        return () => {
            ws.current?.close();
        };
    }, [ws])

    useEffect(() => {
        if (ws.current && ws.current.readyState == WebSocket.OPEN) {
            sendWsMessage(ws.current, { provinceList: checkedAreas })
        }
    }, [checkedAreas])

    useEffect(() => {
        if (!props.showTarget && ws.current) {
            ws.current.close()
            ws.current = null
        }
        if (props.showTarget && !ws.current) {
            startWebsocket()
        }
    }, [props.showTarget])

    return (
        !props.showTarget ? null : <>
            <IconLayer // 选中目标图标图层
                id="target-selected-layer"
                data={message.filter(obj => targetsOfClicked.has(obj.targetId))}
                getIcon={d => {
                    return ICOM_MAPPING_CONFIG['target_selected']
                }}
                sizeScale={0.25}
                getPosition={d => [d.longitude, d.latitude]}
                getSize={d => {
                    const { width, height } = ICOM_MAPPING_CONFIG['target_selected']
                    return Math.max(width, height)
                }}
                getAngle={d => -d.heading}
            />
            <PathLayer // 选中目标轨迹图层
                id="target-track-realtime"
                data={targetTrackData}
                widthMinPixels={1}
                getColor={[209, 49, 51]}
                getPath={d => d?.points.map(point => [point.longitude, point.latitude])}
            />
            <ScatterplotLayer // 轨迹点
                id='target-track-points'
                data={flatMap(targetTrackData, track => track.points)}
                // radiusUnits="pixels"
                radiusMaxPixels={3}
                // stroked={true}
                lineWidthMinPixels={1}
                getPosition={d => [d.longitude, d.latitude]}
                getRadius={d => 50}
                getFillColor={d => [176, 40, 115, 255]}
                // getLineColor={d => [0, 45, 255]}
                pickable={true}
                onHover={info => {
                    dispatch(setMapTooltip(info))
                }}
                parameters={{
                    blend: true
                }}
            />
            <LineLayer // 实时目标与轨迹图层
                id="target-track-head-tail"
                data={targetTrackData.filter(t => t.points.length > 0 && message.find(m => m.targetId === t.targetId))}
                pickable={false}
                getWidth={2}
                getSourcePosition={d => {
                    const real = message.find(m => m.targetId === d.targetId)
                    return [real.longitude, real.latitude]
                }}
                getTargetPosition={d => {
                    const pts = d?.points
                    const lastPoint = pts && pts[pts.length - 1]
                    return lastPoint && [lastPoint.longitude, lastPoint.latitude]
                }}
                getColor={[209, 49, 51]}
            />
            {!props.showCluster ? <>
                <LineLayer
                    id="target-layer-course"
                    data={message}
                    pickable={false}
                    getWidth={2}
                    getSourcePosition={d => [d.longitude, d.latitude]}
                    getTargetPosition={d => {
                        const time = 6 // 矢量线时间单位为分钟
                        const distance = d.speed * 1.852 * 1000 * time / 60 // 1海里 = 1.852公里(千米) (中国标准)
                        return getLonAndLats(d.longitude, d.latitude, d.course, distance)
                    }}
                    getColor={[54, 154, 204]}
                />
                <IconLayer
                    id="target-layer"
                    data={message}
                    pickable={true}
                    autoHighlight={true}
                    getIcon={d => {
                        return ICOM_MAPPING_CONFIG[d.type] || ICOM_MAPPING_CONFIG['RADAR']
                    }}
                    sizeScale={0.25}
                    getPosition={d => [d.longitude, d.latitude]}
                    getSize={d => {
                        const { width, height } = ICOM_MAPPING_CONFIG[d.type] || ICOM_MAPPING_CONFIG['RADAR']
                        return Math.max(width, height)
                    }}
                    getAngle={d => -d.heading}
                    getColor={d => [0, 255, 0, 255 * (d.state === 1 ? 1 : 0.75)]}
                    onClick={async (info, event) => {
                        // console.log('Clicked:', info, event)
                        setTargetsOfClicked(new Set(addOrDelete(targetsOfClicked, info.object.targetId)))
                        const data = await fetchTargetTrack({
                            zoom: 13,
                            trackLevel: 240,
                            targetId: Array.from(targetsOfClicked)
                        })
                        setTargetTrackData(data)
                    }}
                    onHover={info => {
                        dispatch(setMapTooltip(info))
                    }}
                />
            </> : <IconClusterLayer
                id="icon-cluster-layer"
                data={message}
                pickable={true}
                autoHighlight={true}
                sizeScale={40}
                getPosition={d => [d.longitude, d.latitude]}
                onHover={info => {
                    dispatch(setMapTooltip(info))
                }}
            />}

        </>
    )
}

export default TargetLayer