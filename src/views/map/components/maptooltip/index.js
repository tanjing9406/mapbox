import React from "react"
import { useSelector } from "react-redux"
import { get } from "lodash"
import formatcoords from 'formatcoords'

import "./style.less"

function MapTooltip() {
    const hoverInfo = useSelector(state => state.mapTooltip.hoverInfo)
    const { x, y, object, layer } = hoverInfo

    if (!object) {
        return null
    }

    if (object && ['target-layer', 'icon-cluster-layer'].includes(get(layer, 'id'))) {
        if (object.cluster) {
            return <div className="tooltip" style={{ left: x, top: y }}>{object.point_count} 艘船</div>
        }

        const [dmsLat, dmsLng] = formatcoords(object.latitude, object.longitude).format({ latLonSeparator: ',', decimalPlaces: 0 }).split(',')
        return <div className="tooltip" style={{ left: x, top: y }}>
            船名：{object.shipName ? object.shipName : '--'}<br />
            MMSI：{object.mmsi}<br />
            船长：{object.len}米<br />
            航向：{object.heading}°<br />
            航速：{object.speed}节<br />
            纬度：{dmsLat}<br />
            经度：{dmsLng}<br />
            状态：{object.state === 1 ? '正常' : '预测'}
        </div>
    }

    return null
}

export default MapTooltip