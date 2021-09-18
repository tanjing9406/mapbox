import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeckGL, IconLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'

import { TargetLayer } from 'Components'
import { WithMapVisibleCheckHoc } from 'Components/withVisibleCheckHoc'
import { setMapViewState, setDeckRef } from "@/redux/basemapslice"
import { mapStyleSelector } from "@/redux/baselayercontrolslice"
import { setDmsArr } from "@/redux/cornerinfopanelslice"
import { Switch } from 'antd'
import { CornerInfoPanel, RightSider, MapTooltip, PhotoEleSiteLayer, AISSiteLayer, RadarSiteLayer, AlarmAreaLayer } from './components';
import { getDmsArray } from './tools';
import HNHYMapContext from './hnhymapcontext'
import { TripsLayer } from '@deck.gl/geo-layers'
import { COORDINATE_SYSTEM } from '@deck.gl/core'

const TRIPS = '/src/assets/data/trips-v7.json'
const theme = {
    trailColor0: [255, 0, 0],
    trailColor1: [0, 0, 255]
}
const Map = () => {
    const dispatch = useDispatch()
    const { viewState, mapEditMode } = useSelector(state => state.basemap)
    const mapStyle = useSelector(mapStyleSelector)
    const { showTarget, showTrack } = useSelector(state => state.cornerInfoPanel)
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const mapContainerRef = useRef()
    const [showCluster, setShowCluster] = useState(false)
    const [time, setTime] = useState(0)
    const [animation] = useState({})

    const animate = () => {
        setTime(t => (t + 1) % 1800);
        animation.id = window.requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (showTrack) {
            animation.id = window.requestAnimationFrame(animate);
        } else {
            window.cancelAnimationFrame(animation.id)
            setTime(0)
        }
        return () => window.cancelAnimationFrame(animation.id);
    }, [animation, showTrack])

    const tlayer = showTrack && new TripsLayer({
        id: 'trips',
        data: TRIPS,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
        coordinateOrigin: [182, -18],
        getPath: d => d.path,
        getTimestamps: d => d.timestamps,
        getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength: 180,
        currentTime: time,
        shadowEnabled: false
    })

    const onMapLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;
        dispatch(setDeckRef(deckRef))
        // You must initialize an empty deck.gl layer to prevent flashing
        map.addLayer(
            // This id has to match the id of the deck.gl layer
            new MapboxLayer({ id: "empty-layer", deck })
        );
    }, [])

    return (
        <HNHYMapContext.Provider value={{
            mapContainer: mapContainerRef,
            deckRef
        }}>
            <div ref={mapContainerRef} style={{ background: '#fff' }}>
                <DeckGL
                    ref={deckRef}
                    layers={[tlayer, new IconLayer({ id: 'empty-layer', data: [] })]}
                    viewState={viewState}
                    onViewStateChange={({ viewState }) => {
                        dispatch(setMapViewState(viewState))
                    }}
                    onHover={info => {
                        info.coordinate && dispatch(setDmsArr(getDmsArray(info.coordinate[1], info.coordinate[0])))
                    }}
                    controller={{ doubleClickZoom: false }}
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
                    {AlarmAreaLayer()}
                    {TargetLayer({ showCluster, showTarget })}
                    {RadarSiteLayer()}
                    {PhotoEleSiteLayer()}
                    {AISSiteLayer()}
                    <MapTooltip />
                </DeckGL>
                <CornerInfoPanel showCluster={showCluster} />
                <Switch className="mr60 mt24 absolute right" checkedChildren="聚类" unCheckedChildren="分散" checked={showCluster} onChange={setShowCluster} />
                <RightSider />
            </div>
        </HNHYMapContext.Provider>
    );
};

export default WithMapVisibleCheckHoc(Map);
