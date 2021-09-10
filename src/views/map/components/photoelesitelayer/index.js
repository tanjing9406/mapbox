import React, { useEffect, useState } from "react"
import { IconLayer } from 'deck.gl'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { fetchPhotoEleSite } from "./lib"
import { get } from "lodash"

const PhotoEleSiteLayer = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await fetchPhotoEleSite({})
            setData(get(rst, 'records', []))
        }
        init()
    }, [])
    return (
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
        />
    )
}

export default PhotoEleSiteLayer