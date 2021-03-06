import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { DeckGL, ScatterplotLayer, IconLayer, PathLayer } from 'deck.gl'
import { ICOM_MAPPING_CONFIG } from './consts';

const TargetLayer = (props) => {
    const ws = useRef(null);
    const [message, setMessage] = useState([]);

    useLayoutEffect(() => {
        ws.current = new WebSocket(`ws://192.168.7.122/api/target/ws/region/${process.env.HLX_ACCESS_TOKEN}`);
        // ws://bs.uniseas.com.cn/apiv1/target/ws/region/66998c07-fbc5-4504-b357-88d2f085bdf7
        // ws.current = new WebSocket('ws://bs.uniseas.com.cn/apiv1/target/ws/region/c6d9cfd4-22bb-46db-be81-b7545119a7b5');
        ws.current.onopen = () => {
            console.log('θΏζ₯ζε')
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
        />
    )
}

export default TargetLayer