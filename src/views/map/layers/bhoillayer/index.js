import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconLayer, TextLayer, GeoJsonLayer } from 'deck.gl'
import centroid from '@turf/centroid'

import { WKTLoader } from '@loaders.gl/wkt'
import { parseSync } from '@loaders.gl/core'

import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { bhOilService } from "@/lib/services"
import { mapBHOilTubingToGeoJSON, getAngleByTwoPoints } from "@/lib/tools/maptools"

const BHOilLayer = () => {
    const dispatch = useDispatch()
    const isShowLayer = useSelector(state => state.bussinessLayerControl.siteLayersChecked.includes('bhoil_site'))
    const { viewState } = useSelector(state => state.basemap)
    const isShowText = viewState.zoom > 14
    const [data, setData] = useState([])
    const [tubingData, setTubingData] = useState(null)
    useEffect(() => {
        const init = async () => {
            const bhoilPlatform = await bhOilService.fetchBHOilPlatform()
            const bhoilTubing = await bhOilService.fetchBHOilTubing()
            setData(bhoilPlatform)
            setTubingData(mapBHOilTubingToGeoJSON(bhoilTubing.listGeoObject))
        }
        isShowLayer ? init() : setData([])
    }, [isShowLayer])
    return (
        <>
            <GeoJsonLayer
                id="bhoil-tubing-layer"
                data={tubingData}
                lineWidthUnits="pixels"
                lineWidthMinPixels={1}
                getLineWidth={2.5}
                getLineColor={d => d.properties.lineColor}
            />
            <IconLayer
                id='bhoil-layer'
                data={data}
                // pickable={true}
                // sizeScale={0.8}
                getPosition={d => {
                    const geo = parseSync(d.coord, WKTLoader)
                    return geo.coordinates
                }}
                getIcon={() => {
                    return ICON_MAPPING_CONFIG['bhoil_platform']
                }}
                getSize={d => {
                    const { width, height } = ICON_MAPPING_CONFIG['bhoil_platform']
                    return Math.max(width, height)
                }}
            // onClick={async info => {
            //     const rst = await siteService.fetchAISSiteDetail(info.object.id)
            //     info.object = Object.assign({}, info.object, rst)
            //     dispatch(setMapTooltip(info))
            // }}
            />
            <TextLayer
                id="bhoil-text-layer"
                // visible={isShowText}
                data={data}
                characterSet={new Set(data.reduce((rst, cur) => {
                    rst += cur.pointName
                    return rst
                }, ''))}
                getText={d => d.pointName}
                getPosition={d => {
                    const geo = parseSync(d.coord, WKTLoader)
                    return geo.coordinates
                }}
                getColor={[255, 0, 0]}
                getSize={16}
                getPixelOffset={[0, 30]}
            />
            <TextLayer
                id="bhoil-tubing-text-layer"
                visible={isShowText}
                data={tubingData?.features}
                characterSet={tubingData?.characterSet}
                getText={d => d.properties.geoName}
                getPosition={d => centroid(d).geometry.coordinates}
                getColor={d => d.properties.lineColor}
                getAngle={d => getAngleByTwoPoints(d.geometry.coordinates)}
                getSize={24}
            />
        </>
    )
}

export default BHOilLayer
