import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeckGL, IconLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'
import { EditableGeoJsonLayer } from "nebula.gl"

import { TargetLayer } from 'Components'
import { WithMapVisibleCheckHoc } from 'Components/withVisibleCheckHoc'
import { setMapViewState } from "@/redux/basemapslice"
import { mapStyleSelector } from "@/redux/baselayercontrolslice"
import { DEFAULT_SHOW_TARGET, TRACK_VIEW_STATE } from "@/config/constants/default-consts-config"
import { Switch } from 'antd'
import { CornerInfoPanel, RightSider, MapTooltip, PhotoEleSiteLayer, AISSiteLayer, RadarSiteLayer } from './components';
import { getDmsArray } from './tools';
import HNHYMapContext from './hnhymapcontext';
import { TripsLayer } from '@deck.gl/geo-layers'
import { COORDINATE_SYSTEM } from '@deck.gl/core'

const TRIPS = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json'
const theme = {
    trailColor0: [255, 0, 0],
    trailColor1: [0, 0, 255]
}
const Map = () => {
    const dispatch = useDispatch()
    const { viewState, mapEditMode } = useSelector(state => state.basemap)
    const mapStyle = useSelector(mapStyleSelector)
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const mapContainerRef = useRef()
    const [showTarget, setShowTarget] = useState(DEFAULT_SHOW_TARGET)
    const [showTrack, setShowTrack] = useState(false)
    const [showCluster, setShowCluster] = useState(false)
    const [cornerInfo, setCornerInfo] = useState({
        dmsArr: undefined,
        showTarget,
        tarNum: 0,
        viewTarNum: 0,
        zoom: viewState.zoom.toFixed(1)
    })
    const [time, setTime] = useState(0)
    const [animation] = useState({})

    const [editFeatures, setEditFeatures] = React.useState({
        type: "FeatureCollection",
        features: []
    })
    const [selectedFeatureIndexes] = React.useState([])

    const editLayer = new EditableGeoJsonLayer({
        data: editFeatures,
        mode: mapEditMode,
        selectedFeatureIndexes,

        onEdit: ({ updatedData, editType, editContext }) => {
            setEditFeatures(updatedData);
        }
    })

    const animate = () => {
        setTime(t => (t + 1) % 1800);
        animation.id = window.requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (showTrack) {
            animation.id = window.requestAnimationFrame(animate);
        } else {
            window.cancelAnimationFrame(animation.id)
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
        // You must initialize an empty deck.gl layer to prevent flashing
        map.addLayer(
            // This id has to match the id of the deck.gl layer
            new MapboxLayer({ id: "empty-layer", deck })
        );
    }, [])

    const onToggleTrack = (checked) => {
        setShowTrack(checked)
        if (checked) {
            dispatch(setMapViewState({
                ...TRACK_VIEW_STATE
            }))
        }
    }

    return (
        <HNHYMapContext.Provider value={{
            mapContainer: mapContainerRef
        }}>
            <div ref={mapContainerRef} style={{ background: '#fff' }}>
                <DeckGL
                    ref={deckRef}
                    layers={[new IconLayer({ id: 'empty-layer', data: [] }), tlayer, editLayer]}
                    getCursor={editLayer.getCursor.bind(editLayer)}
                    viewState={viewState}
                    onViewStateChange={({ viewState }) => {
                        dispatch(setMapViewState(viewState))
                        setCornerInfo({
                            ...cornerInfo,
                            zoom: viewState.zoom.toFixed(1)
                        })
                    }}
                    onHover={info => {
                        info.coordinate && setCornerInfo({
                            ...cornerInfo,
                            dmsArr: getDmsArray(info.coordinate[1], info.coordinate[0])
                        })
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
                    {TargetLayer({ showCluster, showTarget })}
                    {RadarSiteLayer()}
                    {PhotoEleSiteLayer()}
                    {AISSiteLayer()}
                    <MapTooltip />
                </DeckGL>
                <CornerInfoPanel data={cornerInfo} onToggleTarget={checked => setShowTarget(checked)} onToggleTrack={onToggleTrack} />
                <Switch className="mr60 mt24 absolute right" checkedChildren="聚类" unCheckedChildren="分散" checked={showCluster} onChange={checked => setShowCluster(checked)} />
                <RightSider />
            </div>
        </HNHYMapContext.Provider>
    );
};

export default WithMapVisibleCheckHoc(Map);
