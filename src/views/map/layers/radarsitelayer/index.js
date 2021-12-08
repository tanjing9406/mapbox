import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconLayer, ScatterplotLayer } from 'deck.gl'
import GL from '@luma.gl/constants'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { setMapTooltip } from "@/redux/maptooltipslice"
import { siteService } from "@/lib/services"
import { get } from "lodash"

const RadarSiteLayer = () => {
    const dispatch = useDispatch()
    const radarWzoneData = useSelector(state => {
        const hoverInfo = state.mapTooltip.hoverInfo
        const layerId = get(hoverInfo, 'layer.id')
        return layerId === 'radar_site-layer' ? [hoverInfo.object] : []
    })
    const isShowLayer = useSelector(state => state.bussinessLayerControl.siteLayersChecked.includes('radar_site'))
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await siteService.fetchRadarSite({ current: 1, size: 999 })
            setData(rst)
        }
        isShowLayer ? init() : setData([])
    }, [isShowLayer])
    return (
        <>
            <IconLayer
                id='radar_site-layer'
                data={data}
                pickable={true}
                sizeScale={0.8}
                getPosition={d => [d.longitude, d.latitude]}
                getIcon={() => {
                    return ICON_MAPPING_CONFIG['radar_site']
                }}
                getSize={d => {
                    const { width, height } = ICON_MAPPING_CONFIG['radar_site']
                    return Math.max(width, height)
                }}
                onClick={async info => {
                    const rst = await siteService.fetchRadarSiteDetail(info.object.id)
                    info.object = Object.assign({}, info.object, rst)
                    dispatch(setMapTooltip(info))
                }}
            />
            <ScatterplotLayer
                id='radar_site_wzone-layer'
                data={radarWzoneData}
                stroked={true}
                lineWidthMinPixels={1}
                getPosition={d => [d.longitude, d.latitude]}
                getRadius={d => d.wzone * 1852}
                getFillColor={d => [0, 45, 255, 51]}
                getLineColor={d => [0, 45, 255]}
                parameters={{
                    blend: true
                }}
            />
        </>
    )
}

export default RadarSiteLayer