import React from "react"
import { useSelector } from "react-redux"
import { get } from "lodash"
import { AISSiteTooltip, PhotoEleSiteTooltip, RadarSiteTooltip, TargetTooltip } from "./components"
import "./style.less"

function MapTooltip() {
    const hoverInfo = useSelector(state => state.mapTooltip.hoverInfo)
    const { object, layer } = hoverInfo

    if (!object) {
        return null
    }

    if (object && ['target-layer', 'icon-cluster-layer', 'target-track-points'].includes(get(layer, 'id'))) {
        return <TargetTooltip hoverInfo={hoverInfo} />
    }

    if (object && ['ais_site-layer'].includes(get(layer, 'id'))) {
        return <AISSiteTooltip hoverInfo={hoverInfo} />
    }
    if (object && ['photoele_site-layer'].includes(get(layer, 'id'))) {
        return <PhotoEleSiteTooltip hoverInfo={hoverInfo} />
    }
    if (object && ['radar_site-layer'].includes(get(layer, 'id'))) {
        return <RadarSiteTooltip hoverInfo={hoverInfo} />
    }

    return null
}

export default MapTooltip