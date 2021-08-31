import React, { useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { DeckGL, IconLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { StaticMap } from 'react-map-gl'
import formatcoords from 'formatcoords'

import { TargetLayer } from 'Components'
import { WithMapVisibleCheckHoc } from 'Components/withVisibleCheckHoc';

import { Switch } from 'antd'
import { CornerInfoPanel, RightSider } from './components';
import { getDmsArray } from './tools';
import HNHYMapContext from './hnhymapcontext';

const INITIAL_VIEW_STATE = {
    longitude: 109.481,
    latitude: 18.271,
    zoom: 8
}

const Map = (props) => {
    const { mapStyle } = props
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const mapContainerRef = useRef()
    // const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
    const [showTarget, setShowTarget] = useState(true)
    const [showCluster, setShowCluster] = useState(props.showCluster || false)
    const [cornerInfo, setCornerInfo] = useState({
        dmsArr: undefined,
        showTarget,
        tarNum: 0,
        viewTarNum: 0,
        zoom: INITIAL_VIEW_STATE.zoom.toFixed(1)
    })
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
        <HNHYMapContext.Provider value={{
            mapContainer: mapContainerRef
        }}>
            <div ref={mapContainerRef}>
                <DeckGL
                    ref={deckRef}
                    layers={[new IconLayer({ id: 'empty-layer', data: [] })]}
                    initialViewState={INITIAL_VIEW_STATE}
                    onViewStateChange={({ viewState }) => {
                        // setViewState(viewState)
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
                <CornerInfoPanel data={cornerInfo} onToggleTarget={checked => setShowTarget(checked)} />
                <Switch className="ml12 mt18 absolute" checkedChildren="聚类" unCheckedChildren="分散" checked={showCluster} onChange={checked => setShowCluster(checked)} />
                <RightSider />
            </div>
        </HNHYMapContext.Provider>
    );
};

function mapStateToProps(state) {
    return {
        mapStyle: state.mapStyle
    };
}

export default WithMapVisibleCheckHoc(connect(mapStateToProps)(Map));
