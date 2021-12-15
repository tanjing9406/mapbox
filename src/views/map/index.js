import React, { useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeckGL, IconLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'

import { WithMapVisibleCheckHoc } from 'Components/withVisibleCheckHoc'
import { HandPose } from 'Components'
import { setMapViewState, setDeckRef } from "@/redux/basemapslice"
import { mapStyleSelector } from "@/redux/baselayercontrolslice"
import { setDmsArr } from "@/redux/cornerinfopanelslice"
import { hlxFormatCoords } from "@/lib/tools"

import { Switch } from 'antd'
import { CornerInfoPanel, RightSider, MapTooltip } from './components';
import {
    AISSiteLayer,
    AlarmAreaLayer,
    BHOilLayer,
    EditableLayer,
    PhotoEleSiteLayer,
    RadarSiteLayer,
    RealtimeTrackLayer,
    TargetLayer
} from './layers';
import HNHYMapContext from './hnhymapcontext'

const Map = () => {
    const dispatch = useDispatch()
    const { viewState } = useSelector(state => state.basemap)
    const mapStyle = useSelector(mapStyleSelector)
    const { showTarget } = useSelector(state => state.cornerInfoPanel)
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const mapContainerRef = useRef()
    const [showCluster, setShowCluster] = useState(false)

    const onMapLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;
        dispatch(setDeckRef({ ...deckRef }))
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
                    layers={[new IconLayer({ id: 'empty-layer', data: [] })]}
                    viewState={viewState}
                    onViewStateChange={({ viewState }) => {
                        dispatch(setMapViewState(viewState))
                    }}
                    onHover={info => {
                        info.coordinate && dispatch(setDmsArr(hlxFormatCoords(info.coordinate[1], info.coordinate[0])))
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
                    {BHOilLayer()}
                    {EditableLayer()}
                    {TargetLayer({ showCluster, showTarget })}
                    {RealtimeTrackLayer()}
                    {RadarSiteLayer()}
                    {PhotoEleSiteLayer()}
                    {AISSiteLayer()}
                    <MapTooltip />
                </DeckGL>
                <CornerInfoPanel showCluster={showCluster} />
                <Switch className="mr60 mt24 absolute right" checkedChildren="聚类" unCheckedChildren="分散" checked={showCluster} onChange={setShowCluster} />
                <RightSider />
                {/* <HandPose onDetectedThumbsUp={() => setShowCluster(true)} onDetectedVictory={() => setShowCluster(false)} /> */}
            </div>
        </HNHYMapContext.Provider>
    );
};

export default WithMapVisibleCheckHoc(Map);
