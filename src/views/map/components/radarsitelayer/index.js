import React, { useEffect, useState } from "react"
import { IconLayer } from 'deck.gl'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { fetchRadarSite } from "./lib"
import { get } from "lodash"

const RadarSiteLayer = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await fetchRadarSite({ current: 1, size: 999 })
            setData(get(rst, 'records', []))
        }
        init()
    }, [])
    return (
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
        />
    )
}

export default RadarSiteLayer