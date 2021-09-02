import React, { useRef, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux'
import { DeckGL, IconLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'
import formatcoords from 'formatcoords'

import { TargetLayer } from 'Components'
import { WithMapVisibleCheckHoc } from 'Components/withVisibleCheckHoc';
import { setMapViewState } from "@/redux/action-creators"
import { DEFAULT_SHOW_TARGET, TRACK_VIEW_STATE } from "@/config/constants/default-consts-config"
import { Switch } from 'antd'
import { CornerInfoPanel, RightSider } from './components';
import { getDmsArray } from './tools';
import HNHYMapContext from './hnhymapcontext';
import { TripsLayer } from '@deck.gl/geo-layers'
import { COORDINATE_SYSTEM } from '@deck.gl/core'

const TRIPS = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json'
const theme = {
    trailColor0: [255, 0, 0],
    trailColor1: [0, 0, 255]
}
const Map = (props) => {
    const { mapStyle, viewState } = props
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const mapContainerRef = useRef()
    const [showTarget, setShowTarget] = useState(DEFAULT_SHOW_TARGET)
    const [showTrack, setShowTrack] = useState(false)
    const [showCluster, setShowCluster] = useState(props.showCluster || false)
    const [cornerInfo, setCornerInfo] = useState({
        dmsArr: undefined,
        showTarget,
        tarNum: 0,
        viewTarNum: 0,
        zoom: viewState.zoom.toFixed(1)
    })
    const [time, setTime] = useState(0);
    const [animation] = useState({});

    const animate = () => {
        setTime(t => (t + 1) % 1800);
        animation.id = window.requestAnimationFrame(animate);
    };

    useEffect(
        () => {
            animation.id = window.requestAnimationFrame(animate);
            return () => window.cancelAnimationFrame(animation.id);
        },
        [animation]
    );
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
            setMapViewState({
                ...TRACK_VIEW_STATE
            })
        }
    }

    return (
        <HNHYMapContext.Provider value={{
            mapContainer: mapContainerRef
        }}>
            <div ref={mapContainerRef} style={{ background: '#fff' }}>
                <DeckGL
                    ref={deckRef}
                    layers={[new IconLayer({ id: 'empty-layer', data: [] }), tlayer]}
                    viewState={viewState}
                    onViewStateChange={({ viewState }) => {
                        setMapViewState(viewState)
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
                    getTooltip={({ object, info }) => {
                        if (object && object.cluster) {
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
                            mapStyle={mapStyle}
                            onLoad={onMapLoad}
                        />
                    )}
                    {TargetLayer({ showCluster, showTarget })}
                </DeckGL>
                {/* <Trip mapStyle={mapStyle} animationSpeed={1} /> */}
                <CornerInfoPanel data={cornerInfo} onToggleTarget={checked => setShowTarget(checked)} onToggleTrack={onToggleTrack} />
                <Switch className="ml12 mt18 absolute" checkedChildren="聚类" unCheckedChildren="分散" checked={showCluster} onChange={checked => setShowCluster(checked)} />
                <RightSider />
            </div>
        </HNHYMapContext.Provider>
    );
};

function mapStateToProps(state) {
    return {
        mapStyle: state.mapStyle,
        viewState: state.viewState
    };
}

export default WithMapVisibleCheckHoc(connect(mapStateToProps)(Map));
