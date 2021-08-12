import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { DeckGL, ScatterplotLayer, IconLayer, PathLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl';

import Optionsfield from './components/Optionsfield';
import { setActiveLayerOption, setActiveThemeOption, setActiveModeOption } from './redux/action-creators';
import getMapStyle from './mapstyle';

import './map.css';

const ConnectedLayerOptionsfield = connect(mapStateToPropsLayerOptionsfield)(
    Optionsfield
);

function mapStateToPropsLayerOptionsfield(state) {
    return {
        options: state.layerOptions,
        active: state.activeLayer
    };
}

const ConnectedThemeOptionsfield = connect(mapStateToPropsThemeOptionsfield)(
    Optionsfield
);

function mapStateToPropsThemeOptionsfield(state) {
    return {
        options: state.themeOptions,
        active: state.activeTheme
    };
}

const ConnectedModeOptionsfield = connect(mapStateToPropsModeOptionsfield)(
    Optionsfield
);

function mapStateToPropsModeOptionsfield(state) {
    return {
        options: state.modeOptions,
        active: state.activeMode
    };
}

const INITIAL_VIEW_STATE = {
    longitude: 109.481,
    latitude: 18.271,
    zoom: 8
}

const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 60, height: 60, mask: true }
}
const data = [
    { position: [110, 20], size: 100 }
]

const Map = (props) => {
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const [mapStyle, setMapStyle] = useState(getMapStyle())

    const [lng, setLng] = useState(INITIAL_VIEW_STATE.longitude);
    const [lat, setLat] = useState(INITIAL_VIEW_STATE.latitude);
    const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom);

    const ws = useRef(null);
    const [message, setMessage] = useState([{ longitude: 110, latitude: 20 }]);

    const onMapLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;
        // You must initialize an empty deck.gl layer to prevent flashing
        map.addLayer(
            // This id has to match the id of the deck.gl layer
            new MapboxLayer({ id: "my-scatterplot", deck })
        );
    }, [])

    const layers = [
        new IconLayer({
            id: 'my-scatterplot',
            data: message,
            pickable: true,
            // iconAtlas: '/src/assets/images/targets/radar.png',
            // iconMapping: ICON_MAPPING,
            // getIcon: d => 'marker',
            getIcon: d => {
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
            },
            sizeScale: 0.25,
            // sizeUnits: 'meters',
            getPosition: d => [d.longitude, d.latitude],
            getSize: d => {
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
            },
            getAngle: d => -d.heading,
            getColor: [0, 225, 0]
        }),
        new PathLayer({
            id: 'path-layer',
            data: [{
                path: [[109.481, 18.271], [109.915, 18.442]],
                name: 'tanjing',
                color: [255, 0, 0]
            }],
            pickable: true,
            widthScale: 20,
            widthMinPixels: 2,
            getPath: d => d.path,
            getColor: d => d.color,
            getWidth: d => 5
        })
    ]

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

    useEffect(() => {
        if (mapRef.current) {
            console.log('changed map style', `${props.activeLayer.id} ${props.activeTheme.id}_${props.activeMode.id}`)
            setMapStyle(getMapStyle(props.activeLayer.id, `${props.activeTheme.id}_${props.activeMode.id}`))
            setTimeout(() => mapRef.current.getMap().moveLayer('my-scatterplot'), 0)
        }
    }, [props.activeLayer, props.activeTheme, props.activeMode])

    return (
        <div>
            <div className="sidebarStyle">
                <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
            {/* <MapSwitch></MapSwitch> */}
            <div className="map-container">
                <DeckGL
                    ref={deckRef}
                    layers={layers}
                    initialViewState={INITIAL_VIEW_STATE}
                    onViewStateChange={({ viewState }) => {
                        setLat(viewState.latitude.toFixed(4))
                        setLng(viewState.longitude.toFixed(4))
                        setZoom(viewState.zoom.toFixed(2))
                    }}
                    getTooltip={({ object }) => {
                        return object && `航向：${object.heading} \n航速：${object.speed} km/h \n经度：${object.latitude} \n纬度：${object.longitude} \n状态：正常 `
                    }}
                    controller={true}
                    onWebGLInitialized={setGLContext}
                    glOptions={{
                        /* To render vector tile polygons correctly */
                        stencil: true
                    }}
                >
                    {glContext && (
                        /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                        <StaticMap
                            ref={mapRef}
                            gl={glContext}
                            mapStyle={mapStyle}
                            onLoad={onMapLoad}
                        />
                    )}
                </DeckGL>
            </div>
            <ConnectedLayerOptionsfield changeState={setActiveLayerOption} className="ml12 mt12" />
            <ConnectedThemeOptionsfield changeState={setActiveThemeOption} className="ml12 mt120" />
            <ConnectedModeOptionsfield changeState={setActiveModeOption} className="ml240 mt120" />
        </div>
    );
};

export default Map;
