import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconLayer } from 'deck.gl'
import { ICON_MAPPING_CONFIG } from "@/config/constants/icon-mapping-config"
import { setMapTooltip } from "@/redux/maptooltipslice"
import { siteService } from "@/lib/services"

import { get } from "lodash"

const AISSiteLayer = () => {
    const dispatch = useDispatch()
    const isShowLayer = useSelector(state => state.bussinessLayerControl.siteLayersChecked.includes('ais_site'))
    const [data, setData] = useState([])
    useEffect(() => {
        const init = async () => {
            const rst = await siteService.fetchAISSite({ current: 1, size: 999 })
            setData(rst)
        }
        isShowLayer ? init() : setData([])
    }, [isShowLayer])
    return (
        <IconLayer
            id='ais_site-layer'
            data={data}
            pickable={true}
            sizeScale={0.8}
            getPosition={d => [d.longitude, d.latitude]}
            getIcon={() => {
                return ICON_MAPPING_CONFIG['ais_site']
            }}
            getSize={d => {
                const { width, height } = ICON_MAPPING_CONFIG['ais_site']
                return Math.max(width, height)
            }}
            onClick={async info => {
                const rst = await siteService.fetchAISSiteDetail(info.object.id)
                info.object = Object.assign({}, info.object, rst)
                dispatch(setMapTooltip(info))
            }}
        />
    )
}

export default AISSiteLayer