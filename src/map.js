import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { DeckGL, ScatterplotLayer, MapboxLayer } from 'deck.gl'
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

const Map = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(110);
    const [lat, setLat] = useState(20);
    const [zoom, setZoom] = useState(7);

    const ws = useRef(null);
    const [message, setMessage] = useState(null);

    useLayoutEffect(() => {
        ws.current = new WebSocket('ws://192.168.7.122/api/target/ws/region/a1303831-25ee-4b7f-8e6c-cb48a50604f6');
        // ws://bs.uniseas.com.cn/apiv1/target/ws/region/66998c07-fbc5-4504-b357-88d2f085bdf7
        // ws.current = new WebSocket('ws://bs.uniseas.com.cn/apiv1/target/ws/region/66998c07-fbc5-4504-b357-88d2f085bdf7');
        ws.current.onopen = () => {
            console.log('连接成功')
            if (ws.current) {
                const shipsRule = {
                    "targetType": [
                        "All"
                    ],
                    "pointList": [
                        {
                            "lat": 21.321086326756387,
                            "lon": 106.65011695231597
                        },
                        {
                            "lat": 21.321086326756387,
                            "lon": 111.07760718669095
                        },
                        {
                            "lat": 16.810832696824036,
                            "lon": 111.07760718669095
                        },
                        {
                            "lat": 16.810832696824036,
                            "lon": 106.65011695231597
                        }
                    ],
                    "areaList": [],
                    "zoom": 12,
                    "targetIdList": [],
                    "provinceList": [
                        "HaiNan"
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
            // setMessage(e);
            setMessage(JSON.parse(option.data.targetList))
        };
        console.log(ws.current)

        return () => {
            ws.current?.close();
        };
    }, [ws]);

    // Initialize map when component mounts
    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: getMapStyle(),
            center: [lng, lat],
            zoom: zoom,
            pitch: 0,
            bearing: 0
        });

        // Clean up on unmount
        return () => map.current.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        // Add navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    useEffect(() => {
        if (map.current) {
            console.log('changed map style', `${props.activeLayer.id} ${props.activeTheme.id}_${props.activeMode.id}`)
            map.current.setStyle(getMapStyle(props.activeLayer.id, `${props.activeTheme.id}_${props.activeMode.id}`))
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
            <div className="map-container" ref={mapContainer} />
            <ConnectedLayerOptionsfield changeState={setActiveLayerOption} className="ml12 mt12" />
            <ConnectedThemeOptionsfield changeState={setActiveThemeOption} className="ml12 mt120" />
            <ConnectedModeOptionsfield changeState={setActiveModeOption} className="ml240 mt120" />
        </div>
    );
};

export default Map;
