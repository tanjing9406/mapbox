import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { DeckGL, ScatterplotLayer, IconLayer, PathLayer, LineLayer } from 'deck.gl'
import { ICOM_MAPPING_CONFIG } from './consts'
import { getLonAndLats, fetchTargetTrack, addOrDelete } from './lib'
import IconClusterLayer from '../IconClusterLayer/icon-cluster-layer'

const TargetLayer = (props) => {
    const ws = useRef(null)
    const [message, setMessage] = useState([])
    const [targetsOfClicked, setTargetsOfClicked] = useState(new Set())
    const [targetTrackData, setTargetTrackData] = useState([])

    useLayoutEffect(() => {
        ws.current = new WebSocket(`ws://192.168.7.122/api/target/ws/region/${process.env.HLX_ACCESS_TOKEN}`)
        // ws://bs.uniseas.com.cn/apiv1/target/ws/region/66998c07-fbc5-4504-b357-88d2f085bdf7
        // ws.current = new WebSocket('ws://bs.uniseas.com.cn/apiv1/target/ws/region/c6d9cfd4-22bb-46db-be81-b7545119a7b5');
        ws.current.onopen = () => {
            console.log('连接成功')
            if (ws.current) {
                const shipsRule = {
                    "targetType": [
                        "All"
                    ],
                    "pointList": [
                        {
                            "lat": 34.06185606722126,
                            "lon": 97.02052516994142
                        },
                        {
                            "lat": 34.06185606722126,
                            "lon": 128.29620244557802
                        },
                        {
                            "lat": 13.15788416356098,
                            "lon": 128.29620244557802
                        },
                        {
                            "lat": 13.15788416356098,
                            "lon": 97.02052516994142
                        }
                    ],
                    "areaList": [],
                    "zoom": 12,
                    "targetIdList": [],
                    "provinceList": [
                        "HaiNan", "ZheJiang"
                    ]
                }
                let data = JSON.stringify(shipsRule);
                if (ws.current.readyState == WebSocket.OPEN) {
                    console.log('ws.current.readyState==WebSocket.OPEN')
                    ws.current.send(data);
                }
            }
        };
        ws.current.onmessage = (option) => {
            // console.log(JSON.parse(option.data).targetList)
            setMessage(JSON.parse(option.data).targetList)
        };

        return () => {
            ws.current?.close();
        };
    }, [ws])

    return (
        <>
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
                />
            </> : <IconClusterLayer
                id="icon-cluster-layer"
                data={message}
                pickable={true}
                autoHighlight={true}
                sizeScale={40}
                getPosition={d => [d.longitude, d.latitude]}
            />}

        </>
    )
}

export default TargetLayer