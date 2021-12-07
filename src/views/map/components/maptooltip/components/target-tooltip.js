import React from "react"
import { hlxFormatCoords } from "@/lib/tools"

function TargetTooltip({ hoverInfo }) {
    const { x, y, object } = hoverInfo

    if (hoverInfo.layer.id === 'target-track-points') {
        return (
            <div className="tooltip" style={{ left: x, top: y }}>
                船名：{object.vesselName ? object.vesselName : '--'}<br />
                时间：{object.lastDt}<br />
                航向：{object.heading}°<br />
                航速：{object.speed}节<br />
            </div>
        )
    }

    if (object.cluster) {
        return <div className="tooltip" style={{ left: x, top: y }}>{object.point_count} 艘船</div>
    }

    const [dmsLat, dmsLng] = hlxFormatCoords(object.latitude, object.longitude)

    return (
        <div className="tooltip" style={{ left: x, top: y }}>
            船名：{object.shipName ? object.shipName : '--'}<br />
            MMSI：{object.mmsi}<br />
            船长：{object.len}米<br />
            航向：{object.heading}°<br />
            航速：{object.speed}节<br />
            纬度：{dmsLat}<br />
            经度：{dmsLng}<br />
            状态：{object.state === 1 ? '正常' : '预测'}
        </div>
    )
}

export default TargetTooltip
