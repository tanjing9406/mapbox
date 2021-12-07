import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconLayer, PathLayer, PolygonLayer } from 'deck.gl'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { setMapTooltip } from "@/redux/maptooltipslice"
import { siteService } from "@/lib/services"
import { formatPolygonData } from "./lib"
import { get } from "lodash"

const PhotoEleSiteLayer = () => {
    const dispatch = useDispatch()
    const viewSightData = useSelector(state => {
        const hoverInfo = state.mapTooltip.hoverInfo
        const layerId = get(hoverInfo, 'layer.id')
        if(layerId === 'photoele_site-layer'){
            const formatData = formatPolygonData(hoverInfo.object)
            return formatData ? [formatData]: []
        }
    })
    const isShowLayer = useSelector(state => state.bussinessLayerControl.siteLayersChecked.includes('photoele_site'))
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await siteService.fetchPhotoEleSite({})
            setData(get(rst, 'records', []))
        }
        isShowLayer ? init() : setData([])
    }, [isShowLayer])
    return (
        <>
            <IconLayer
                id='photoele_site-layer'
                data={data}
                pickable={true}
                sizeScale={0.8}
                getPosition={d => [d.longitude, d.latitude]}
                getIcon={() => {
                    return ICON_MAPPING_CONFIG['photoele_site']
                }}
                getSize={d => {
                    const { width, height } = ICON_MAPPING_CONFIG['photoele_site']
                    return Math.max(width, height)
                }}
                onClick={async info => {
                    dispatch(setMapTooltip(info))
                }}
            />
            <PolygonLayer
                id='photoele_site_polygon-layer'
                data={viewSightData}
                lineWidthMinPixels={1}
                getPolygon={d => d.polygon}
                getFillColor={[100, 100, 100, 51]}
                getLineColor={[100, 100, 100, 51]}
                parameters={{
                    blend: true
                }}
            />
            <PathLayer
                id='photoele_site_polyline-layer'
                data={viewSightData}
                getPath={d => d.polyline}
                widthMinPixels={1}
            />
        </>
    )
}

export default PhotoEleSiteLayer