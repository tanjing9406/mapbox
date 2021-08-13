import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { DeckGL, ScatterplotLayer, IconLayer, PathLayer } from 'deck.gl'

const TargetLayer = (props) => {
    const ws = useRef(null);
    const [message, setMessage] = useState([]);

    useLayoutEffect(() => {
        ws.current = new WebSocket(`ws://192.168.7.122/api/target/ws/region/${process.env.HLX_ACCESS_TOKEN}`);
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
        <IconLayer
            id="target-layer"
            data={message}
            pickable={true}
            getIcon={d => {
                const baseUrl = '/src/assets/images/targets/'
                const icon = {
                    url: baseUrl + 'radar.png',
                    width: 60,
                    height: 60,
                }
                switch (d.type) {
                    case 'RADAR': // 
                        break
                    case 'AIS_A':
                        icon.url = baseUrl + 'aisA_1.png'
                        icon.width = 80
                        icon.height = 100
                        break
                    case 'RADAR_AIS_A':
                        icon.url = baseUrl + 'aisAR_1.png'
                        icon.width = 80
                        icon.height = 100
                        break
                    case 'AIS_B':
                        icon.url = baseUrl + 'aisB_1.png'
                        icon.width = 60
                        icon.height = 100
                        break
                    case 'RADAR_AIS_B':
                        icon.url = baseUrl + 'aisBR_1.png'
                        icon.width = 60
                        icon.height = 100
                        break
                    default:
                        break
                }
                return icon
            }}
            sizeScale={0.25}
            getPosition={d => [d.longitude, d.latitude]}
            getSize={d => {
                let size = 60
                switch (d.type) {
                    case 'RADAR':
                        break
                    case 'AIS_A':
                    case 'RADAR_AIS_A':
                    case 'AIS_B':
                    case 'RADAR_AIS_B':
                        size = 100
                        break
                    default:
                        break
                }
                return size
            }}
            getAngle={d => -d.heading}
            getColor={[0, 225, 0]}
        />
    )
}

export default TargetLayer