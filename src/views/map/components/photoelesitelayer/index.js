import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconLayer } from 'deck.gl'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { setMapTooltip } from "@/redux/maptooltipslice"
import { fetchPhotoEleSite } from "./lib"
import { get } from "lodash"

const PhotoEleSiteLayer = () => {
    const dispatch = useDispatch()
    const isShowLayer = useSelector(state => state.bussinessLayerControl.siteLayersChecked.includes('photoele_site'))
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await fetchPhotoEleSite({})
            setData(get(rst, 'records', []))
        }
        isShowLayer ? init() : setData([])
    }, [isShowLayer])
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
            onClick={async info => {
                dispatch(setMapTooltip(info))
            }}
        />
    )
}

export default PhotoEleSiteLayer