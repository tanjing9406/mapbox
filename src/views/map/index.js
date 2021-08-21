import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { DeckGL, ScatterplotLayer, IconLayer, PathLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'
import formatcoords from 'formatcoords'

import { TargetLayer, IconClusterLayer } from '../../components'
import LayerControlView from '../layer-control-view'
import getMapStyle from './mapstyle'

import './index.css'

const INITIAL_VIEW_STATE = {
    longitude: 109.481,
    latitude: 18.271,
    zoom: 8
}

const Map = (props) => {
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

    const onMapLoad = useCallback(() => {
        console.log('map load')
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;
        // You must initialize an empty deck.gl layer to prevent flashing
        map.addLayer(
            // This id has to match the id of the deck.gl layer
            new MapboxLayer({ id: "empty-layer", deck })
        );
    }, [])

    return (
        <div>
            <div className="sidebarStyle">
                <div>
                    Longitude: {viewState.longitude.toFixed(4)} | Latitude: {viewState.latitude.toFixed(4)} | Zoom: {viewState.zoom.toFixed(2)}
                </div>
            </div>
            {/* <MapSwitch></MapSwitch> */}
            <div className="map-container">
                <DeckGL
                    ref={deckRef}
                    layers={[new IconLayer({ id: 'empty-layer', data: [] })]}
                    initialViewState={INITIAL_VIEW_STATE}
                    onViewStateChange={({ viewState }) => {
                        setViewState(viewState)
                    }}
                    getTooltip={({ object, info }) => {
                        if(object && object.cluster) {
                            return `${object.point_count} 艘船`
                        }
                        if (object) {
                            const [dmsLat, dmsLng] = formatcoords(object.latitude, object.longitude).format({ latLonSeparator: ',', decimalPlaces: 0 }).split(',')
                            return `船名：${object.shipName ? object.shipName : '--'}
                        MMSI：${object.mmsi}
                        船长：${object.len}米
                        航向：${object.heading}°
                        航速：${object.speed}节
                        纬度：${dmsLat}
                        经度：${dmsLng}
                        状态：${object.state === 1 ? '正常' : '预测'} `
                        }
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
                            mapStyle={getMapStyle(props.activeLayer.id, `${props.activeTheme.id}_${props.activeMode.id}`)}
                            onLoad={onMapLoad}
                        />
                    )}
                    {/* {TargetLayer()} */}
                    {IconClusterLayer()}
                </DeckGL>
            </div>
            <LayerControlView />
        </div>
    );
};

export default Map;
